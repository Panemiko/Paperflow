import { branchSchema, paperSchema, userSchema } from "@/lib/schema";
import { tryCatch } from "@/lib/utils";
import { branches, papers, snapshots } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

async function generateDefaultPaperContent(title: string, userName: string) {
  return [
    {
      children: [
        {
          text: title,
        },
      ],
      type: "h1",
      align: "center",
    },
    {
      children: [
        {
          text: userName,
        },
      ],
      type: "p",
      align: "center",
    },
    {
      children: [
        {
          text: "",
        },
      ],
      type: "p",
    },
    {
      type: "p",
      lineHeight: "1.2",
      align: "justify",
      children: [
        {
          text: "Para editar esse texto, crie uma ramificação no canto superior direito da tela.",
        },
      ],
    },
  ];
}

export const paperRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      paperSchema.pick({ title: true, description: true }).merge(
        z.object({
          mainBranch: branchSchema.pick({ name: true }),
          invitedUsersEmail: z.array(userSchema.shape.email),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      const defaultPaperContent = await generateDefaultPaperContent(
        input.title,
        ctx.auth.user.name,
      );

      const { paperId } = await ctx.db.transaction(async (tx) => {
        const [createdPaper] = await tx
          .insert(papers)
          .values({
            title: input.title,
            description: input.description,
            createdByUserId: ctx.auth.user.id,
          })
          .returning();

        if (!createdPaper) {
          tx.rollback();
          throw new Error("Failed to create paper");
        }

        const [mainBranch] = await tx
          .insert(branches)
          .values({
            content: defaultPaperContent,
            name: input.mainBranch.name,
            ownerId: ctx.auth.user.id,
            paperId: createdPaper.id,
            isEditable: false,
          })
          .returning();

        if (!mainBranch) {
          tx.rollback();
          throw new Error("Failed to create main branch");
        }

        await tx
          .update(papers)
          .set({
            mainBranchId: mainBranch.id,
          })
          .where(eq(papers.id, createdPaper.id));

        await tx.insert(snapshots).values({
          name: "Conteúdo inicial",
          description: "Explicação básica de como usar o Paperflow.",
          branchId: mainBranch.id,
          changes: defaultPaperContent,
          madeByUserId: ctx.auth.user.id,
        });

        return {
          paperId: createdPaper.id,
        };
      });

      return {
        paperId,
      };
    }),
  list: protectedProcedure.query(async ({ ctx }) => {
    const [userPapers, error] = await tryCatch(
      ctx.db.query.papers.findMany({
        where: eq(papers.createdByUserId, ctx.auth.user.id),
        orderBy: desc(papers.createdAt),
        with: {
          mainBranch: {
            columns: {
              id: true,
              name: true,
            },
          },
          branches: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
        limit: 10,
        columns: {
          id: true,
          title: true,
        },
      }),
    );

    if (error) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }

    return userPapers;
  }),
});
