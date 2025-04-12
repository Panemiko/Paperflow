import {
  branchSchema,
  commitSchema,
  decoupledBranchSchema,
  paperSchema,
} from "@/lib/schema";
import { tryCatch } from "@/lib/utils";
import {
  branches,
  commits,
  decoupledBranches,
  papers,
} from "@/server/db/schema";
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
            referencedCommit: {
              columns: {
                id: true,
                name: true,
                contentState: true,
              },
            },
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

  quickSaveContent: protectedProcedure
    .input(
      decoupledBranchSchema.pick({
        contentState: true,
        id: true,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [, error] = await tryCatch(
        ctx.db
          .update(decoupledBranches)
          .set({ contentState: input.contentState })
          .where(eq(decoupledBranches.id, input.id)),
      );

      if (error) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Error updating branch content",
        });
      }

      return {
        quickSaveSuccess: true,
      };
    }),

  commit: protectedProcedure
    .input(
      z.object({
        branchId: branchSchema.shape.id,
        previousCommitId: commitSchema.shape.id,

        data: commitSchema.pick({
          name: true,
          description: true,
          contentState: true,
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [data, error] = await tryCatch(
        ctx.db.transaction(async (tx) => {
          const workingBranch = await tx.query.branches.findFirst({
            where: eq(branches.id, input.branchId),
          });

          if (!workingBranch) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Branch not found",
            });
          }

          if (!workingBranch.isEditable) {
            throw new TRPCError({
              code: "FORBIDDEN",
              message: "Branch is not editable",
            });
          }

          const previousCommit = await tx.query.commits.findFirst({
            where: eq(commits.id, input.previousCommitId),
          });

          if (!previousCommit) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Previous commit not found",
            });
          }

          if (previousCommit.paperId !== workingBranch.paperId) {
            throw new TRPCError({
              code: "FORBIDDEN",
              message: "Previous commit does not belong to this paper",
            });
          }

          const [createdCommit] = await tx
            .insert(commits)
            .values({
              name: input.data.name,
              description: input.data.description ?? null,
              contentState: input.data.contentState ?? [],
              madeByUserId: ctx.auth.user.id,
              previousCommitId: input.previousCommitId ?? null,
              paperId: workingBranch.paperId,
            })
            .returning();

          if (!createdCommit) {
            tx.rollback();
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Error creating commit",
            });
          }

          await tx
            .update(branches)
            .set({
              referencesCommitId: createdCommit.id,
            })
            .where(and(eq(branches.id, input.branchId)));

          return {
            commit: createdCommit,
          };
        }),
      );

      if (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error creating commit",
        });
      }

      return data;
    }),
});
