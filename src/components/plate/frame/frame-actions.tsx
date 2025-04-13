"use client";

import { EditorStatePlugin } from "@/components/editor/plugins/editor-state-plugin";
import { usePluginOption } from "@udecode/plate/react";
import { BranchActions } from "./branch-actions";
import { CommitCreationMenu } from "./commit-creation-menu";
import { NewBranchDialog } from "./new-branch-dialog";
import { ViewCommits } from "./view-commits";

export function FrameActions() {
  const workingBranch = usePluginOption(EditorStatePlugin, "workingBranch");

  return (
    <div className="flex items-center gap-3 mr-4">
      <ViewCommits />

      {workingBranch?.id && (
        <NewBranchDialog
          iconButton={workingBranch.isEditable}
          originBranchId={workingBranch.id}
        />
      )}

      {workingBranch?.isEditable && workingBranch.referencesCommitId && (
        <CommitCreationMenu
          workingBranchId={workingBranch.id}
          previousCommitId={workingBranch.referencesCommitId}
        />
      )}

      <BranchActions />
    </div>
  );
}
