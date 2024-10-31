"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { env } from "@/env";
import { type RouterError } from "@/trpc/react";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function VerifyCode({ email }: { email: string }) {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { mutateAsync: verifySignInCode } = useMutation({
    mutationFn: async ({ code, email }: { code: string; email: string }) => {
      return await fetch(`${env.NEXT_PUBLIC_URL}/api/verify`, {
        method: "POST",
        body: JSON.stringify({ code, email }),
      });
    },
  });

  async function submit() {
    setIsLoading(true);

    try {
      await verifySignInCode({
        email,
        code,
      });

      router.push("/app");
    } catch (e) {
      const error = e as RouterError;
      if (error.data?.code === "FORBIDDEN") {
        toast.error("Invalid code", {
          description:
            "The code you entered is incorrect or expired. Please try again.",
        });
      }
    }

    setIsLoading(false);
  }

  return (
    <div className="flex items-center gap-4">
      <InputOTP
        disabled={isLoading}
        maxLength={6}
        onChange={setCode}
        onComplete={submit}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      {isLoading && <Loader2Icon className="animate-spin text-foreground/70" />}
    </div>
  );
}
