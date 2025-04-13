"use client";

import { Frame } from "@/components/frame";
import { type ReactNode } from "react";
import { FrameActions } from "./frame-actions";
import { FrameLocation } from "./frame-location";

export function EditorFrame({ children }: { children: ReactNode }) {
  return (
    <Frame locationRender={<FrameLocation />} actions={<FrameActions />}>
      {children}
    </Frame>
  );
}
