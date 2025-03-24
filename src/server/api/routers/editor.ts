import { branchSchema, paperSchema } from "@/lib/schema";
import { tryCatch } from "@/lib/utils";
import { branches, papers } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const editorRouter = createTRPCRouter({
  loadEditorContent: protectedProcedure
    .input(
      z.object({
        paperSlug: paperSchema.shape.slug,
        branchName: branchSchema.shape.name,
      }),
    )
    .query(async ({ ctx, input }) => {
      const [workingBranchPaper, paperQueryError] = await tryCatch(
        ctx.db.query.papers.findFirst({
          where: eq(papers.slug, input.paperSlug),
          with: {
            branches: {
              orderBy: desc(branches.updatedAt),
              columns: {
                content: true,
                id: true,
                createdAt: true,
                referencesCommitId: true,
                isEditable: true,
                name: true,
                ownerId: true,
                updatedAt: true,
              },
            },
          },
        }),
      );

      if (paperQueryError || !workingBranchPaper) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Paper not found",
        });
      }

      const [workingBranch, workingBranchError] = await tryCatch(
        ctx.db.query.branches.findFirst({
          where: and(
            eq(branches.paperId, workingBranchPaper.id),
            eq(branches.name, input.branchName),
          ),
          with: {
            decoupled: true,
            owner: {
              columns: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        }),
      );

      if (workingBranchError || !workingBranch) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Branch not found",
        });
      }

      return {
        paper: {
          ...workingBranchPaper,
          branches: workingBranchPaper.branches.map((branch) => ({
            ...branch,
            isWorkingBranch: branch.id === workingBranch.id,
            isMainBranch: branch.id === workingBranchPaper.mainBranchId,
          })),
        },
        workingBranch: {
          ...workingBranch,
          isMainBranch: workingBranchPaper.mainBranchId === workingBranch.id,
        },
      };
    }),
});
