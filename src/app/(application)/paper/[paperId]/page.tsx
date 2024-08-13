import { MaxWidth } from "@/components/max-width";
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
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { Editor } from "./editor";

export default async function Page() {
  const paper = {
    id: "1",
    title: "Paper Title",
  };

  const sections = [
    {
      id: "1",
      title: "Section 1",
    },
    {
      id: "2",
      title: "Section 2",
    },
    {
      id: "3",
      title: "Section 3",
    },
  ];

  return (
    <div className="w-full">
      <div className="fixed left-12 top-0 z-50 w-full border-b border-b-border bg-background px-8 py-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/app">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/paper/${paper.id}`}>
                {paper.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  {sections[0]!.title}
                  <ChevronDownIcon className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {sections.map((section, index) => (
                    <DropdownMenuItem key={index}>
                      <BreadcrumbLink
                        href={`/paper/${paper.id}#section-${section.id}`}
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
      </div>
      <MaxWidth className="flex flex-col items-center gap-20 py-20">
        {sections.map((section, index) => (
          <div
            id={`section-${section.id}`}
            key={index}
            className="prose-sm prose-headings:font-bold w-full max-w-4xl text-justify"
          >
            <span className="mb-3 block text-center text-2xl font-bold text-foreground/70">
              {section.title}
            </span>
            <Editor
              markdown=""
              className="min-h-[60rem] w-full rounded-md bg-background px-10 py-14"
            />
          </div>
        ))}
      </MaxWidth>
    </div>
  );
}
