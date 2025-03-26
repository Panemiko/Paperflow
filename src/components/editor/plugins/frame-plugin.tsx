/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { EditorFrame } from "@/components/plate/frame/frame";
import { createPlatePlugin } from "@udecode/plate/react";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

export const FramePlugin = createPlatePlugin({
  key: "frame",
  options: {
    breadcrumbItems: [] as BreadcrumbItem[],
  },
  render: {
    aboveSlate({ children }) {
      return <EditorFrame>{children}</EditorFrame>;
    },
  },
});
