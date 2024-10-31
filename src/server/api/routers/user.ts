import { userSchema } from "@/lib/schemas";
import { sendSignInCode } from "@/server/auth/email";
import { usersTable } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

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
});
