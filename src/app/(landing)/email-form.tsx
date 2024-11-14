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
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Coloque um e-mail antes")
    .max(128)
    .email("E-mail inválido"),
});

export function EmailForm() {
  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(formSchema),
  });

  const { mutateAsync, isPending } = api.landingPage.submitEmail.useMutation();

  async function submit(data: z.infer<typeof formSchema>) {
    try {
      await mutateAsync({
        email: data.email,
      });
    } catch {
      toast.error("Não foi possível");
    }
  }

  return (
    <Form {...form}>
      <form className="flex gap-3" onSubmit={form.handleSubmit(submit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seu e-mail</FormLabel>
              <FormControl>
                <Input placeholder="seuemail@example.com" {...field} />
              </FormControl>
              <FormDescription>
                E-mail pessoal para receber novidades sobre o projeto. Sem spam,
                cancele quando quiser.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Adicionar</Button>
      </form>
    </Form>
  );
}
