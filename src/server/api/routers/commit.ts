import { changesToText, textToChanges } from "@/lib/diff";
import { hasFeature } from "@/lib/permissions";
import { commitSchema, paperContentSchema } from "@/lib/schemas";
import {
  commitsTable,
  paperPermissionsTable,
  papersTable,
  usersTable,
} from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { and, desc, eq, gt, inArray, lte } from "drizzle-orm";
import moment from "moment";
import { type Change } from "textdiff-create";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const commitRouter = createTRPCRouter({
  byPaper: protectedProcedure
    .input(commitSchema.pick({ paperId: true }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (tx) => {
        const perm = await tx.query.paperPermissionsTable.findFirst({
          where: and(
            eq(paperPermissionsTable.paperId, input.paperId),
            eq(paperPermissionsTable.userId, ctx.auth.user.id),
          ),
        });

        if (!perm) {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        return await tx.query.commitsTable.findMany({
          where: eq(commitsTable.paperId, input.paperId),
        });
      });
    }),
  create: protectedProcedure
    .input(
      commitSchema
        .pick({ paperId: true, message: true, description: true })
        .extend({ content: paperContentSchema }),
    )
    .mutation(async ({ ctx, input }) => {
      const paper = await ctx.db
        .select()
        .from(papersTable)
        .leftJoin(
          paperPermissionsTable,
          and(eq(papersTable.id, paperPermissionsTable.paperId)),
        )
        .where(
          and(
            eq(papersTable.id, input.paperId),
            eq(paperPermissionsTable.userId, ctx.auth.user.id),
          ),
        )
        .limit(1);

      if (
        !paper.map((paper) => paper.papers)?.length ||
        !hasFeature(
          paper.map((paper) => paper.paper_permissions)[0]?.role,
          "commit",
        )
      ) {
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
  lastCommits: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.transaction(async (tx) => {
      const permissions = await tx.query.paperPermissionsTable.findMany({
        where: eq(paperPermissionsTable.userId, ctx.auth.user.id),
      });

      return await tx
        .select()
        .from(commitsTable)
        .leftJoin(usersTable, eq(commitsTable.userId, usersTable.id))
        .where(
          inArray(
            commitsTable.paperId,
            permissions.map((p) => p.paperId),
          ),
        )
        .orderBy(desc(commitsTable.createdAt))
        .limit(10);
    });

    return result.map((commit) => ({
      ...commit.commits,
      user: {
        id: commit.users?.id,
        firstName: commit.users?.firstName,
        lastName: commit.users?.lastName,
        email: commit.users?.email,
      },
    }));
  }),
  commitsSinceLastWeek: protectedProcedure.query(async ({ ctx }) => {
    const lastWeek = moment().subtract(1, "week").startOf("week").toDate();
    const endOfLastWeek = moment().toDate();

    const commits = await ctx.db.transaction(async (tx) => {
      const permission = await tx.query.paperPermissionsTable.findMany({
        where: eq(paperPermissionsTable.userId, ctx.auth.user.id),
      });

      return await tx.query.commitsTable.findMany({
        where: and(
          inArray(
            commitsTable.paperId,
            permission.map((p) => p.paperId),
          ),
          gt(commitsTable.createdAt, lastWeek),
          lte(commitsTable.createdAt, endOfLastWeek),
        ),
        orderBy: desc(commitsTable.createdAt),
        limit: 10,
      });
    });

    return commits.length;
  }),
});
