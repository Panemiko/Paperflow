import { MaxWidth } from "@/components/max-width";
import { type Metadata } from "next";
import { Frame } from "../../frame";
import { NewPaperForm } from "./new-paper-form";

export const metadata: Metadata = {
  title: "New Paper",
};

export default async function Page() {
  return (
    <Frame breadcrumbItems={[{ name: "Artigos" }, { name: "Novo artigo" }]}>
      <MaxWidth className="px-14 py-20">
        <div className="mb-10">
          <h1 className="mb-4 text-4xl font-bold">Novo artigo</h1>
          <p className="text-foreground/70 max-w-prose">
            Aqui você pode criar um novo artigo e compartilhar com o mundo.
          </p>
        </div>
        <div>
          <NewPaperForm />
        </div>
      </MaxWidth>
    </Frame>
  );
}
