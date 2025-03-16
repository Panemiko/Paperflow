"use client";

import { withCn } from "@udecode/cn";

import { Toolbar } from "./toolbar";

export const FixedToolbar = withCn(
  Toolbar,
  "fixed top-6 left-1/2 -translate-x-1/2 z-50 border rounded-3xl scrollbar-hide max-w-7xl justify-between overflow-x-auto border-b border-b-border bg-background p-1",
);
