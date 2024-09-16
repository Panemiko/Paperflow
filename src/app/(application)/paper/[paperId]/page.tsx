import { MaxWidth } from "@/components/max-width";
import { Button } from "@/components/ui/button";
import { changesToText } from "@/lib/diff";
import { api } from "@/trpc/server";
import { BookIcon, HistoryIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { type Change } from "textdiff-create";
import { CommitForm } from "./commit-form";
import { Editor } from "./editor";
import { Initializer } from "./initializer";
import { PaperLocation } from "./paper-location";

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
    <>
      <Initializer
        initialState={{
          commits,
          paper,
          section,
          content: changesToText(
            commits.map((commit) => commit.changes) as Change[][],
          ),
        }}
      />
      <div className="w-full">
        <div className="fixed left-12 top-0 z-50 flex w-[calc(100%-2rem)] items-center justify-between border-b border-b-border bg-background px-8 py-2">
          <PaperLocation />
          <div className="flex gap-4">
            <Button variant="link" size="sm">
              <BookIcon /> Guides
            </Button>
            <Button variant="outline" size="sm">
              <HistoryIcon /> Lastest commits
            </Button>
            <CommitForm />
          </div>
        </div>
        <MaxWidth className="flex w-full justify-center px-10 py-32">
          <div className="w-full">
            <Editor />
          </div>
        </MaxWidth>
      </div>
    </>
  );
}
