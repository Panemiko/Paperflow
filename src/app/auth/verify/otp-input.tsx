"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth/client";
import { otpCodeSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteCookie } from "cookies-next";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  otpCode: otpCodeSchema,
});

export function OtpInputForm({ email }: { email: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      otpCode: "",
    },
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    console.log(email);

    const { error } = await authClient.signIn.emailOtp({
      email,
      otp: data.otpCode,
    });

    if (error) {
      form.setError("otpCode", {
        message: "O código está incorreto ou já expirou",
      });
      return;
    }

    await deleteCookie("email");

    redirect("/overview");
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Form {...form}>
        <FormField
          control={form.control}
          name="otpCode"
          render={({ field }) => (
            <FormItem className="mb-10">
              <FormControl>
                <InputOTP
                  pattern={REGEXP_ONLY_DIGITS}
                  onComplete={form.handleSubmit(onSubmit)}
                  disabled={form.formState.isSubmitting}
                  maxLength={6}
                  {...field}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSeparator />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </form>
  );
}
