import { DocumentViewer } from "@/components/editor/document-viewer";
import { PlateEditor } from "@/components/editor/plate-editor";
import { Frame } from "@/components/frame";
import { branchSchema, paperSchema } from "@/lib/schema";
import { truncateText, tryCatch } from "@/lib/utils";
import { api } from "@/trpc/server";
import { type Value } from "@udecode/plate";
import { notFound } from "next/navigation";
import { z } from "zod";
import { PaperActions } from "./actions";

export default async function Page({
  params: unvalidatedParams,
}: {
  params: Promise<{ paperSlug: string; branchName: string }>;
}) {
  const [params, paramsValidationError] = await tryCatch(
    z
      .object({
        paperSlug: paperSchema.shape.slug,
        branchName: branchSchema.shape.name,
      })
      .parseAsync(await unvalidatedParams),
  );

  if (paramsValidationError) {
    return notFound();
  }

  const [editorContent, loadContentError] = await tryCatch(
    api.editor.loadEditorContent({
      paperSlug: params.paperSlug,
      branchName: params.branchName,
    }),
  );

  if (loadContentError || !editorContent) {
    return notFound();
  }

  const { paper, workingBranch } = editorContent;

  const paperMainBranch = paper.branches.find((branch) => branch.isMainBranch);

  return (
    <Frame
      breadcrumbItems={[
        { name: "Artigos" },
        {
          name: truncateText(paper.title, 40),
          href: workingBranch.isMainBranch
            ? `/${paper.slug}/${paperMainBranch!.name}`
            : undefined,
        },
        { name: workingBranch.name },
      ]}
      actions={<PaperActions workingBranch={workingBranch} />}
    >
      {workingBranch.isEditable && (
        <PlateEditor defaultContent={workingBranch.content as Value} />
      )}

      {/* When is the main branch */}
      {!workingBranch.isEditable && (
        <DocumentViewer content={workingBranch.content as Value} />
      )}
    </Frame>
  );
}
