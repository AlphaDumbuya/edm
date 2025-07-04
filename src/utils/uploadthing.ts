import { createUploadthing, type FileRouter } from "uploadthing/server";

export const ourFileRouter = {
  imageUploader: createUploadthing()
    // @ts-ignore
    .onUploadComplete(async ({ file }) => {
      // handle the uploaded file here
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;