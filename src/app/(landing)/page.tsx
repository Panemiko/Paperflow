import { MaxWidth } from "@/components/max-width";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import { EmailForm } from "./email-form";

export default function Page() {
  return (
    <div>
      <section className="-mt-28 border-b-2 border-b-border py-20 pt-48">
        <MaxWidth className="flex flex-col items-center">
          <h1 className="mb-12 max-w-4xl text-center text-6xl font-bold text-foreground">
            Repensando como as pesquisas são escritas
          </h1>
          <p className="mb-16 max-w-prose text-center text-foreground/70">
            Mude a maneira de escrever suas pesquisas e otimize o fluxo do
            trabalho do seu grupo ou sozinho.
          </p>
          <Button asChild>
            <Link href="/signup">
              <StarIcon /> Experimente Paperflow
            </Link>
          </Button>
        </MaxWidth>
      </section>

      <section className="py-20">
        <MaxWidth className="text-center">
          <h2 className="mb-8 text-4xl font-bold">Sobre o Paperflow</h2>
          <p className="mx-auto max-w-prose">
            Paperflow é uma plataforma digital criada para facilitar o trabalho
            colaborativo e o controle de versões de documentos acadêmicos,
            trazendo praticidade e organização para estudantes e pesquisadores.
          </p>
        </MaxWidth>
      </section>

      <section className="bg-gray-100 py-20">
        <MaxWidth>
          <h2 className="mb-8 text-center text-4xl font-bold">
            Funcionalidades
          </h2>
          <ul className="space-y-4 text-center">
            <li>Sistema de Versionamento de Documentos</li>
            <li>Escrita em Markdown para fácil formatação</li>
            <li>Permissões personalizadas para colaboração</li>
            <li>Controle de versão eficiente para acadêmicos</li>
          </ul>
        </MaxWidth>
      </section>

      <section className="py-20">
        <MaxWidth>
          <h2 className="mb-8 text-center text-4xl font-bold">
            Vantagens Acadêmicas
          </h2>
          <p className="mx-auto max-w-prose text-center">
            Paperflow simplifica a organização de documentos, permitindo que
            equipes acadêmicas se concentrem no desenvolvimento e colaboração
            com recursos específicos para o ambiente educacional.
          </p>
        </MaxWidth>
      </section>

      <section className="bg-gray-100 py-20">
        <MaxWidth className="text-center">
          <h2 className="mb-8 text-4xl font-bold">Painel de Controle</h2>
          <p className="mx-auto max-w-prose">
            Gerencie permissões e acompanhe atividades de edição em tempo real,
            assegurando que seu projeto esteja sempre atualizado e seguro.
          </p>
        </MaxWidth>
      </section>

      <section className="py-20">
        <MaxWidth className="text-center">
          <h2 className="mb-8 text-4xl font-bold">
            Fluxo de Trabalho Simplificado
          </h2>
          <p className="mx-auto max-w-prose">
            Com uma interface intuitiva e funcionalidades de produtividade, o
            Paperflow é projetado para otimizar o fluxo de trabalho acadêmico do
            início ao fim.
          </p>
        </MaxWidth>
      </section>

      <section className="bg-gray-100 py-20">
        <MaxWidth className="text-center">
          <h2 className="mb-8 text-4xl font-bold">Segurança e Privacidade</h2>
          <p className="mx-auto max-w-prose">
            Com segurança integrada e autenticação avançada, garantimos que seus
            dados e documentos estejam sempre protegidos.
          </p>
        </MaxWidth>
      </section>

      <section className="py-20">
        <MaxWidth className="text-center">
          <h2 className="mb-8 text-4xl font-bold">
            Depoimentos e Estudos de Caso
          </h2>
          <p className="mx-auto max-w-prose">
            “O Paperflow transformou a forma como nossa equipe trabalha,
            facilitando a colaboração e o controle de versões.” – Estudante de
            Pesquisa Científica
          </p>
        </MaxWidth>
      </section>

      <section className="bg-gray-100 py-20">
        <MaxWidth className="text-center">
          <h2 className="mb-8 text-4xl font-bold">
            Roadmap de Desenvolvimento
          </h2>
          <p className="mx-auto max-w-prose">
            Nosso roadmap inclui funcionalidades como sistema de convites e
            dashboard em tempo real. Fique atento para mais novidades.
          </p>
        </MaxWidth>
      </section>

      <section className="py-20">
        <MaxWidth className="flex flex-col items-center">
          <h2 className="mb-8 text-4xl font-bold">
            Inscreva-se para a versão Beta
          </h2>
          <p className="mb-8 max-w-prose text-center">
            Junte-se ao Paperflow e seja um dos primeiros a experimentar as
            nossas funcionalidades exclusivas para projetos acadêmicos.
          </p>
          <EmailForm />
        </MaxWidth>
      </section>
    </div>
  );
}
