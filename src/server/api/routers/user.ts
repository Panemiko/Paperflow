import { signInCodeSchema, userSchema } from "@/lib/schemas";
import { sendSignInCode } from "@/server/auth/email";
import { signInCodesTable, usersTable } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  registerWithEmail: publicProcedure
    .input(
      userSchema.pick({
        email: true,
        firstName: true,
        lastName: true,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.db.query.usersTable.findFirst({
        where: eq(usersTable.email, input.email),
      });

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
        });
      }

      const [newUser] = await ctx.db
        .insert(usersTable)
        .values({
          email: input.email,
          emailVerified: false,
          firstName: input.firstName,
          lastName: input.lastName,
        })
        .onConflictDoNothing()
        .returning({
          id: usersTable.id,
          email: usersTable.email,
        });

      if (!newUser) {
        throw new Error("Failed to create user");
      }

      const emailSendError = await sendSignInCode(newUser);

      if (emailSendError) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  isEmailRegistered: publicProcedure
    .input(
      userSchema.pick({
        email: true,
      }),
    )
    .output(
      z.object({
        exists: z.boolean(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const existingUser = await ctx.db.query.usersTable.findFirst({
        where: eq(usersTable.email, input.email),
      });

      return {
        exists: !!existingUser,
      };
    }),
  signInWithEmail: publicProcedure
    .input(userSchema.pick({ email: true }))
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.db.query.usersTable.findFirst({
        where: eq(usersTable.email, input.email),
      });

      if (!existingUser) {
        throw new TRPCError({
          code: "FORBIDDEN",
        });
      }

      const emailSendError = await sendSignInCode(existingUser);

      if (emailSendError) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  verifySignInCode: publicProcedure
    .input(
      userSchema
        .pick({ email: true })
        .merge(signInCodeSchema.pick({ code: true })),
    )
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.db.query.usersTable.findFirst({
        where: eq(usersTable.email, input.email),
      });

      if (!existingUser) {
        throw new TRPCError({
          code: "FORBIDDEN",
        });
      }

      const existingCode = await ctx.db.query.signInCodesTable.findFirst({
        where: and(
          eq(signInCodesTable.userId, existingUser.id),
          eq(signInCodesTable.code, input.code),
        ),
      });

      if (!existingCode || existingCode?.expiresAt.getTime() < Date.now()) {
        throw new TRPCError({
          code: "FORBIDDEN",
        });
      }

      await ctx.db.transaction(async (tx) => {
        await tx
          .update(usersTable)
          .set({
            emailVerified: true,
          })
          .where(eq(usersTable.id, existingUser.id));

        await tx
          .delete(signInCodesTable)
          .where(eq(signInCodesTable.id, existingCode.id));
      });

      const session = await ctx.lucia.createSession(existingUser.id, {});
      const sessionCookie = ctx.lucia.createSessionCookie(session.id);

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }),
  signOut: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.lucia.invalidateSession(ctx.auth.session.id);

    const blankSession = ctx.lucia.createBlankSessionCookie();
    cookies().set(
      blankSession.name,
      blankSession.value,
      blankSession.attributes,
    );
  }),
});
