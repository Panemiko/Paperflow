import { standaloneApi } from "@/trpc/react";
import { type Value } from "@udecode/plate";
import { createPlatePlugin } from "@udecode/plate/react";
import debounce from "lodash.debounce";
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

      const decoupledBranchId = editor.getOption(
        EditorStatePlugin,
        "decoupledBranchId",
      );

      if (!decoupledBranchId) return;

      const debounced = debounce(async () => {
        if (value === getOption("lastSavedContent")) return;

        const lastSavedTime = getOption("lastSavedTime").getTime();
        const currentTime = new Date().getTime();

        // if the last saved time is less than 5 seconds ago, wait for 5 seconds
        // and then save again
        if (lastSavedTime && currentTime - lastSavedTime < 5000) {
          setTimeout(
            () => {
              void debounced();
            },
            5000 - (currentTime - lastSavedTime),
          );
          return;
        }

        // begin saving
        setOption("isSaving", true);

        void standaloneApi.editor.quickSaveContent.mutate({
          contentState: value,
          id: decoupledBranchId,
        });

        // for some reason, being instant is a flaw -_-
        setTimeout(() => {
          setOption("isSaving", false);
        }, 3000);

        setOption("lastSavedTime", new Date());
        setOption("lastSavedContent", value);
      }, 300);

      void debounced();
    },
  },
});
