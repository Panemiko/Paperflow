"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { GalleryHorizontalEndIcon } from "lucide-react";

export function CommitCreationMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm">
          <GalleryHorizontalEndIcon />
          Commit
        </Button>
      </SheetTrigger>
    </Sheet>
  );
}
