import { commitSchema, sectionContentSchema } from "@/lib/schemas";
import { commitsTable, papersTable, sectionsTable } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { type Change, diffWordsWithSpace } from "diff";
import { and, desc, eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";

function applyCommits(original: string, commits: Change[]): string {
  let result = "";
  let originalIndex = 0;

  commits.forEach((commit) => {
    if (commit.removed) {
      originalIndex += commit.count!;
    } else if (commit.added) {
      result += commit.value;
    } else {
      result += original.slice(originalIndex, originalIndex + commit.count!);
      originalIndex += commit.count!;
    }
  });

  return result;
}

export const commitRouter = createTRPCRouter({
  bySection: protectedProcedure
    .input(commitSchema.pick({ sectionId: true }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select()
        .from(commitsTable)
        .leftJoin(sectionsTable, eq(commitsTable.sectionId, sectionsTable.id))
        .leftJoin(papersTable, eq(sectionsTable.paperId, papersTable.id))
        .where(
          and(
            eq(commitsTable.sectionId, input.sectionId),
            eq(papersTable.ownerId, ctx.auth.user.id),
          ),
        );

      return result.map((row) => row.commits);
    }),
  create: protectedProcedure
    .input(
      commitSchema
        .pick({ sectionId: true })
        .extend({ content: sectionContentSchema }),
    )
    .mutation(async ({ ctx, input }) => {
      const paper = await ctx.db
        .select()
        .from(papersTable)
        .leftJoin(sectionsTable, eq(papersTable.id, sectionsTable.paperId))
        .where(
          and(
            eq(papersTable.ownerId, ctx.auth.user.id),
            eq(sectionsTable.id, input.sectionId),
          ),
        )
        .limit(1);

      if (!paper?.length) {
        throw new TRPCError({
          code: "FORBIDDEN",
        });
      }

      const commitHistory = await ctx.db.query.commitsTable.findMany({
        where: eq(commitsTable.sectionId, input.sectionId),
        orderBy: desc(commitsTable.createdAt),
      });

      const sectionUntilLastAppliedCommit = applyCommits(
        "",
        commitHistory.map((commit) => commit.changes) as Change[],
      );

      const changes = diffWordsWithSpace(
        sectionUntilLastAppliedCommit,
        input.content,
        {
          ignoreWhitespace: false,
        },
      );

      await ctx.db.insert(commitsTable).values({
        sectionId: input.sectionId,
        userId: ctx.auth.user.id,
        changes,
      });
    }),
});
