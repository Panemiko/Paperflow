"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { env } from "@/env";
import { type publicUserSchema } from "@/lib/schemas";
import { useMutation } from "@tanstack/react-query";
import { LogOutIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { type z } from "zod";

export function UserDropdown({
  user,
}: {
  user: z.infer<typeof publicUserSchema>;
}) {
  const nameIntials =
    user.firstName.split(" ")[0]![0]! +
    user.lastName.split(" ")[user.lastName.split(" ").length - 1]![0]!;

  const { mutateAsync: signOut } = useMutation({
    mutationFn: async () => {
      return await fetch(`${env.NEXT_PUBLIC_URL}/api/auth/sign-out`, {
        method: "POST",
      });
    },
  });

  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-9 ">
          <AvatarFallback className="border-2 border-secondary bg-background">
            {nameIntials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="end">
        <DropdownMenuLabel>
          {user.firstName} {user.lastName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/account`}>
            <UserIcon />
            Your account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            await signOut();
            router.push("/sign-in");
            toast.success("You have been signed out");
          }}
          asChild
        >
          <div>
            <LogOutIcon /> Sign out
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
