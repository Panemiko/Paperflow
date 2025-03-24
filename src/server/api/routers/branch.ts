import { branchSchema, idSchema } from "@/lib/schema";
import { tryCatch } from "@/lib/utils";
import { branches, decoupledBranches, papers } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const branchRouter = createTRPCRouter({
  getMainBranchFromPaper: protectedProcedure
    .input(
      z.object({
        paperId: idSchema,
      }),
    )
    .query(async ({ ctx, input }) => {
      const [paper, error] = await tryCatch(
        ctx.db.query.papers.findFirst({
          where: eq(papers.id, input.paperId),
          with: {
            mainBranch: true,
          },
        }),
      );

      if (error || !paper?.mainBranch) {
        throw new TRPCError({
          code: "FORBIDDEN",
        });
      }

      return paper.mainBranch;
    }),
  create: protectedProcedure
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
            throw new TRPCError({ code: "NOT_FOUND" });
          }

          const paper = await tx.query.papers.findFirst({
            where: eq(papers.id, originalBranch.paperId),
          });

          if (!paper) {
            throw new TRPCError({ code: "NOT_FOUND" });
          }

          const [createdBranch, error] = await tryCatch(
            tx
              .insert(branches)
              .values({
                name: input.data.name,
                ownerId: ctx.auth.user.id,
                isEditable: true,
                paperId: paper.id,
                content: originalBranch.content,
                referencesCommitId: originalBranch.referencesCommitId,
              })
              .returning(),
          );

          if (error || !createdBranch[0]) {
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
          }

          await tx.insert(decoupledBranches).values({
            branchId: createdBranch[0].id,
            content: createdBranch[0].content,
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

  byId: protectedProcedure
    .input(z.object({ branchId: idSchema }))
    .query(async ({ ctx, input }) => {
      const [branch, error] = await tryCatch(
        ctx.db.query.branches.findFirst({
          where: eq(branches.id, input.branchId),
        }),
      );

      if (error || !branch) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return branch;
    }),
});
