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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { commitSchema } from "@/lib/schema";
import { tryCatch } from "@/lib/utils";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditorState } from "@udecode/plate/react";
import { GalleryHorizontalEndIcon, GitCommit } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const formSchema = z.object({
  name: commitSchema.shape.name,
  description: commitSchema.shape.description.or(z.literal("")),
});

export function CommitCreationMenu({
  workingBranchId,
  previousCommitId,
}: {
  workingBranchId: string;
  previousCommitId: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: zodResolver(formSchema),
  });

  const editor = useEditorState();
  const { mutateAsync: commit } = api.editor.commit.useMutation();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const [response, error] = await tryCatch(
      commit({
        branchId: workingBranchId,
        previousCommitId,
        data: {
          name: data.name,
          description: data.description,
          contentState: editor.children,
        },
      }),
    );

    if (error || !response) {
      toast.error("Erro ao criar branch", {
        description: "Tente novamente mais tarde.",
      });
      return;
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm">
          <GalleryHorizontalEndIcon />
          Commit
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[500px]">
        <SheetHeader>
          <SheetTitle>Criar commit</SheetTitle>
          <SheetDescription>
            O commit é a versão do documento que será salva na sua branch atual.
            Você pode adicionar uma mensagem para descrever as alterações
            feitas.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 px-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do commit</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="add: adicionar referências"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    O nome de um commit deve especificar brevemente o que foi
                    alterado.
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
                  <FormLabel>Descrição do commit (opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={7}
                      placeholder='Adicionado algumas referências que estavam citadas na introdução mas não adicionada na seção de "Referências".'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A descrição do commit pode ser mais longa e detalhar as
                    alterações feitas. Ela pode incluir informações como o
                    motivo da mudança, o que foi alterado e como isso afeta o
                    projeto.
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
              <GitCommit className="mr-2" /> Fazer commit
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
