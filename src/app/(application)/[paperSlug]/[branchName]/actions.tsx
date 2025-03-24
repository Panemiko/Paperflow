"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GitBranchIcon } from "lucide-react";
import { NewBranchForm } from "./new-branch-form";

export function PaperActions({
  workingBranch,
}: {
  workingBranch: { id: string; isMainBranch: boolean };
}) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm">
            <GitBranchIcon />
            Criar branch
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar branch</DialogTitle>
            <DialogDescription>
              Antes de prosseguir, defina um nome para sua branch.
            </DialogDescription>
          </DialogHeader>
          <div>
            <NewBranchForm branchId={workingBranch.id} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
