import { changesToText, textToChanges } from "@/lib/diff";
import { commitSchema, sectionContentSchema } from "@/lib/schemas";
import { commitsTable, papersTable } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { and, desc, eq } from "drizzle-orm";
import { type Change } from "textdiff-create";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const commitRouter = createTRPCRouter({
  byPaper: protectedProcedure
    .input(commitSchema.pick({ paperId: true }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select()
        .from(commitsTable)
        .where(
          and(
            eq(commitsTable.paperId, input.paperId),
            eq(papersTable.ownerId, ctx.auth.user.id),
          ),
        );

      return result;
    }),
  create: protectedProcedure
    .input(
      commitSchema
        .pick({ paperId: true, message: true, description: true })
        .extend({ content: sectionContentSchema }),
    )
    .mutation(async ({ ctx, input }) => {
      const paper = await ctx.db
        .select()
        .from(papersTable)
        .where(
          and(
            eq(papersTable.ownerId, ctx.auth.user.id),
            eq(papersTable.id, input.paperId),
          ),
        )
        .limit(1);

      if (!paper?.length) {
        throw new TRPCError({
          code: "FORBIDDEN",
        });
      }

      const commitHistory = await ctx.db.query.commitsTable.findMany({
        where: eq(commitsTable.paperId, input.paperId),
        orderBy: desc(commitsTable.createdAt),
      });

      const changesUntilLastCommits = changesToText(
        commitHistory.map((commit) => commit.changes) as Change[][],
      );

      const changes = textToChanges(changesUntilLastCommits, input.content);

      await ctx.db.insert(commitsTable).values({
        paperId: input.paperId,
        userId: ctx.auth.user.id,
        message: input.message,
        description: input.description,
        changes,
      });
    }),
});
