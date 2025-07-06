'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '../../../../../contexts/auth-context';
import { useToast } from '../../../../../hooks/use-toast';
// TODO: Fix the import path or create the UploadButton component if it does not exist.
// import { UploadButton } from '../../../../components/shared/UploadButton';
const UploadButton = ({ imageUrl, setImageUrl }: { imageUrl: string | null, setImageUrl: (url: string) => void }) => (
  <input
    type="text"
    placeholder="Paste image URL here"
    value={imageUrl ?? ''}
    onChange={e => setImageUrl(e.target.value)}
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2"
  />
);
// import TipTapEditor from '../../../../components/TipTapEditor';
import TipTapEditor from '../../../../../components/TipTapEditor';
import { createBlogPostAction } from '../actions';

export default function CreateBlogPostPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [published, setPublished] = useState(false);
  const [content, setContent] = useState(''); // Add state for content
  const [imageUrl, setImageUrl] = useState<string | null>(null); // State for image URL
  
  const { user } = useAuth(); // Get the user from the useAuth hook
  const { toast } = useToast(); // Get the toast function
  const router = useRouter(); // Initialize the router

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      toast({
        title: 'Authentication Error',
        description: 'You must be logged in to create a blog post.',
        variant: 'destructive',
      });
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('slug', slug || title.toLowerCase().replace(/\s+/g, '-'));
    formData.append('content', content);
    formData.append('published', published.toString());
    if (imageUrl) formData.append('imageUrl', imageUrl);

    await createBlogPostAction(formData);
    router.push('/admin/content/blog'); // Use router.push for navigation
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Blog Post</h1>
      <form onSubmit={handleCreate} className="space-y-4 flex flex-col">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
            Slug (optional)
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={slug}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2"
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>

        <div className="mb-4 flex-grow">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <TipTapEditor value={content} onContentChange={setContent} />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Cover Image
          </label>
          <UploadButton
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="published"
            checked={published}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            onChange={(e) => setPublished(e.target.checked)}
          />
          <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
            Published
          </label>
        </div>

        <div>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Create Blog Post
          </button>
        </div>
      </form>
    </div>
  );
}
