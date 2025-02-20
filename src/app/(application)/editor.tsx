"use client";

import {
  EditorContent,
  type EditorInstance,
  EditorRoot,
  type JSONContent,
} from "novel";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const extensions = [...defaultExtensions, slashCommand];

const TailwindEditor = () => {
  const [saveStatus, setSaveStatus] = useState("Salvado");
  const [content, setContent] = useState<JSONContent>({
    text: "",
    type: "String",
    content: [],
  });

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();
      setContent(json);
      setSaveStatus("Salvado");
    },
    500,
  );

  return (
    <EditorRoot>
      <EditorContent
        extensions={[]}
        initialContent={content}
        onUpdate={({ editor }) => {
          void debouncedUpdates(editor);
          setSaveStatus("Não salvado");
        }}
        editorProps={{}}
      >
        <div />
      </EditorContent>
    </EditorRoot>
  );
};
export default TailwindEditor;
