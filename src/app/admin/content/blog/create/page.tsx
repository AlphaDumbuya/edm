'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '../../../../../contexts/auth-context';
import { useToast } from '../../../../../hooks/use-toast';
import { UploadButton } from '../../../../../components/shared/UploadButton';
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
    // Example logic for creating a blog post
    // await createBlogPostAction({ title, slug, content, imageUrl, published });
    // toast({ title: 'Success', description: 'Blog post created!' });
    // router.push('/admin/content/blog');
  };

  return (
    <>
      <div className="container mx-auto px-2 py-4 sm:py-6 bg-gray-900 text-gray-100 rounded-lg shadow-lg max-w-2xl relative">
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-200 text-gray-900 rounded px-4 py-2 border border-gray-300 hover:bg-white transition font-bold shadow focus:outline-none focus:ring-2 focus:ring-primary absolute left-4 top-4 z-20"
        >
          &larr; Back
        </button>
        <h1 className="text-2xl font-bold tracking-tight text-left sm:text-center mb-2 pt-3 sm:pt-2">Create New Blog Post</h1>
        <form onSubmit={handleCreate} className="flex flex-col gap-y-[2px]">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-200">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              className="input-white-icons mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-gray-100 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 placeholder-gray-400"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-200">Slug</label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={slug}
              className="input-white-icons mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-gray-100 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 placeholder-gray-400"
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Cover Image</label>
            <UploadButton imageUrl={imageUrl} setImageUrl={setImageUrl} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Content</label>
            <TipTapEditor value={content} onContentChange={setContent} />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={published}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-700 bg-gray-800 rounded"
              onChange={(e) => setPublished(e.target.checked)}
            />
            <label htmlFor="published" className="ml-2 block text-sm text-gray-200">Published</label>
          </div>
          <div>
            <button
              type="submit"
            className="w-full flex justify-center py-2 px-4 border border-primary rounded-md shadow text-base font-bold text-gray-900 bg-yellow-300 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Create Blog Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
