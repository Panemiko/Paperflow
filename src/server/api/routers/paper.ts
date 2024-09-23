import { paperSchema } from "@/lib/schemas";
import { paperPermissionsTable, papersTable } from "@/server/db/schema";
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
    const paper = await ctx.db
      .select()
      .from(papersTable)
      .leftJoin(
        paperPermissionsTable,
        and(eq(papersTable.id, paperPermissionsTable.paperId)),
      )
      .where(and(eq(paperPermissionsTable.userId, ctx.auth.user.id)));

    return paper.map((paper) => paper.papers);
  }),
});
