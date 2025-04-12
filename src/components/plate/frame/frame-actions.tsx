"use client";

import { EditorStatePlugin } from "@/components/editor/plugins/editor-state-plugin";
import { usePlateValue, usePluginOption } from "@udecode/plate/react";
import { AutoSavePlugin } from "../../editor/plugins/auto-save-plugin";
import { CommitCreationMenu } from "./commit-creation-menu";
import { NewBranchDialog } from "./new-branch-dialog";
import { ViewCommits } from "./view-commits";

export function FrameActions() {
  const readOnly = usePlateValue("readOnly");
  const isSaving = usePluginOption(AutoSavePlugin, "isSaving");

  const workingBranch = usePluginOption(EditorStatePlugin, "workingBranch");

  return (
    <div className="flex items-center gap-2">
      {!readOnly && (
        <span className="text-foreground/70 mr-3 text-xs">
          {isSaving ? "Salvando..." : "Salvo"}
        </span>
      )}

      {/* <div className="h-5">
        <Separator orientation="vertical" />
      </div> */}

      <div className="flex items-center gap-2">
        <ViewCommits />
        {workingBranch?.id && (
          <NewBranchDialog
            iconButton={workingBranch.isEditable}
            originBranchId={workingBranch.id}
          />
        )}
      </div>

      {/* <div className="h-5">
        <Separator orientation="vertical" />
      </div> */}

      {workingBranch?.isEditable && workingBranch.referencesCommitId && (
        <CommitCreationMenu
          workingBranchId={workingBranch.id}
          previousCommitId={workingBranch.referencesCommitId}
        />
      )}
    </div>
  );
}
