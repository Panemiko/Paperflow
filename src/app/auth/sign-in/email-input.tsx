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
import { CustomLink } from "@/components/ui/link";
import { authClient } from "@/lib/auth/client";
import { userSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import { ArrowRightIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

const formSchema = userSchema.pick({ email: true });

export function EmailInputForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await authClient.emailOtp.sendVerificationOtp({
      email: data.email,
      type: "sign-in",
    });

    await setCookie("email", data.email, {}); // expires in the session

    toast.success("Código enviado com sucesso!");
    
    redirect("/auth/verify");
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Form {...form}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-10">
              <FormLabel>Seu e-mail</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="seuemail@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Utilize seu e-mail pessoal ou da sua instituição.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          isLoading={form.formState.isSubmitting}
          className="w-full"
          size="lg"
          type="submit"
        >
          <ArrowRightIcon /> Enviar código
        </Button>
        <p className="text-foreground/70 text-center text-xs">
          Por clicar no botão acima, você concorda com nossos{" "}
          <CustomLink href="/tos">Termos de uso</CustomLink> e{" "}
          <CustomLink href="/privacy">Política de privacidade</CustomLink>.
        </p>
      </Form>
    </form>
  );
}
