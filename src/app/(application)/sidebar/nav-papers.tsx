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
  SidebarMenuSub
} from "@/components/ui/sidebar";
import { tryCatch } from "@/lib/utils";
import { api } from "@/trpc/server";
import Link from "next/link";
import { NavBranchButton } from "./nav-branch-button";

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
          {papers.map((paper, index) => {
            return (
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
                      <NavBranchButton
                        href={`/paper/${paper.id}`}
                        isMain
                        name={paper.mainBranch!.name}
                      />
                      {paper.branches
                        .filter((branch) => branch.id !== paper.mainBranch?.id)
                        .map((branch, index) => (
                          <NavBranchButton
                            key={index}
                            href={`/paper/${paper.id}/${branch.id}`}
                            name={branch.name}
                          />
                        ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          })}
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
