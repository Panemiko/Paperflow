import { branchSchema, idSchema, paperSchema, userSchema } from "@/lib/schema";
import { tryCatch } from "@/lib/utils";
import { branches, commits, papers } from "@/server/db/schema";
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
      align: "center",
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
      paperSchema.pick({ title: true, description: true, slug: true }).merge(
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

      const result = await ctx.db.transaction(async (tx) => {
        const [createdPaper] = await tx
          .insert(papers)
          .values({
            slug: input.slug,
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

        await tx.insert(commits).values({
          name: "Conteúdo inicial",
          description: "Explicação básica de como usar o Paperflow.",
          changes: defaultPaperContent,
          madeByUserId: ctx.auth.user.id,
        });

        return {
          paper: {
            slug: createdPaper.slug,
            id: createdPaper.id,
          },
          branch: {
            id: mainBranch.id,
            name: mainBranch.name,
          },
        };
      });

      return result;
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
          slug: true,
        },
      }),
    );

    if (error) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }

    return userPapers.map((paper) => ({
      ...paper,
    }));
  }),

  byId: protectedProcedure
    .input(z.object({ paperId: idSchema }))
    .query(async ({ ctx, input }) => {
      const [paper, error] = await tryCatch(
        ctx.db.query.papers.findFirst({
          where: eq(papers.id, input.paperId),
        }),
      );

      if (error || !paper) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return paper;
    }),
});
