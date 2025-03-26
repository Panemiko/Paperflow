/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Frame } from "@/components/frame";
import { FrameActions } from "@/components/plate-ui/frame-actions";
import {
  createPlatePlugin,
  usePluginOption
} from "@udecode/plate/react";

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
      const breadcrumbItems = usePluginOption(FramePlugin, "breadcrumbItems");

      return (
        <Frame breadcrumbItems={breadcrumbItems} actions={<FrameActions />}>
          {children}
        </Frame>
      );
    },
  },
});
