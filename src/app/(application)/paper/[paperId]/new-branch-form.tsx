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
import { branchSchema } from "@/lib/schema";
import { tryCatch } from "@/lib/utils";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { GitBranchPlusIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

const formSchema = branchSchema.pick({ name: true });

export function NewBranchForm({ branchId }: { branchId: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(formSchema),
  });

  const { mutateAsync: createBranch } = api.branch.create.useMutation();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const [branchResult, error] = await tryCatch(
      createBranch({
        name: data.name,
        basedOnBranchId: branchId,
      }),
    );

    if (error) {
      toast.error("Erro ao criar branch", {
        description: "Tente novamente mais tarde.",
      });
      return;
    }

    redirect(`/paper/${branchResult.paperId}/${branchResult.createdBranchId}`);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md space-y-6">
      <Form {...form}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Branch</FormLabel>
              <FormControl>
                <Input placeholder="adicionar_objetivos" {...field} />
              </FormControl>
              <FormDescription>
                É uma boa prática usar um nome que descreva o objetivo da
                branch. (utilize somente letras, números, hífens e underscores)
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
          <GitBranchPlusIcon className="mr-2" /> Criar Branch
        </Button>
      </Form>
    </form>
  );
}
