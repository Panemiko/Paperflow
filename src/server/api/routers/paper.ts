import { env } from "@/env";
import { paperSchema, userSchema } from "@/lib/schemas";
import {
  commitsTable,
  paperInvitesTable,
  paperPermissionsTable,
  papersTable,
} from "@/server/db/schema";
import { resend } from "@/server/email";
import { createId } from "@paralleldrive/cuid2";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import PaperInviteEmail from "emails/paper-invite";
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
  create: protectedProcedure
    .input(
      paperSchema
        .pick({
          abstract: true,
          title: true,
        })
        .extend({
          invitedUsers: userSchema.pick({ email: true }).array(),
        }),
    )
    .mutation(async ({ ctx, input }) => {
      const { paper } = await ctx.db.transaction(async (tx) => {
        const papers = await tx
          .insert(papersTable)
          .values({
            title: input.title,
            abstract: input.abstract,
          })
          .returning();

        if (!papers[0]) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
          });
        }

        await tx.insert(paperPermissionsTable).values({
          paperId: papers[0].id,
          userId: ctx.auth.user.id,
          role: "author",
        });

        return {
          paper: papers[0],
        };
      });

      if (input.invitedUsers.length > 0) {
        const invites = await ctx.db
          .insert(paperInvitesTable)
          .values(
            input.invitedUsers.map((user) => ({
              paperId: paper.id,
              email: user.email,
              token: createId(),
            })),
          )
          .returning();

        if (env.NODE_ENV === "production") {
          await resend.batch.send(
            invites.map((invite) => ({
              from: `PaperFlow <papers@${env.RESEND_DOMAIN}>`,
              subject: "You've been invited to a PaperFlow paper",
              to: invite.email,
              text: `Paper collaboration invite for "${paper.title}"`,
              react: PaperInviteEmail({
                inviteUrl: `${env.NEXT_PUBLIC_URL}/invite?token=${invite.token}`,
                paperTitle: paper.title,
              }),
            })),
          );
        }

        if (env.NODE_ENV === "development") {
          console.log(`Invite link for the paper "${paper.title}"`);

          invites.forEach((invite) =>
            console.log(
              `${invite.email}: ${env.NEXT_PUBLIC_URL}/invite?token=${invite.token}`,
            ),
          );
        }
      }

      return paper.id;
    }),
});
