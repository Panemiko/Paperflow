import { type Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { OtpInputForm } from "./otp-input";

export const metadata: Metadata = {
  title: "Entrar",
};

export default async function Page() {
  const userEmail = (await cookies()).get("email");

  if (!userEmail) {
    redirect("/auth/sign-in");
  }

  return (
    <div>
      <h1 className="mb-3 text-4xl font-bold">Verifique o seu e-mail</h1>
      <p className="text-foreground/70 mb-10">
        Enviamos um código de verificação para{" "}
        <strong>{userEmail.value}</strong>. Insira o código abaixo.
      </p>
      <OtpInputForm email={userEmail.value} />
    </div>
  );
}
