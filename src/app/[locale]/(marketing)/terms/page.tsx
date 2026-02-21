import { MaxWidth } from "@/components/max-width";
import { Locale } from "@/dictionaries";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <main className="min-h-screen pt-32 pb-24 border-b border-border bg-background">
      <MaxWidth>
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 font-mono uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" />
          {locale === "en" ? "Back to Home" : "Voltar para Início"}
        </Link>
        <div className="prose prose-neutral dark:prose-invert prose-headings:font-serif prose-headings:font-bold prose-p:text-muted-foreground max-w-3xl">
          {locale === "en" ? (
            <>
              <h1>Terms of Service</h1>
              <p>
                Last updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>

              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using Paperflow ("we", "our", or "us"), you
                agree to be bound by these Terms of Service. If you do not agree
                with any part of these terms, you may not use our service.
              </p>

              <h2>2. Description of Service</h2>
              <p>
                Paperflow provides a version-controlled writing platform
                designed for professionals. We reserve the right to modify,
                suspend, or discontinue any part of the service at any time
                without notice.
              </p>

              <h2>3. User Account and Data</h2>
              <p>
                You retain all rights to the content you create, upload, or
                store in Paperflow. We claim no ownership over your writing. You
                are responsible for maintaining the confidentiality of your
                account credentials.
              </p>

              <h2>4. Acceptable Use</h2>
              <p>
                You agree not to use the service for any illegal activities or
                to upload malicious content. We reserve the right to terminate
                accounts that violate our usage policies.
              </p>

              <h2>5. Disclaimer of Warranties</h2>
              <p>
                The service is provided "as is" and "as available" without any
                warranties of any kind. We do not guarantee that the service
                will be uninterrupted or error-free.
              </p>

              <h2>6. Limitation of Liability</h2>
              <p>
                We shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages resulting from your use of or
                inability to use the service.
              </p>
            </>
          ) : (
            <>
              <h1>Termos de Serviço</h1>
              <p>
                Última atualização:{" "}
                {new Date().toLocaleDateString("pt-BR", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>

              <h2>1. Aceitação dos Termos</h2>
              <p>
                Ao acessar e usar o Paperflow ("nós", "nosso" ou "nos"), você
                concorda em ficar vinculado a estes Termos de Serviço. Se você
                não concordar com qualquer parte destes termos, você não poderá
                usar nosso serviço.
              </p>

              <h2>2. Descrição do Serviço</h2>
              <p>
                O Paperflow fornece uma plataforma de escrita com controle de
                versão projetada para profissionais. Nós nos reservamos o
                direito de modificar, suspender ou descontinuar qualquer parte
                do serviço a qualquer momento, sem aviso prévio.
              </p>

              <h2>3. Conta e Dados do Usuário</h2>
              <p>
                Você retém todos os direitos sobre o conteúdo que criar, enviar
                ou armazenar no Paperflow. Não reivindicamos nenhuma propriedade
                sobre sua escrita. Você é responsável por manter a
                confidencialidade das credenciais de sua conta.
              </p>

              <h2>4. Uso Aceitável</h2>
              <p>
                Você concorda em não usar o serviço para atividades ilegais ou
                enviar conteúdo malicioso. Nós nos reservamos o direito de
                encerrar contas que violem nossas políticas de uso.
              </p>

              <h2>5. Isenção de Garantias</h2>
              <p>
                O serviço é fornecido "no estado em que se encontra" e "conforme
                disponível" sem garantias de qualquer tipo. Nós não garantimos
                que o serviço será ininterrupto ou livre de erros.
              </p>

              <h2>6. Limitação de Responsabilidade</h2>
              <p>
                Não seremos responsáveis por quaisquer danos indiretos,
                incidentais, especiais, consequenciais ou punitivos resultantes
                do uso do ou incapacidade de usar o serviço.
              </p>
            </>
          )}
        </div>
      </MaxWidth>
    </main>
  );
}
