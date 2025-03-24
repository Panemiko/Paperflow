import { Frame } from "@/components/frame";
import { idSchema } from "@/lib/schema";
import { truncateText, tryCatch } from "@/lib/utils";
import { api } from "@/trpc/server";
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
        { name: truncateText(paper.title, 40), href: `/paper/${paperId}` },
        { name: mainBranch.name },
      ]}
    >
      <div></div>
    </Frame>
  );
}
