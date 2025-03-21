"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { branchSchema, paperSchema } from "@/lib/schema";
import { tryCatch } from "@/lib/utils";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = paperSchema.pick({ title: true, description: true }).merge(
  z.object({
    mainBranch: branchSchema.pick({ name: true }),
    invitedUsersEmail: z.string(),
  }),
);

export function NewPaperForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      description: "",
      invitedUsersEmail: "",
      mainBranch: {
        name: "",
      },
      title: "",
    },
    resolver: zodResolver(formSchema),
  });

  const { mutateAsync: createPaper } = api.paper.create.useMutation();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const [result, error] = await tryCatch(
      createPaper({
        title: data.title,
        description: data.description,
        invitedUsersEmail: [],
        mainBranch: data.mainBranch,
      }),
    );

    if (error) {
      toast.error("Erro ao criar artigo", {
        description: "Tente novamente mais tarde.",
      });
      return;
    }

    redirect(`/paper/${result.paperId}`);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl space-y-6">
      <Form {...form}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Projeto</FormLabel>
              <FormControl>
                <Input placeholder="Nome do seu projeto acadêmico" {...field} />
              </FormControl>
              <FormDescription>
                Nome que identificará seu projeto no sistema.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descrição do projeto (opcional)"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Uma breve descrição sobre o seu projeto.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mainBranch.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Branch Principal</FormLabel>
              <FormControl>
                <Input placeholder="main" {...field} />
              </FormControl>
              <FormDescription>
                O nome da branch principal do seu projeto. Geralmente é
                &quot;main&quot; ou &quot;master&quot;.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="invitedUsersEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emails para Convite</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="email1@exemplo.com, email2@exemplo.com"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Adicione emails separados por vírgula para convidar
                colaboradores.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          isLoading={form.formState.isSubmitting}
          className="mt-4 w-full"
          size="lg"
          type="submit"
        >
          <PlusIcon className="mr-2" /> Criar Projeto
        </Button>
      </Form>
    </form>
  );
}
