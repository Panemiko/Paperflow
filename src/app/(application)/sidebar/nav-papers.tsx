import { ChevronRight, PlusIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { tryCatch } from "@/lib/utils";
import { api } from "@/trpc/server";
import Link from "next/link";

export async function NavPapers() {
  const [papers, error] = await tryCatch(api.paper.list());

  if (error) {
    return (
      <span className="text-foreground/70 text-xs">
        Houve um erro ao carregar os seus artigos
      </span>
    );
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Artigos</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {papers.map((paper, index) => (
            <Collapsible key={index} defaultOpen={true}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={`/paper/${paper.id}`} title={paper.title}>
                    <span className="truncate">{paper.title}</span>
                  </Link>
                </SidebarMenuButton>
                <CollapsibleTrigger asChild>
                  <SidebarMenuAction
                    className="data-[state=open]:rotate-90"
                    showOnHover
                  >
                    <ChevronRight />
                  </SidebarMenuAction>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem key={index}>
                      <SidebarMenuSubButton
                        className="bg-primary/10 hover:bg-primary/30 rounded-lg transition-colors"
                        asChild
                      >
                        <Link
                          href={`/paper/${paper.id}`}
                          className="flex items-center"
                        >
                          <span>{paper.mainBranch?.name}</span>
                          <span className="text-primary ml-auto text-xs">
                            principal
                          </span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    {paper.branches
                      .filter((branch) => branch.id !== paper.mainBranch?.id)
                      .map((branch, index) => (
                        <SidebarMenuSubItem key={index}>
                          <SidebarMenuSubButton asChild>
                            <Link
                              href={`/paper/${paper.id}/branch/${branch.id}`}
                            >
                              <span>{branch.name}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="text-sidebar-foreground/70">
              <Link href="/paper/new">
                <PlusIcon />
                <span>Adicionar novo</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
