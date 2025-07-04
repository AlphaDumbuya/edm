"use client";

import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { useState, useRef } from "react";

interface UploadButtonProps {
  imageUrl: string | null;
  setImageUrl: (url: string | null) => void;
}

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export function UploadButton({ imageUrl, setImageUrl }: UploadButtonProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number } | null>(null);
  const removeBtnRef = useRef<HTMLButtonElement>(null);
  const confirmDialogRef = useRef<HTMLDivElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  const handleRemove = () => {
    setShowConfirm(true);
  };

  const confirmRemove = () => {
    setImageUrl(null);
    setProgress(0);
    setError(null);
    setFileInfo(null);
    setShowConfirm(false);
    setTimeout(() => {
      removeBtnRef.current?.focus();
    }, 0);
  };

  const cancelRemove = () => {
    setShowConfirm(false);
    setTimeout(() => {
      removeBtnRef.current?.focus();
    }, 0);
  };

  const handleRetry = () => {
    setError(null);
    setProgress(0);
    setUploading(false);
    setFileInfo(null);
  };

  // Drag and drop handlers for visual feedback
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    setDragActive(false);
  };

  // Keyboard accessibility for dropzone
  const handleDropzoneKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      const input = dropzoneRef.current?.querySelector('input[type="file"]') as HTMLInputElement | null;
      input?.click();
    }
  };

  console.log("UploadButton component rendering");
  return (
    <div className="space-y-2">
      {imageUrl && (
        <div className="flex flex-col items-start space-y-2">
          <img
            src={imageUrl}
            alt="Uploaded Preview"
            className="w-full max-w-xs rounded shadow border"
          />
          <div className="flex gap-2 items-center">
            <button
              type="button"
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs focus:outline-none focus:ring-2 focus:ring-red-400"
              onClick={handleRemove}
              aria-label="Remove uploaded image"
              ref={removeBtnRef}
            >
              Remove
            </button>
            <button
              type="button"
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => { setImageUrl(null); setFileInfo(null); setError(null); setProgress(0); }}
              aria-label="Replace image"
            >
              Replace
            </button>
            <span className="text-xs text-gray-500" aria-live="polite">Upload complete</span>
          </div>
          {fileInfo && (
            <div className="text-xs text-gray-600 mt-1">
              <span className="font-medium">{fileInfo.name}</span> ({(fileInfo.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          )}
        </div>
      )}
      {!imageUrl && (
        <div
          ref={dropzoneRef}
          tabIndex={0}
          role="button"
          aria-label="File upload dropzone"
          className={`outline-none ${dragActive ? "ring-2 ring-blue-400 border-blue-400" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onKeyDown={handleDropzoneKeyDown}
        >
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
              const file = res && res[0];
              const imgUrl = file?.ufsUrl || file?.url || null;
              if (imgUrl) {
                setImageUrl(imgUrl);
                setFileInfo(file ? { name: file.name || "Image", size: file.size || 0 } : null);
              } else {
                setImageUrl(null);
                setFileInfo(null);
                setError("No file was uploaded. Please try again.");
              }
            }}
            onUploadError={(error: Error) => {
              setUploading(false);
              setError(error.message);
              setImageUrl(null);
              setFileInfo(null);
            }}
            onDrop={(acceptedFiles) => {
              const file = acceptedFiles[0];
              if (!file) return;
              if (!ALLOWED_TYPES.includes(file.type)) {
                setError("Only JPG, PNG, WEBP, or GIF images are allowed.");
                setFileInfo(null);
                return false;
              }
              if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                setError(`File size must be under ${MAX_FILE_SIZE_MB}MB.`);
                setFileInfo(null);
                return false;
              }
              setFileInfo({ name: file.name, size: file.size });
              setError(null);
              return true;
            }}
            disabled={uploading}
            aria-disabled={uploading}
            className={`focus:outline-none focus:ring-2 focus:ring-blue-400 ${dragActive ? "border-blue-400" : ""}`}
          />
          {uploading && (
            <div className="flex items-center gap-2 mt-2" aria-live="polite" aria-label="Upload progress">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>
              <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
            </div>
          )}
          {fileInfo && !uploading && (
            <div className="text-xs text-gray-600 mt-1">
              <span className="font-medium">{fileInfo.name}</span> ({(fileInfo.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          )}
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2">
          <p className="text-xs text-red-500" role="alert">{error}</p>
          <button
            type="button"
            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={handleRetry}
            aria-label="Retry upload"
          >
            Retry
          </button>
        </div>
      )}
      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirmDialogTitle"
          ref={confirmDialogRef}
        >
          <div className="bg-white rounded shadow-lg p-6 max-w-sm w-full">
            <h2 id="confirmDialogTitle" className="text-lg font-semibold mb-2">Remove Image?</h2>
            <p className="mb-4 text-sm">Are you sure you want to remove this image?</p>
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={cancelRemove}
                aria-label="Cancel remove image"
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs focus:outline-none focus:ring-2 focus:ring-red-400"
                onClick={confirmRemove}
                aria-label="Confirm remove image"
                autoFocus
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}