import { paperSchema } from "@/lib/schemas";
import {
  commitsTable,
  paperPermissionsTable,
  papersTable,
} from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const paperRouter = createTRPCRouter({
  byId: protectedProcedure
    .input(
      paperSchema.pick({
        id: true,
      }),
    )
    .query(async ({ ctx, input }) => {
      const paper = await ctx.db
        .select()
        .from(papersTable)
        .leftJoin(
          paperPermissionsTable,
          and(eq(papersTable.id, paperPermissionsTable.paperId)),
        )
        .where(
          and(
            eq(papersTable.id, input.id),
            eq(paperPermissionsTable.userId, ctx.auth.user.id),
          ),
        )
        .limit(1);

      if (!paper.map((paper) => paper.papers)?.length) {
        return null;
      }

      return paper.map((paper) => paper.papers)[0];
    }),
  byCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.db
      .select()
      .from(papersTable)
      .leftJoin(
        paperPermissionsTable,
        and(eq(papersTable.id, paperPermissionsTable.paperId)),
      )
      .leftJoin(commitsTable, eq(papersTable.id, commitsTable.paperId))
      .where(eq(paperPermissionsTable.userId, ctx.auth.user.id));

    return result.map((paper) => ({
      ...paper.papers,
      commitLength: result
        .map((paper) => paper.commits)
        .filter((commit) => commit?.paperId === paper.papers.id).length,
      collaboratorsLength: result
        .map((paper) => paper.paper_permissions)
        .filter((perm) => perm?.paperId === paper.papers.id).length,
      lastCommit: result
        .map((paper) => paper.commits)
        .filter((commit) => commit?.paperId === paper.papers.id)
        .sort((a, b) => {
          if (!a || !b) return 1;
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        })[0],
    }));
  }),
});
