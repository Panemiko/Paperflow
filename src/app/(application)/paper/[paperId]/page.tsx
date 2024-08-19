import { api } from "@/trpc/server";
import { notFound } from "next/navigation";
import EditorArea from "./editor-area";

export default async function Page({
  params,
  searchParams,
}: {
  params: { paperId: string };
  searchParams: { s?: string };
}) {
  const paper = await api.paper.byId({ id: params.paperId });

  if (!paper) {
    return notFound();
  }

  const sections = await api.section.byPaper({ paperId: paper.id });

  if (!sections) {
    return notFound();
  }

  const section =
    sections.find((section) => section.id === searchParams.s) ?? sections[0];

  if (!section) {
    return notFound();
  }

  const commits = await api.commit.bySection({ sectionId: section.id });

  return (
    <EditorArea
      commits={commits}
      paper={paper}
      sections={sections}
      sectionId={section.id}
    />
  );
}
