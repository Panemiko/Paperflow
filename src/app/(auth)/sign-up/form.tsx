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
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

const schema = userSchema.pick({
  email: true,
  lastName: true,
  firstName: true,
});

export function EmailForm() {
  const searchParams = useSearchParams();

  const form = useForm({
    defaultValues: {
      email: searchParams.get("email") ?? "",
      firstName: "",
      lastName: "",
    },
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const { mutateAsync: registerWithEmail } =
    api.user.registerWithEmail.useMutation();

  async function submit(data: z.infer<typeof schema>) {
    try {
      await registerWithEmail({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      setCookie("email", data.email, { maxAge: 60 * 10 });

      router.push(`/verify`);
      toast.success("Email sent. Confirm the code to proceed.");
    } catch {}
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <div className="mb-10 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
