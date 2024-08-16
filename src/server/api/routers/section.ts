import { sectionSchema } from "@/lib/schemas";
import { papersTable, sectionsTable } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const sectionRouter = createTRPCRouter({
  byId: protectedProcedure
    .input(sectionSchema.pick({ id: true }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select()
        .from(sectionsTable)
        .leftJoin(papersTable, eq(sectionsTable.paperId, papersTable.id))
        .where(
          and(
            eq(sectionsTable.id, input.id),
            eq(papersTable.ownerId, ctx.auth.user.id),
          ),
        )
        .limit(1);

      return result[0]?.sections ?? null;
    }),
});
