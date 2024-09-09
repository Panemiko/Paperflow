"use client";

import { MaxWidth } from "@/components/max-width";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { changesToText } from "@/lib/diff";
import {
  type commitSchema,
  type paperSchema,
  type sectionSchema,
} from "@/lib/schemas";
import {
  BookIcon,
  ChevronDownIcon,
  GitGraphIcon,
  HistoryIcon,
} from "lucide-react";
import { notFound } from "next/navigation";
import { useState } from "react";
import { type Change } from "textdiff-create";
import { type z } from "zod";
import { CommitForm } from "./commit-form";
import { Editor } from "./editor";

export default function EditorArea({
  commits,
  paper,
  sections,
  sectionId,
}: {
  paper: z.infer<typeof paperSchema>;
  sections: z.infer<typeof sectionSchema>[];
  commits: z.infer<typeof commitSchema>[];
  sectionId?: string;
}) {
  const section =
    sections.find((section) => section.id === sectionId) ?? sections[0];

  const [content, setContent] = useState(
    changesToText(commits.map((commit) => commit.changes).flat() as Change[]),
  );

  const contentUntilLastCommit = changesToText(
    commits.map((commit) => commit.changes).flat() as Change[],
  );

  if (!section) {
    return notFound();
  }

  return (
    <div className="w-full">
      <div className="fixed left-12 top-0 z-50 flex w-[calc(100%-2rem)] items-center justify-between border-b border-b-border bg-background px-8 py-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/app">Paperflow</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                className="max-w-xs truncate"
                href={`/paper/${paper.id}`}
              >
                {paper.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex max-w-xs items-center gap-1 truncate">
                  {sections[0]?.title ?? "(untitled)"}
                  <ChevronDownIcon className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {sections.length === 0 && (
                    <span className="text-sm text-foreground/70">
                      No sections
                    </span>
                  )}
                  {sections.map((section, index) => (
                    <DropdownMenuItem key={index}>
                      <BreadcrumbLink
                        href={`/paper/${paper.id}#paper-section-${section.id}`}
                      >
                        {section.title}
                      </BreadcrumbLink>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex gap-4">
          <Button variant="link" size="sm">
            <BookIcon /> Guides
          </Button>
          <Button variant="outline" size="sm">
            <HistoryIcon /> Last commits
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="sm">
                <GitGraphIcon /> Commit
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="mb-10">
                <SheetTitle>Commit changes</SheetTitle>
                <SheetDescription>
                  Commit changes to the section &quot;
                  {section?.title ?? "(untitled)"}&quot;.
                </SheetDescription>
              </SheetHeader>
              <CommitForm content={content} sectionId={section.id} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <MaxWidth className="flex w-full justify-center px-10 py-32">
        <div className="w-full">
          <Editor
            previousContent={contentUntilLastCommit}
            markdown={content}
            onChange={(value) => setContent(value)}
          />
        </div>
      </MaxWidth>
    </div>
  );
}
