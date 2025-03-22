import { DocumentViewer } from "@/components/editor/document-viewer";
import { idSchema } from "@/lib/schema";
import { tryCatch } from "@/lib/utils";
import { api } from "@/trpc/server";
import { type Value } from "@udecode/plate";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { Frame } from "../../frame";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ paperId: string }>;
}): Promise<Metadata> {
  const [paper, paperError] = await tryCatch(
    api.paper.byId({
      paperId: (await params).paperId,
    }),
  );

  if (paperError) {
    return notFound();
  }

  return {
    title: paper.title,
    description: "Visualize o conteúdo de um artigo",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ paperId: string }>;
}) {
  const [paperId, paramsError] = await tryCatch(
    idSchema.parseAsync((await params).paperId),
  );

  if (paramsError) {
    return notFound();
  }

  const [paper, paperError] = await tryCatch(api.paper.byId({ paperId }));
  const [mainBranch, mainBranchError] = await tryCatch(
    api.branch.getMainBranchFromPaper({ paperId }),
  );

  if (paperError || mainBranchError) {
    return notFound();
  }

  return (
    <Frame
      breadcrumbItems={[
        { name: "Artigos" },
        { name: paper.title },
        { name: mainBranch.name },
      ]}
    >
      <DocumentViewer content={mainBranch.content as Value} />
    </Frame>
  );
}
