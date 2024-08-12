import { CustomLink } from "@/components/ui/link";
import { type Metadata } from "next";
import { EmailForm } from "./form";

export const metadata: Metadata = {
  title: "Sign up",
};

export default async function Page() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="mb-4 text-4xl font-medium">Sign up</h1>
        <p className="text-foreground/70">
          Fill your information to create an account.
        </p>
        <p className="text-foreground/70">
          Already have an account?{" "}
          <CustomLink href="/sign-in">Sign in</CustomLink>
        </p>
      </div>
      <div className="mb-2">
        <EmailForm />
      </div>
      <div>
        <span className="text-foreground/70 text-xs">
          By clicking Continue, you agree to our{" "}
          <CustomLink href="/terms">Terms</CustomLink> and{" "}
          <CustomLink href="/privacy">Privacy Policy</CustomLink>.
        </span>
      </div>
    </div>
  );
}
