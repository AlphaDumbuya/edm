'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/contexts/auth-context'; // Import the useAuth hook
import { useToast } from '@/hooks/use-toast'; // Import the useToast hook
import { UploadButton } from '@/components/shared/UploadButton'; // Import the UploadButton component
import TipTapEditor from '@/components/TipTapEditor'; // Import the TipTapEditor

export default function CreateBlogPostPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [published, setPublished] = useState(false);
  const [content, setContent] = useState(''); // Add state for content
  const [imageUrl, setImageUrl] = useState<string | null>(null); // State for image URL
  const router = useRouter();

  const { user } = useAuth(); // Get the user from the useAuth hook
  const { toast } = useToast(); // Get the toast function

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission

    // Check if user exists before proceeding
    if (!user) {
      // Handle case where user is not logged in (e.g., show an error message)
      toast({
        title: 'Authentication Error',
        description: 'You must be logged in to create a blog post.',
        variant: 'destructive',
      });
      return; // Stop the function execution
    }
    // Build payload for API
    const payload = {
      title,
      slug,
      content,
      published,
      imageUrl,
      authorId: user.id,
    };
    try {
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const error = await res.json();
        toast({
          title: 'Error',
          description: error.error || 'Failed to create blog post.',
          variant: 'destructive',
        });
        return;
      }
      toast({
        title: 'Success',
        description: 'Blog post created successfully.',
        variant: 'success',
      });
      router.push('/admin/content/blog');
    } catch (err) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    }
  };
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Blog Post</h1>
      <form onSubmit={handleCreate} className="space-y-4 flex flex-col"> {/* Added flex and flex-col for layout */}
        <div className="mb-4">
          {/* Increased bottom margin */}
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2" // Increased vertical padding
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={slug}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2" // Increased vertical padding
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 flex-grow">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <TipTapEditor
            value={content}
            onContentChange={setContent}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Cover Image
          </label>
          <div>imageURL {imageUrl}</div>
          <UploadButton
            imageUrl={imageUrl}
            setImageUrl={(url) => {
              setImageUrl(url);
              if (url) {
                toast({
                  title: 'Upload Successful',
                  description: 'Cover image uploaded successfully.',
                  variant: 'success',
                });
              } else {
                toast({
                  title: 'Upload Failed',
                  description: 'No file was uploaded. Please try again.',
                  variant: 'destructive',
                });
              }
            }}
          />
          {imageUrl && (
            <div className="mt-2">
              <img src={imageUrl} alt="Cover Preview" className="w-full max-w-xs rounded shadow" />
              <p className="text-xs text-gray-500 mt-1">Cover image preview</p>
            </div>
          )}
        </div>
        <div className="mb-4 flex items-center"> {/* Increased bottom margin */}
          <input
            type="checkbox"
            id="published"
            checked={published}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" // Reverted colors to primary
            onChange={(e) => setPublished(e.target.checked)}
          />
          <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
            Published
          </label>
        </div>
        <input type="hidden" name="imageUrl" value={imageUrl ?? ""} />
        <div>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            disabled={!imageUrl} // Disable button until imageUrl is set
          > {/* Keeping original button styles */}
            Create Blog Post
          </button>
        </div>
      </form>
    </div>
  );
}
