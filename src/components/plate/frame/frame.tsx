"use client";

import { EditorStatePlugin } from "@/components/editor/plugins/editor-state-plugin";
import { FramePlugin } from "@/components/editor/plugins/frame-plugin";
import { Frame } from "@/components/frame";
import { truncateText } from "@/lib/utils";
import { usePluginOption } from "@udecode/plate/react";
import { type ReactNode } from "react";
import { FrameActions } from "./frame-actions";

export function EditorFrame({ children }: { children: ReactNode }) {
  const breadcrumbItems = usePluginOption(FramePlugin, "breadcrumbItems");
  const paper = usePluginOption(EditorStatePlugin, "paper");
  const workingBranch = usePluginOption(EditorStatePlugin, "workingBranch");

  // first return the defined breadcrumbItems, if there are any
  // then return the paper title and the working branch name
  // if there are no breadcrumbItems
  const breadcrumbs =
    breadcrumbItems.length > 0
      ? breadcrumbItems
      : paper && workingBranch
        ? [
            {
              name: truncateText(paper.title, 40),
              href: workingBranch.isMainBranch
                ? undefined
                : `/${paper.slug}/${paper.mainBranch.name}`,
            },
            { name: workingBranch.name },
          ]
        : [];

  return (
    <Frame breadcrumbItems={breadcrumbs} actions={<FrameActions />}>
      {children}
    </Frame>
  );
}
