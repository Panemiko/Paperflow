import { createPlatePlugin } from "@udecode/plate/react";

export const ReadOnlyPlugin = createPlatePlugin({
  key: "read-only",
  override: {
    plugins: {
      "fixed-toolbar": {
        enabled: false,
      },
    },
  },
  options: {
    readOnly: true,
  },
});
