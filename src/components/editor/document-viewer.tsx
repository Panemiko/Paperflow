"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Plate, usePlateState } from "@udecode/plate/react";

import { useCreateEditor } from "@/components/editor/use-create-editor";
import { Editor } from "@/components/plate-ui/editor";
import { type Value } from "@udecode/plate";
import { useEffect } from "react";

function DocumentViewerEditor() {
  const [, setReadOnly] = usePlateState("readOnly");

  useEffect(() => {
    setReadOnly(true);
  }, [setReadOnly]);

  return <Editor variant="default" />;
}

export function DocumentViewer({ content }: { content: Value }) {
  const editor = useCreateEditor({
    value: content,
    override: {
      plugins: {
        "fixed-toolbar": {
          enabled: false,
        },
      },
    },
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor}>
        <DocumentViewerEditor />
      </Plate>
    </DndProvider>
  );
}
