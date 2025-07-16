export async function uploadCroppedImageToUploadthing(base64: string): Promise<string | null> {
  // Convert base64 to Blob
  function dataURLtoFile(dataurl: string, filename: string) {
    const arr = dataurl.split(','), mimeMatch = arr[0].match(/:(.*?);/), mime = mimeMatch ? mimeMatch[1] : 'image/png', bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) u8arr[i] = bstr.charCodeAt(i);
    return new File([u8arr], filename, { type: mime });
  }
  const file = dataURLtoFile(base64, 'profile.png');
  const formData = new FormData();
  formData.append('file', file);
  try {
    const res = await fetch('/api/uploadthing?endpoint=imageUploader', {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.[0]?.url || data?.[0]?.ufsUrl || null;
  } catch (e) {
    return null;
  }
}
