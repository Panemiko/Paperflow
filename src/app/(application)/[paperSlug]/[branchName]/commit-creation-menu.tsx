"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { GitCommitIcon } from "lucide-react";

export function CommitCreationMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm">
          <GitCommitIcon />
          Commit
        </Button>
      </SheetTrigger>
    </Sheet>
  );
}
