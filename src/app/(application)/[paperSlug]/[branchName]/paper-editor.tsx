/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { EditorStatePlugin } from "@/components/editor/plugins/editor-state-plugin";
import { useCreateEditor } from "@/components/editor/use-create-editor";
import { Editor } from "@/components/plate/editor";
import { type Value } from "@udecode/plate";
import { Plate, useEditorPlugin, usePlateSet } from "@udecode/plate/react";
import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface PaperEditorProps {
  defaultContent?: Value;
  readOnly?: boolean;

  paper: {
    title: string;
    slug: string;
    mainBranch: {
      name: string;
    };
  };

  workingBranch: {
    id: string;
    name: string;
    isMainBranch: boolean;
    isEditable: boolean;
    referencesCommitId: string | null;
    decoupled: {
      id: string;
    }[];
  };
}

export function EditorInstance({
  readOnly,
  paper,
  workingBranch,
}: PaperEditorProps) {
  const setReadOnly = usePlateSet("readOnly");
  const decoupledBranch = workingBranch.decoupled?.[0];

  const editorStatePlugin = useEditorPlugin(EditorStatePlugin);

  useEffect(() => {
    setReadOnly(readOnly ?? false);
  }, [readOnly, setReadOnly]);

  useEffect(() => {
    editorStatePlugin.setOption("paper", paper);
  }, [paper]);

  useEffect(() => {
    editorStatePlugin.setOption(
      "decoupledBranchId",
      decoupledBranch?.id ?? null,
    );
  }, [decoupledBranch?.id]);

  useEffect(() => {
    return editorStatePlugin.setOption("workingBranch", workingBranch || null);
  }, [workingBranch]);

  return <Editor variant="default" />;
}

export function PaperEditor(props: PaperEditorProps) {
  const editor = useCreateEditor({
    value: props.defaultContent,
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor}>
        <EditorInstance {...props} />
      </Plate>
    </DndProvider>
  );
}
