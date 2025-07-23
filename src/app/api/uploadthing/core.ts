
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique name
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      // For now, we'll allow all uploads. In a real app, you'd authenticate users.
      // const user = await auth(req); // Example: your auth function
      // if (!user) throw new UploadThingError("Unauthorized");
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      // return { userId: user.id };
      return { tempUserId: "mockUserId" }; // Placeholder
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.tempUserId);
      console.log("file ufsUrl", file.ufsUrl);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.tempUserId, ufsUrl: file.ufsUrl };
    }),
  
  // Example route for gallery images, allowing multiple files
  galleryImageUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 10 } })
    .middleware(async ({ req }) => {
      // Add authentication logic here if needed for gallery uploads
      return { uploaderInfo: "gallery-upload" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Gallery image upload complete:", file.ufsUrl);
      return { uploadedBy: metadata.uploaderInfo, ufsUrl: file.ufsUrl };
    }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
