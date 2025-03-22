"use client";

import { Button } from "@/components/ui/button";
import { GitBranchIcon } from "lucide-react";

export function PaperActions() {
  return (
    <div>
      <Button size="sm">
        <GitBranchIcon />
        Criar ramificação
      </Button>
    </div>
  );
}
