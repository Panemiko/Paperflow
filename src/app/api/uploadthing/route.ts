import { auth } from "@/lib/auth";
import type { FileRouter } from "uploadthing/next";

import { createRouteHandler, createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const ourFileRouter = {
  editorUploader: f({
    image: {
      maxFileCount: 1,
      maxFileSize: "16MB",
    },
  })
    .middleware(async ({ req }) => {
      const authentication = await auth.api.getSession({
        headers: req.headers,
      });

      if (!authentication?.user) throw new UploadThingError("Unauthorized");

      return { userId: authentication.user.id };
    })
    .onUploadComplete(({ file, metadata }) => {
      return { file, uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
