import { standaloneApi } from "@/trpc/react";
import { type Value } from "@udecode/plate";
import { createPlatePlugin } from "@udecode/plate/react";

export const AutoSavePlugin = createPlatePlugin({
  key: "auto-save",
  options: {
    lastSavedTime: new Date(),
    decoupledBranchId: null as string | null,
    lastSavedContent: [] as Value,
  },
  handlers: {
    onChange(editor) {
      if (editor.api.isReadOnly()) return;

      // in case the content is the same as the last saved content
      if (editor.value === editor.getOption("lastSavedContent")) return;

      const lastSavedTime = editor.getOption("lastSavedTime");

      // Prevent saving too frequently
      if (
        lastSavedTime &&
        new Date().getTime() - lastSavedTime.getTime() < 5000
      ) {
        console.log("Saving too frequently");
        return;
      }

      const decoupledBranchId = editor.getOption("decoupledBranchId");
      if (!decoupledBranchId) return;

      void standaloneApi.editor.quickSaveContent.mutate({
        content: editor.value,
        id: decoupledBranchId,
      });

      editor.setOptions({ lastSavedTime: new Date() });
      editor.setOptions({ lastSavedContent: editor.value });
    },
  },
});
