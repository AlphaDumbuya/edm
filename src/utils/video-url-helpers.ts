export function extractVideoId(url: string, platform: string): string | null {
  try {
    const urlObj = new URL(url);
    switch (platform) {
      case 'youtube':
        // Handle youtube.com/watch?v=ID
        if (urlObj.hostname.includes('youtube.com')) {
          const searchParams = new URLSearchParams(urlObj.search);
          const videoId = searchParams.get('v');
          if (videoId) return videoId;
        }
        // Handle youtu.be/ID
        if (urlObj.hostname === 'youtu.be') {
          return urlObj.pathname.slice(1);
        }
        // Handle youtube.com/embed/ID
        if (urlObj.pathname.includes('/embed/')) {
          return urlObj.pathname.split('/embed/')[1];
        }
        break;
      case 'vimeo':
        // Handle vimeo.com/ID
        if (urlObj.hostname.includes('vimeo.com')) {
          const pathParts = urlObj.pathname.split('/');
          const videoId = pathParts[pathParts.length - 1];
          if (videoId && /^\d+$/.test(videoId)) return videoId;
        }
        break;
      case 'facebook':
        // Return full URL for Facebook videos
        return url;
      case 'tiktok':
        // Return full URL for TikTok videos
        return url;
      default:
        return null;
    }
    return null;
  } catch {
    return null;
  }
}

export function getEmbedUrl(videoId: string, platform: string): string {
  switch (platform) {
    case 'youtube':
      return `https://www.youtube.com/embed/${videoId}`;
    case 'vimeo':
      return `https://player.vimeo.com/video/${videoId}`;
    default:
      return videoId; // For platforms where we store the full embed URL
  }
}

export function isValidVideoUrl(url: string, platform: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
