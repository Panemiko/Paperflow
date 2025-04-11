import { branchSchema, paperSchema } from "@/lib/schema";
import { tryCatch } from "@/lib/utils";
import { api } from "@/trpc/server";
import { type Value } from "@udecode/plate";
import { notFound } from "next/navigation";
import { z } from "zod";
import { PaperEditor } from "./paper-editor";

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
    <PaperEditor
      readOnly={!workingBranch.isEditable}
      paper={{ mainBranch: paperMainBranch!, ...paper }}
      workingBranch={workingBranch}
      defaultContent={
        ((editorContent.workingBranch.decoupled[0]?.contentState as Value) ||
          (editorContent.workingBranch.referencedCommit?.contentState as Value)) ??
        []
      }
    />
  );
}
