"use client";

import React from 'react';
import { Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

export default function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = description ? encodeURIComponent(description) : '';

  const handleShare = (platform: string) => {
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        if (description) shareUrl += `\n${encodedDesc}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'native':
        if (navigator.share) {
          navigator
            .share({
              title: title,
              text: description,
              url: url,
            })
            .catch((error) => console.log('Error sharing:', error));
        }
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Native Share Button - Only shows if Web Share API is available */}
      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('native')}
          className="flex items-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      )}

      {/* Social Media Share Buttons */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('facebook')}
        className="flex items-center gap-2"
      >
        <Facebook className="w-4 h-4" />
        Facebook
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('twitter')}
        className="flex items-center gap-2"
      >
        <Twitter className="w-4 h-4" />
        Twitter
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('linkedin')}
        className="flex items-center gap-2"
      >
        <Linkedin className="w-4 h-4" />
        LinkedIn
      </Button>
    </div>
  );
}
