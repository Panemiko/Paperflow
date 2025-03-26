import { standaloneApi } from "@/trpc/react";
import { type Value } from "@udecode/plate";
import { createPlatePlugin } from "@udecode/plate/react";
import { EditorStatePlugin } from "./editor-state-plugin";

export const AutoSavePlugin = createPlatePlugin({
  key: "auto-save",
  options: {
    lastSavedTime: new Date(),
    lastSavedContent: [] as Value,
    isSaving: false,
  },
  handlers: {
    onChange({ value, api, getOption, editor, setOption }) {
      if (api.isReadOnly()) return;

      // in case the content is the same as the last saved content
      if (value === getOption("lastSavedContent")) return;

      const lastSavedTime = getOption("lastSavedTime");

      // Prevent saving too frequently
      if (
        lastSavedTime &&
        new Date().getTime() - lastSavedTime.getTime() < 5000
      ) {
        return;
      }

      const { decoupledBranchId } = editor.getPlugin(EditorStatePlugin).options;
      if (!decoupledBranchId) return;

      setOption("isSaving", true);

      void standaloneApi.editor.quickSaveContent.mutate({
        content: value,
        id: decoupledBranchId,
      });

      // for some reason, being instant is a flaw -_-
      setTimeout(() => {
        setOption("isSaving", false);
      }, 3000);

      setOption("lastSavedTime", new Date());
      setOption("lastSavedContent", value);
    },
  },
});
