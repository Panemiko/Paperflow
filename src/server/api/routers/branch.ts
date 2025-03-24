import { branchSchema, idSchema } from "@/lib/schema";
import { tryCatch } from "@/lib/utils";
import { branches, papers } from "@/server/db/schema";
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
      branchSchema.pick({ name: true }).extend({
        basedOnBranchId: idSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [branchBasedOn, branchQueryError] = await tryCatch(
        ctx.db.query.branches.findFirst({
          where: eq(branches.id, input.basedOnBranchId),
        }),
      );

      if (branchQueryError || !branchBasedOn) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const [createdBranch, branchCreationError] = await tryCatch(
        ctx.db
          .insert(branches)
          .values({
            name: input.name,
            paperId: branchBasedOn.paperId,
            ownerId: ctx.auth.user.id,
            content: branchBasedOn.content,
            referencesCommitId: branchBasedOn.referencesCommitId,
            isEditable: true,
          })
          .returning(),
      );

      if (branchCreationError || !createdBranch[0]) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }

      return {
        createdBranchId: createdBranch[0].id,
        paperId: createdBranch[0].paperId,
      };
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
