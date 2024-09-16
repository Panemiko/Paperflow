"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { useEditorStore } from "./store";

export function PaperLocation() {
  const { section, paper } = useEditorStore();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/app">Paperflow</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            className="max-w-xs truncate"
            href={`/paper/${paper?.id}`}
          >
            {paper?.title}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex max-w-xs items-center gap-1 truncate">
              {section?.title ?? "(untitled)"}
              <ChevronDownIcon className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {/* {sections.length === 0 && (
                <span className="text-sm text-foreground/70">No sections</span>
              )}
              {sections.map((section, index) => (
                <DropdownMenuItem key={index}>
                  <BreadcrumbLink
                    href={`/paper/${paper.id}#paper-section-${section.id}`}
                  >
                    {section.title}
                  </BreadcrumbLink>
                </DropdownMenuItem>
              ))} */}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
