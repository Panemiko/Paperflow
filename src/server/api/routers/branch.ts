import { idSchema } from "@/lib/schema";
import { tryCatch } from "@/lib/utils";
import { papers } from "@/server/db/schema";
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
});
