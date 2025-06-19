"use client";

import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { useState } from "react";

interface UploadButtonProps {
 onClientUploadComplete: (res: { key: string; url: string }[] | undefined) => void;
}

export function UploadButton({ onClientUploadComplete }: UploadButtonProps) {
  const [uploading, setUploading] = useState(false);

  return (
    <div>
      <UploadDropzone<OurFileRouter, "imageUploader">
        endpoint="imageUploader" // Replace with your specific endpoint if different
        onUploadProgress={() => setUploading(true)}
        onClientUploadComplete={(res) => {
          setUploading(false);
          onClientUploadComplete(res);
        }}
        onUploadError={(error: Error) => {
          setUploading(false);
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      {uploading && <p>Uploading...</p>} {/* Basic indicator */}
    </div>
  );
}