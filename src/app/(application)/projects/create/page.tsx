import { CustomLink } from "@/components/ui/link";
import { type Metadata } from "next";
import { CreateProjectForm } from "./form";

export const metadata: Metadata = {
  title: "Novo projeto",
};

export default async function Page() {
  return (
    <div className="flex gap-32">
      <div className="mb-10 max-w-sm">
        <h1 className="mb-4 text-4xl font-medium">Novo projeto</h1>
        <p className="text-foreground/70">
          Pronto para criar seu novo projeto de pesquisa?{" "}
          <CustomLink href="/projects">Veja seus projetos</CustomLink>
        </p>
      </div>
      <div className="w-full max-w-lg">
        <CreateProjectForm />
      </div>
    </div>
  );
}
