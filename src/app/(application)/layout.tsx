import { MaxWidth } from "@/components/max-width";
import { FullAvatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { LogOutIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { type ReactNode } from "react";
import { Navigation } from "./navigation";

export default async function Layout({ children }: { children: ReactNode }) {
  const user = {
    firstName: "Tito",
    lastName: "Oliveira",
    fullName: "Tito Oliveira",
    email: "email@exemplo.com",
    avatarUrl: "/avatar.jpg",
  };

  return (
    <div>
      <header className="border-b border-b-border">
        <MaxWidth className="flex items-center justify-between py-2">
          <Link href={`/home`} className="group flex items-center gap-5">
            <span className="text-2xl font-medium text-primary">Paperflow</span>
          </Link>
          <div className="flex items-center gap-10">
            <Navigation href={`/home`}>Início</Navigation>
            <Navigation href={`/projects`}>Projetos</Navigation>
            <Navigation href={`/latest-changes`}>
              Alterações recentes
            </Navigation>
            <Navigation href={`/revise`}>Revisar</Navigation>
            <Separator orientation="vertical" className="h-9" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <FullAvatar
                  className="size-9"
                  src={user.avatarUrl}
                  fullName={user.fullName}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent sideOffset={8} side="bottom" align="end">
                <DropdownMenuLabel>{user.fullName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/account`}>
                    <UserIcon />
                    Sua conta
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="">
                    <LogOutIcon /> Sair
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </MaxWidth>
      </header>
      <MaxWidth className="py-20">{children}</MaxWidth>
    </div>
  );
}
