import { PlateEditor } from "@/components/editor/plate-editor";
import { Frame } from "@/components/frame";
import { idSchema } from "@/lib/schema";
import { truncateText, tryCatch } from "@/lib/utils";
import { api } from "@/trpc/server";
import { type Value } from "@udecode/plate";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ paperId: string; branchId: string }>;
}) {
  const [ids, paramsError] = await tryCatch(
    idSchema
      .array()
      .parseAsync([(await params).paperId, (await params).branchId]),
  );

  if (paramsError) {
    return notFound();
  }

  const [paperId, branchId] = ids as [string, string];

  const [paper, paperError] = await tryCatch(api.paper.byId({ paperId }));
  const [branch, branchError] = await tryCatch(api.branch.byId({ branchId }));

  if (paperError || branchError || branch.paperId !== paper.id) {
    return notFound();
  }

  return (
    <Frame
      breadcrumbItems={[
        { name: "Artigos" },
        { name: truncateText(paper.title, 40), href: `/paper/${paperId}` },
        { name: branch.name },
      ]}
    >
      <PlateEditor defaultContent={branch.content as Value} />
    </Frame>
  );
}
