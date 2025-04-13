"use client";
import { AutoSavePlugin } from "@/components/editor/plugins/auto-save-plugin";
import { EditorStatePlugin } from "@/components/editor/plugins/editor-state-plugin";
import { usePlateValue, usePluginOption } from "@udecode/plate/react";
import { CheckIcon, Loader2Icon, PenOffIcon } from "lucide-react";

export function FrameLocation() {
  const paper = usePluginOption(EditorStatePlugin, "paper");
  const workingBranch = usePluginOption(EditorStatePlugin, "workingBranch");
  const isSaving = usePluginOption(AutoSavePlugin, "isSaving");
  const readOnly = usePlateValue("readOnly");

  if (!paper || !workingBranch) {
    return null;
  }

  return (
    <div className="flex h-full flex-col justify-center">
      <div className="max-w-md truncate">
        <span className="text-foreground/70 text-sm">{paper.title}</span>
      </div>
      <div className="-mt-1 flex h-7 max-w-lg items-center gap-3">
        <span className="text-primary truncate text-2xl font-bold">
          {workingBranch.name}
        </span>
        {!readOnly && (
          <span className="text-foreground/70 mt-1 text-xs">
            {isSaving ? (
              <span className="flex items-center gap-0.5">
                <Loader2Icon className="text-foreground/50 size-3 animate-spin" />{" "}
                Salvando...
              </span>
            ) : (
              <span className="flex items-center gap-0.5">
                <CheckIcon className="text-foreground/50 size-3" /> Salvo
              </span>
            )}
          </span>
        )}
        {workingBranch.isMainBranch && (
          <span className="text-primary-foreground bg-primary mt-1 rounded-sm px-1 text-xs">
            Principal
          </span>
        )}
        {readOnly && (
          <span className="text-foreground/70 mt-1 flex items-center gap-0.5 text-xs">
            <PenOffIcon className="text-foreground/50 size-3" /> Somente leitura
          </span>
        )}
      </div>
    </div>
  );
}
