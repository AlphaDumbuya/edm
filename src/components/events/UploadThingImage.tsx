import { UploadButton } from "@uploadthing/react";
import { useState } from "react";

interface UploadThingImageProps {
  onUpload: (url: string) => void;
  initialUrl?: string;
}

export default function UploadThingImage({ onUpload, initialUrl }: UploadThingImageProps) {
  const [url, setUrl] = useState(initialUrl || "");

  return (
    <div className="mb-2">
      {url && (
        <img src={url} alt="Event" className="max-h-40 rounded border mb-2" />
      )}
      {/* @ts-ignore */}
      <UploadButton
        endpoint="imageUploader" // You must define this endpoint in your /api/uploadthing route
        onClientUploadComplete={(res: any) => {
          if (res && res[0]?.url) {
            setUrl(res[0].url);
            onUpload(res[0].url);
          }
        }}
        onUploadError={(err: any) => alert("Upload failed: " + err.message)}
      />
    </div>
  );
}
