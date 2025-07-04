'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TipTapEditor from '@/components/TipTapEditor';
import { UploadButton } from '@/components/shared/UploadButton';
import { useAuth } from '@/contexts/auth-context';

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
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="text-2xl font-bold mb-6">Create New News Article</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hidden authorId input for backend */}
        {user && <input type="hidden" name="authorId" value={user.id} />}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
            Cover Image
          </label>
          <UploadButton imageUrl={imageUrl} setImageUrl={setImageUrl} />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <div className="mt-1 border rounded-md shadow-sm">
            <TipTapEditor value={content} onContentChange={setContent} />
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            name="published"
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
            Published
          </label>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
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