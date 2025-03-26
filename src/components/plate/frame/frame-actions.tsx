"use client";

import { usePlateValue, usePluginOption } from "@udecode/plate/react";
import { GitBranchIcon } from "lucide-react";
import { AutoSavePlugin } from "../../editor/plugins/auto-save-plugin";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

export function FrameActions() {
  const readOnly = usePlateValue("readOnly");
  const isSaving = usePluginOption(AutoSavePlugin, "isSaving");

  // commit button
  // new branch button

  return (
    <div>
      {!readOnly && (
        <span className="text-foreground/70 text-sm">
          {isSaving ? "Salvando..." : "Salvo"}
        </span>
      )}

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
            <div></div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
