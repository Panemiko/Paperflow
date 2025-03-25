/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { AutoSavePlugin } from "@/components/editor/plugins/auto-save-plugin";
import { FramePlugin } from "@/components/editor/plugins/frame-plugin";
import { useCreateEditor } from "@/components/editor/use-create-editor";
import { Editor } from "@/components/plate-ui/editor";
import { truncateText } from "@/lib/utils";
import { type Value } from "@udecode/plate";
import {
  Plate,
  useEditorPlugin,
  useEditorRef,
  usePlateSet,
} from "@udecode/plate/react";
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
    name: string;
    isMainBranch: boolean;
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
  const editor = useEditorRef();
  const setReadOnly = usePlateSet("readOnly");
  const decoupledBranch = workingBranch.decoupled?.[0];

  const framePlugin = useEditorPlugin(FramePlugin);
  const autoSavePlugin = useEditorPlugin(AutoSavePlugin);

  useEffect(() => {
    setReadOnly(readOnly ?? false);
  }, [readOnly, setReadOnly]);

  useEffect(() => {
    framePlugin.setOption("breadcrumbItems", [
      { name: "Artigos" },
      {
        name: truncateText(paper.title, 40),
        href: workingBranch.isMainBranch
          ? `/${paper.slug}/${paper.mainBranch.name}`
          : undefined,
      },
      { name: workingBranch.name },
    ]);
  }, [paper, workingBranch]);

  useEffect(() => {
    autoSavePlugin.setOption("decoupledBranchId", decoupledBranch?.id ?? null);
  }, [decoupledBranch?.id]);

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
