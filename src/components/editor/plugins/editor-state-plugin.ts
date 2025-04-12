import { createPlatePlugin } from "@udecode/plate/react";

export const EditorStatePlugin = createPlatePlugin({
  key: "editor-state",
  options: {
    decoupledBranchId: null as string | null,
    paper: null as {
      title: string;
      slug: string;
      mainBranch: { name: string };
    } | null,
    workingBranch: null as {
      id: string;
      name: string;
      isMainBranch: boolean;
      isEditable: boolean;
      referencesCommitId: string | null;
      decoupled: { id: string }[];
    } | null,
  },
});
