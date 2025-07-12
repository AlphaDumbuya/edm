"use client";

import React, { useState, useEffect } from "react";
import { UploadDropzone } from "@/utils/uploadthing";

interface UploadButtonProps {
  imageUrl: string | null;
  setImageUrl: (url: string | null) => void;
  onFileSelect?: (file: File) => void;
}

export function UploadButton({ imageUrl, setImageUrl, onFileSelect }: UploadButtonProps) {
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Clean up preview URL on unmount or when image changes
  useEffect(() => {
    return () => {
      if (localPreviewUrl) URL.revokeObjectURL(localPreviewUrl);
    };
  }, [localPreviewUrl]);

  return (
    <div className="space-y-2">
      {localPreviewUrl ? (
        <img src={localPreviewUrl} alt="Preview" className="rounded-md w-32 h-32 object-cover mx-auto mb-2" />
      ) : imageUrl ? (
        <img src={imageUrl} alt="Uploaded" className="rounded-md w-32 h-32 object-cover mx-auto mb-2" />
      ) : null}
      <UploadDropzone
        endpoint="imageUploader"
        onDrop={(files: File[]) => {
          if (files && files[0]) {
            setLocalPreviewUrl(URL.createObjectURL(files[0]));
          }
        }}
        onClientUploadComplete={(res: Array<{ ufsUrl?: string }>) => {
          setLocalPreviewUrl(null);
          const file = res && res[0];
          // Only use ufsUrl for the image URL (future-proof)
          const imgUrl = file?.ufsUrl || null;
          if (imgUrl) {
            setImageUrl(imgUrl);
          }
        }}
        onUploadError={(error: { message: string }) => {
          setLocalPreviewUrl(null);
          setImageUrl(null);
          setError(error.message);
        }}
      />
      {error && (
        <div className="flex items-center gap-2">
          <p className="text-xs text-red-500" role="alert">{error}</p>
        </div>
      )}
    </div>
  );
}