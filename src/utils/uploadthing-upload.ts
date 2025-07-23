import { UploadThingError } from "uploadthing/server";

export async function uploadToUploadthing(file: File): Promise<string> {
  // This function uploads a file to Uploadthing and returns the file URL
  const formData = new FormData();
  formData.append("file", file);

  // You may need to adjust the endpoint URL based on your Uploadthing config
  const res = await fetch("/api/uploadthing?endpoint=imageUploader", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    throw new UploadThingError("Upload failed");
  }
  const data = await res.json();
  // The response should contain the file URL
  return data[0]?.url || data[0]?.fileUrl || data[0]?.ufsUrl;
}
