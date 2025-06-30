import React from "react";

interface ImagePreviewProps {
  file: File | null;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ file }) => {
  const [src, setSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!file) return setSrc(null);
    const reader = new FileReader();
    reader.onload = (e) => setSrc(e.target?.result as string);
    reader.readAsDataURL(file);
    return () => setSrc(null);
  }, [file]);

  if (!file || !src) return null;
  return (
    <div className="mb-2">
      <img src={src} alt="Preview" className="max-h-40 rounded border" />
    </div>
  );
};

export default ImagePreview;
