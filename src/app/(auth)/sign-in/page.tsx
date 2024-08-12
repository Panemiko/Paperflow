import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRightIcon } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { EmailForm } from "./email-form";

export const metadata: Metadata = {
  title: "Sign in",
};

export default async function Page() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="mb-4 text-4xl font-medium">Sign in</h1>
        <p className="text-foreground/70">
          To sign in, choose one of the options below.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <Button
            asChild
            size="lg"
            className="w-full justify-between bg-[#4285f4] text-white"
          >
            <Link href="/api/auth/google">
              <div className="flex items-center gap-4">
                <FaGoogle className="size-5" />
                Sign in with Google
              </div>
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <Separator />
          <span className="font-medium text-foreground/70">OR</span>
          <Separator />
        </div>
        <EmailForm />
      </div>
    </div>
  );
}
