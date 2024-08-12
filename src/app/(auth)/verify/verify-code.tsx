"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { api, type RouterError } from "@/trpc/react";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function VerifyCode({ email }: { email: string }) {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { mutateAsync: verifySignInCode } =
    api.user.verifySignInCode.useMutation();

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
