import { CustomLink } from "@/components/ui/link";
import { type Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { VerifyCode } from "./verify-code";

export const metadata: Metadata = {
  title: "Verify",
};

export default async function Page() {
  const emailCookie = cookies().get("email");

  if (!emailCookie) {
    return redirect("/sign-in");
  }

  const email = emailCookie.value;

  return (
    <div>
      <div className="mb-10">
        <h1 className="mb-4 text-4xl font-medium">Check your email</h1>
        <p className="text-foreground/70">
          Check your inbox to verify your email address. If you don&apos;t see
          the email, check your spam folder.
        </p>
      </div>
      <div className="mb-10 flex flex-col gap-4">
        <VerifyCode email={email} />
      </div>

      <div className="flex flex-col">
        <span className="text-foreground/70">{email}</span>{" "}
        <CustomLink href="/sign-in">Sign in with another email</CustomLink>
      </div>
    </div>
  );
}
