"use client";

import { createPlatePlugin } from "@udecode/plate/react";

import { FixedToolbar } from "@/components/plate/toolbar/fixed-toolbar";
import { FixedToolbarButtons } from "@/components/plate/toolbar/fixed-toolbar-buttons";

export const FixedToolbarPlugin = createPlatePlugin({
  key: "fixed-toolbar",
  render: {
    beforeEditable: ({ readOnly }) => {
      if (readOnly) return null;

      return (
        <FixedToolbar>
          <FixedToolbarButtons />
        </FixedToolbar>
      );
    },
  },
});
