"use client";

import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';

interface ShareModalProps {
  url: string;
  title: string;
  description?: string;
}

export default function ShareModal({ url, title, description }: ShareModalProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [canShare, setCanShare] = React.useState(false);

  useEffect(() => {
    // Check for Web Share API support in a safe way
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      setCanShare('share' in navigator);
    }
  }, []);

  // Handle any cleanup when component unmounts
  useEffect(() => {
    return () => {
      // Cleanup any timeouts or event listeners
      if (copied) {
        setCopied(false);
      }
    };
  }, [copied]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleShare = async (platform?: string) => {
    if (!platform && canShare) {
      // Native share
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
        // Close the modal after successful share
        setIsOpen(false);
      } catch (err) {
        // Only log if it's not a user cancellation
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
      return;
    }

    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this page</DialogTitle>
          <DialogDescription>
            Choose how you'd like to share this content
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => handleShare('facebook')}
            >
              <Facebook className="h-4 w-4" />
              Facebook
            </Button>
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => handleShare('twitter')}
            >
              <Twitter className="h-4 w-4" />
              Twitter
            </Button>
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => handleShare('linkedin')}
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => handleShare('copy')}
            >
              <LinkIcon className="h-4 w-4" />
              {copied ? 'Copied!' : 'Copy link'}
            </Button>
            {canShare && (
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => handleShare()}
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
