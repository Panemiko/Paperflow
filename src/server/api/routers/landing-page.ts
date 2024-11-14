import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const landingPageRouter = createTRPCRouter({
  submitEmail: publicProcedure
    .input(
      z.object({
        email: z.string().trim().min(1).email(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const audiences = await ctx.resend.audiences.list();
      const audience = audiences.data?.data[0];
      const audienceId = audience
        ? audience.id
        : (
            await ctx.resend.audiences.create({
              name: "Potential users",
            })
          ).data?.id;

      if (!audienceId) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }

      await ctx.resend.contacts.create({
        email: input.email,
        unsubscribed: false,
        audienceId,
      });
    }),
});
