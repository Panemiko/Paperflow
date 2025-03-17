"use client";

import { withCn } from "@udecode/cn";

import { Toolbar } from "./toolbar";

export const FixedToolbar = withCn(
  Toolbar,
  "z-50 w-fit scrollbar-hide fixed left-1/2 -translate-x-1/2 top-14 justify-between overflow-x-auto border border-border rounded-xl bg-background p-1",
);
