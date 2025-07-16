// src/utils/uploadBase64ToUploadthing.ts
export async function uploadBase64ToUploadthing(base64: string): Promise<string | null> {
  // Convert base64 to Blob
  function dataURLtoBlob(dataurl: string) {
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/png';
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) u8arr[i] = bstr.charCodeAt(i);
    return new Blob([u8arr], { type: mime });
  }
  const blob = dataURLtoBlob(base64);
  const file = new File([blob], 'profile.png', { type: blob.type });

  // Debug: log file details
  console.log('File to upload:', file);
  console.log('File type:', file.type, 'File size:', file.size);

  // Use Uploadthing's API endpoint
  const formData = new FormData();
  formData.append('image', file); // <-- field name must match Uploadthing config

  // Debug: log FormData contents
  for (const pair of formData.entries()) {
    console.log('FormData entry:', pair[0], pair[1]);
  }

  const res = await fetch('/api/uploadthing?endpoint=imageUploader', {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) return null;
  const data = await res.json();
  // Try to get the URL from the response
  return data?.[0]?.url || data?.[0]?.ufsUrl || null;
}
