"use client";

import {
  usePlateValue,
  usePluginOption
} from "@udecode/plate/react";
import { AutoSavePlugin } from "../editor/plugins/auto-save-plugin";

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
    </div>
  );
}
