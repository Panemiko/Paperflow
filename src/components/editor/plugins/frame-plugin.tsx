"use client";

import { Frame } from "@/components/frame";
import { createPlatePlugin, usePluginOption } from "@udecode/plate/react";

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
    beforeEditable({ children }) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const breadcrumbItems = usePluginOption(FramePlugin, "breadcrumbItems");

      return (
        <Frame
          breadcrumbItems={breadcrumbItems}
          actions={
            <div>
              <span className="text-foreground/70 text-sm">{"Salvo"}</span>
            </div>
          }
        >
          {children}
        </Frame>
      );
    },
  },
});
