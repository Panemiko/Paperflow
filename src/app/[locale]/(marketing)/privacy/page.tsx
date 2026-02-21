import { MaxWidth } from "@/components/max-width";
import { Locale } from "@/dictionaries";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function PrivacyPage({
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
              <h1>Privacy Policy</h1>
              <p>
                Last updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>

              <h2>1. Information We Collect</h2>
              <p>
                We collect personal information such as your email address when
                you sign up for our waitlist or create an account. When using
                our service, we securely store the documents and version
                histories you produce.
              </p>

              <h2>2. How We Use Information</h2>
              <p>
                We use your information exclusively to provide and improve the
                Paperflow service, communicate with you about updates, and
                maintain the security of your account. We never use your private
                text to train artificial intelligence models.
              </p>

              <h2>3. Data Sharing and Disclosure</h2>
              <p>
                We respect your privacy and do not sell your personal data or
                document content to third parties. We may share information with
                trusted third-party service providers who assist us in operating
                our platform, subject to strict confidentiality agreements.
              </p>

              <h2>4. Data Retention and Security</h2>
              <p>
                We implement robust security measures to protect your data
                against unauthorized access, alteration, or destruction. We
                retain your information for as long as your account is active or
                as needed to provide you the service.
              </p>

              <h2>5. Your Rights</h2>
              <p>
                You have the right to access, update, or request the deletion of
                your personal data and documents at any time. You can export
                your documents to standard formats via our platform.
              </p>

              <h2>6. Changes to This Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will
                notify you of any major changes by posting the new policy on
                this page and updating the "Last updated" date.
              </p>
            </>
          ) : (
            <>
              <h1>Política de Privacidade</h1>
              <p>
                Última atualização:{" "}
                {new Date().toLocaleDateString("pt-BR", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>

              <h2>1. Informações que Coletamos</h2>
              <p>
                Coletamos informações pessoais como seu endereço de e-mail ao
                entrar na lista de espera ou criar uma conta. Ao usar nosso
                serviço, armazenamos de forma segura os documentos e históricos
                de versão que você produzir.
              </p>

              <h2>2. Como Usamos as Informações</h2>
              <p>
                Utilizamos suas informações exclusivamente para fornecer e
                melhorar o serviço Paperflow, comunicar sobre atualizações e
                manter sua conta segura. Nós nunca utilizamos seus textos
                privados para treinar modelos de inteligência artificial.
              </p>

              <h2>3. Compartilhamento e Divulgação de Dados</h2>
              <p>
                Respeitamos a sua privacidade e não vendemos seus dados pessoais
                ou o conteúdo dos seus documentos para terceiros. O
                compartilhamento ocorre apenas com prestadores de serviços de
                confiança que suportam as operações da nossa plataforma sob
                rigorosos acordos de confidencialidade.
              </p>

              <h2>4. Retenção de Dados e Segurança</h2>
              <p>
                Implementamos robustas medidas de segurança para proteger os
                dados contra acesso, alteração ou destruição não autorizada.
                Mantemos suas informações pelo tempo em que sua conta estiver
                ativa ou enquanto formos fornecer o serviço.
              </p>

              <h2>5. Seus Direitos</h2>
              <p>
                Você tem o direito de acessar, atualizar ou solicitar a exclusão
                dos seus dados pessoais e documentos a qualquer momento. Você
                pode exportar seus documentos para formatos padrão em nossa
                plataforma.
              </p>

              <h2>6. Mudanças Nesta Política</h2>
              <p>
                Poderemos atualizar nossa Política de Privacidade
                ocasionalmente. Notificaremos sobre qualquer mudança importante
                publicando a nova política nesta página e alterando a data de
                atualização.
              </p>
            </>
          )}
        </div>
      </MaxWidth>
    </main>
  );
}
