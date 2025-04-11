import { branchSchema, idSchema } from "@/lib/schema";
import { tryCatch } from "@/lib/utils";
import {
  branches,
  commits,
  decoupledBranches,
  papers,
} from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const branchRouter = createTRPCRouter({
  fork: protectedProcedure
    .input(
      z.object({
        data: branchSchema.pick({ name: true }),
        forkedFromBranchId: idSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [queriesResult, transactionError] = await tryCatch(
        ctx.db.transaction(async (tx) => {
          const originalBranch = await tx.query.branches.findFirst({
            where: eq(branches.id, input.forkedFromBranchId),
          });

          if (!originalBranch) {
            tx.rollback();
            throw new TRPCError({ code: "NOT_FOUND" });
          }

          const paper = await tx.query.papers.findFirst({
            where: eq(papers.id, originalBranch.paperId),
          });

          if (!paper) {
            tx.rollback();
            throw new TRPCError({ code: "NOT_FOUND" });
          }

          const createdBranch = await tx
            .insert(branches)
            .values({
              name: input.data.name,
              ownerId: ctx.auth.user.id,
              isEditable: true,
              paperId: paper.id,
              referencesCommitId: originalBranch.referencesCommitId,
            })
            .returning();

          if (!createdBranch[0]) {
            tx.rollback();
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
          }

          // only gather the referenced commit if it exists
          const referencedCommit = createdBranch[0].referencesCommitId
            ? await tx.query.commits.findFirst({
                where: eq(commits.id, createdBranch[0].referencesCommitId),
              })
            : null;

          await tx.insert(decoupledBranches).values({
            branchId: createdBranch[0].id,
            contentState: referencedCommit?.contentState ?? [],
            userId: ctx.auth.user.id,
          });

          return {
            createdBranch: {
              ...createdBranch[0],
              paper: {
                id: paper.id,
                slug: paper.slug,
              },
            },
          };
        }),
      );

      if (transactionError) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      return queriesResult;
    }),
});
