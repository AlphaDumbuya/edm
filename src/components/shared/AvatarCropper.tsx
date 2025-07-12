import React, { useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import Cropper, { Area } from 'react-easy-crop';

interface AvatarCropperProps {
  image: string;
  onCropComplete: (croppedAreaPixels: Area) => void;
  aspect?: number;
  showButtons?: boolean;
}

const AvatarCropper = forwardRef(function AvatarCropper(
  { image, onCropComplete, aspect = 1, showButtons = true }: AvatarCropperProps,
  ref
) {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropChange = (newCrop: { x: number; y: number }) => setCrop(newCrop);
  const onZoomChange = (newZoom: number) => setZoom(newZoom);
  const onCropCompleteInternal = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  useImperativeHandle(ref, () => ({
    confirmCrop: () => {
      if (croppedAreaPixels) {
        onCropComplete(croppedAreaPixels);
      }
    },
  }));

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="w-full h-64 bg-gray-100 rounded-full overflow-hidden">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          cropShape="round"
          showGrid={false}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropCompleteInternal}
        />
      </div>
      <div className="w-full flex flex-col items-center mt-4">
        <label htmlFor="zoom-range" className="text-xs text-muted-foreground mb-1">
          Zoom
        </label>
        <input
          id="zoom-range"
          type="range"
          min={1}
          max={3}
          step={0.01}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-3/4 mb-2 accent-primary"
        />
        {showButtons && (
          <button
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition mt-2"
            onClick={() => {
              if (croppedAreaPixels) onCropComplete(croppedAreaPixels);
            }}
            type="button"
            id="avatar-cropper-confirm-btn"
          >
            Crop
          </button>
        )}
      </div>
    </div>
  );
});

export default AvatarCropper;
