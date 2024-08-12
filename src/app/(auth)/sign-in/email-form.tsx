"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userSchema } from "@/lib/schemas";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import { ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

const schema = userSchema.pick({
  email: true,
});

export function EmailForm() {
  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const utils = api.useUtils();

  const { mutateAsync: signInWithEmail } =
    api.user.signInWithEmail.useMutation();

  async function submit(data: z.infer<typeof schema>) {
    try {
      const { exists } = await utils.user.isEmailRegistered.fetch({
        email: data.email,
      });

      if (!exists) {
        toast.error("Email not found. Please create an account first.");
        router.push("/sign-up?email=" + data.email);
        return;
      }

      await signInWithEmail({ email: data.email });

      setCookie("email", data.email, { maxAge: 60 * 10 });

      router.push(`/verify`);
      toast.success("Email sent. Confirm the code to continue.");
    } catch {}
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <div className="mb-10">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="youremail@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button isLoading={form.formState.isSubmitting} className="w-full">
          <ChevronRightIcon /> CONTINUE
        </Button>
      </form>
    </Form>
  );
}
