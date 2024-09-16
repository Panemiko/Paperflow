"use client";

import { type EditorStore, useEditorStore } from "./store";

export function Initializer({
  initialState,
}: {
  initialState: Partial<EditorStore>;
}) {
  useEditorStore.setState(initialState);

  return <></>;
}
