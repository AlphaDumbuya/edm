"use client";

import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { useState } from "react";

interface UploadButtonProps {
  imageUrl: string | null;
  setImageUrl: (url: string | null) => void;
}

export function UploadButton({ imageUrl, setImageUrl }: UploadButtonProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleRemove = () => {
    setImageUrl(null);
    setProgress(0);
    setError(null);
  };

  return (
    <div className="space-y-2">
      {/* File upload functionality removed. Add new upload logic here as needed. */}
      <p className="text-gray-500">
        Image upload functionality is temporarily disabled. Please re-enable or
        add new upload logic.
      </p>
      {imageUrl && (
        <div className="flex flex-col items-start space-y-2">
          <img
            src={imageUrl}
            alt="Uploaded Preview"
            className="w-full max-w-xs rounded shadow border"
          />
          <div className="flex gap-2">
            <button
              type="button"
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
              onClick={handleRemove}
            >
              Remove
            </button>
            <span className="text-xs text-gray-500">Upload complete</span>
          </div>
        </div>
      )}
      {!imageUrl && (
        <UploadDropzone<OurFileRouter, "imageUploader">
          endpoint="imageUploader"
          onUploadProgress={(p) => {
            setUploading(true);
            setProgress(p);
          }}
          onClientUploadComplete={(res) => {
            setUploading(false);
            setProgress(100);
            setError(null);
            // Use ufsUrl if available, fallback to url for backward compatibility
            const file = res && res[0];
            const imgUrl = file?.ufsUrl || file?.url || null;
            if (imgUrl) {
              setImageUrl(imgUrl);
            } else {
              setImageUrl(null);
              setError("No file was uploaded. Please try again.");
            }
          }}
          onUploadError={(error: Error) => {
            setUploading(false);
            setError(error.message);
            setImageUrl(null);
          }}
        />
      )}
      {uploading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}