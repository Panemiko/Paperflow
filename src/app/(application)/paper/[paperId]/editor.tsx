"use client";

import { changesToText } from "@/lib/diff";
import { type MDXEditorMethods, type MDXEditorProps } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { forwardRef, useMemo } from "react";
import { type Change } from "textdiff-create";
import { useEditorStore } from "./store";

// ForwardRefEditor.tsx

// This is the only place InitializedMDXEditor is imported directly.
const EditorRaw = dynamic(() => import("./editor-raw"), {
  // Make sure we turn SSR off
  ssr: false,
});

// This is what is imported by other components. Pre-initialized with plugins, and ready
// to accept other props, including a ref.
export const Editor = forwardRef<MDXEditorMethods, Partial<MDXEditorProps>>(
  (props, ref) => {
    const { content, setContent, commits } = useEditorStore();

    const previousContent = useMemo(
      () =>
        changesToText(commits.map((commit) => commit.changes) as Change[][]),
      [commits],
    );

    return (
      <EditorRaw
        markdown={content}
        onChange={setContent}
        previousContent={previousContent}
        editorRef={ref}
        {...props}
      />
    );
  },
);

// TS complains without the following line
Editor.displayName = "Editor";
