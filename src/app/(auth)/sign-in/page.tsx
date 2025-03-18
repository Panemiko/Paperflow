import { EmailInputForm } from "./email-input";

export default async function Page() {
  return (
    <div className="">
      <div className="bg-card border-border flex h-screen w-full max-w-lg flex-col justify-center border-r px-8">
        <header></header>
        <div className="mb-40">
          <h1 className="mb-3 text-4xl font-bold">Entrar</h1>
          <p className="text-foreground/70 mb-10">
            Insira seu e-mail para receber um código para entrar na sua conta.
          </p>
          <EmailInputForm />
        </div>
        <footer className="text-foreground/70 text-sm">
          &copy; Paperflow {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}
