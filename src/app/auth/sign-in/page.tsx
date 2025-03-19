import { auth } from "@/lib/auth";
import { type Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { EmailInputForm } from "./email-input";

export const metadata: Metadata = {
  title: "Entrar",
};

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.session.id) {
    redirect("/overview");
  }

  return (
    <div>
      <h1 className="mb-3 text-4xl font-bold">Entrar</h1>
      <p className="text-foreground/70 mb-10">
        Insira seu e-mail para receber um código para entrar na sua conta.
      </p>
      <EmailInputForm />
    </div>
  );
}
