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
import { section } from "@/mock/section";
import {
  BookIcon,
  ChevronDownIcon,
  GitGraphIcon,
  HistoryIcon,
} from "lucide-react";
import { CommitForm } from "./commit-form";
import { Editor } from "./editor";

export default async function Page() {
  const paper = {
    id: "1",
    title: "Metodologia para incrementar a tecnologia na vida das pessoas",
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
                  {sections[0]!.title}
                  <ChevronDownIcon className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
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
              <SheetHeader>
                <SheetTitle>Commit changes</SheetTitle>
                <SheetDescription>
                  Commit changes to the section &quot;{section.title}&quot;.
                </SheetDescription>
              </SheetHeader>
              <CommitForm />
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <MaxWidth className="flex w-full justify-center px-10 py-32">
        <div className="w-full">
          <Editor markdown={section.content} />
        </div>
      </MaxWidth>
    </div>
  );
}
