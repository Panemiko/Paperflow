import { paperSchema } from "@/lib/schemas";
import { papersTable } from "@/server/db/schema";
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
      const paper = await ctx.db.query.papersTable.findFirst({
        where: and(
          eq(papersTable.id, input.id),
          eq(papersTable.ownerId, ctx.auth.user.id),
        ),
      });

      if (!paper) {
        return null;
      }

      return paper;
    }),
});
