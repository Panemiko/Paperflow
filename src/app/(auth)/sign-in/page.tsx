import { CustomLink } from "@/components/ui/link";
import { type Metadata } from "next";
import { SignInForm } from "./form";

export const metadata: Metadata = {
  title: "Entrar",
};

export default async function Page() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="mb-4 text-4xl font-medium">Entrar</h1>
        <p className="text-foreground/70">
          Não tem uma conta? <CustomLink href="/sign-up">Crie uma</CustomLink>
        </p>
      </div>
      <SignInForm />
    </div>
  );
}
