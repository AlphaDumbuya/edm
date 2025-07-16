'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TipTapEditor from '../../../../../components/TipTapEditor';
import { UploadButton } from '../../../../../components/shared/UploadButton';
import { useAuth } from '../../../../../contexts/auth-context';

export default function CreateNewsArticlePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    formData.append('content', content);
    if (imageUrl) {
      formData.append('imageUrl', imageUrl);
    }
    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to create news article');
      router.push('/admin/content/news');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 bg-gray-900 text-gray-100 rounded-lg shadow-lg max-w-2xl">
      <h1 className="text-2xl font-bold mb-8 tracking-tight flex items-center gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 text-gray-100 rounded hover:bg-gray-700 border border-gray-700 transition text-sm font-medium shadow focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Back to Blog List"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>
        Create New Blog Post
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hidden authorId input for backend */}
        {user && <input type="hidden" name="authorId" value={user.id} />}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-200">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="input-white-icons mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-gray-100 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 placeholder-gray-400"
            required
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-200">Slug</label>
          <input
            type="text"
            id="slug"
            name="slug"
            className="input-white-icons mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-gray-100 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 placeholder-gray-400"
            required
          />
        </div>
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-200">Cover Image</label>
          <UploadButton imageUrl={imageUrl} setImageUrl={setImageUrl} />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-200">Content</label>
          <div className="mt-1 border border-gray-700 rounded-md shadow-sm bg-gray-800">
            <TipTapEditor value={content} onContentChange={setContent} />
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            name="published"
            className="h-4 w-4 text-primary focus:ring-primary border-gray-700 bg-gray-800 rounded"
          />
          <label htmlFor="published" className="ml-2 block text-sm text-gray-200">Published</label>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-primary rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create News Article'}
          </button>
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </form>
    </div>
  );
}