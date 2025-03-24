"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Plate } from "@udecode/plate/react";

import { useCreateEditor } from "@/components/editor/use-create-editor";
import { Editor } from "@/components/plate-ui/editor";
import { type Value } from "@udecode/plate";

export function PlateEditor({ defaultContent }: { defaultContent?: Value }) {
  const editor = useCreateEditor({
    value: defaultContent,
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor}>
        <Editor variant="default" />
      </Plate>
    </DndProvider>
  );
}
