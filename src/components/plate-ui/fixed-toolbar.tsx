"use client";

import { withCn } from "@udecode/cn";

import { Toolbar } from "./toolbar";

export const FixedToolbar = withCn(
  Toolbar,
  "z-50 w-full scrollbar-hide justify-between overflow-x-auto border-y border-b-border bg-background p-1",
);
