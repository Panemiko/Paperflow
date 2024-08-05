import { CustomLink } from "@/components/ui/link";
import { type Metadata } from "next";
import { SignUpForm } from "./form";

export const metadata: Metadata = {
  title: "Cadastrar",
};

export default async function Page() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="mb-4 text-4xl font-medium">Cadastrar</h1>
        <p className="text-foreground/70">
          Já tem uma conta? <CustomLink href="/sign-in">Entre</CustomLink>
        </p>
      </div>
      <SignUpForm />
      <span className="text-sm block mt-4 text-foreground/70">
        Ao cadastrar, você concorda com nossos{" "}
        <CustomLink href="/terms">Termos de Serviço</CustomLink> e{" "}
        <CustomLink href="/privacy">Política de Privacidade</CustomLink>.
      </span>
    </div>
  );
}
