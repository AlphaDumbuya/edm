'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TipTapEditor from '@/components/TipTapEditor';
import { UploadButton } from '@/components/shared/UploadButton';

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  imageUrl?: string | null;
}

export default function EditNewsArticlePage() {
  const router = useRouter();
  const params = useParams();
  const newsArticleId = params.id as string;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    published: false,
    imageUrl: null as string | null,
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNewsArticle() {
      try {
        const res = await fetch(`/api/news?id=${newsArticleId}`);
        if (!res.ok) throw new Error('Failed to fetch news article');
        const article = await res.json();
        setFormData({
          title: article.title,
          slug: article.slug,
          published: article.published,
          content: article.content,
          imageUrl: article.imageUrl || null,
        });
        setImageUrl(article.imageUrl || null);
      } catch (err) {
        setError('Failed to fetch news article.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (newsArticleId) fetchNewsArticle();
  }, [newsArticleId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleContentChange = (htmlContent: string) => {
    setFormData((prev) => ({ ...prev, content: htmlContent }));
  };

  const handleImageUrlChange = (url: string | null) => {
    setImageUrl(url);
    setFormData((prev) => ({ ...prev, imageUrl: url }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const data = { ...formData, imageUrl };
    try {
      const res = await fetch(`/api/news?id=${newsArticleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update news article');
      router.push('/admin/content/news');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Edit News Article: {newsArticleId}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug</label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
          <TipTapEditor value={formData.content} onContentChange={handleContentChange} />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            name="published"
            checked={formData.published}
            onChange={handleInputChange}
            className="h-4 w-4 text-primary border-gray-300 rounded"
          />
          <label htmlFor="published" className="ml-2 block text-sm font-medium text-gray-700">Published</label>
        </div>
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">Cover Image</label>
          <UploadButton imageUrl={imageUrl} setImageUrl={handleImageUrlChange} />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </form>
    </div>
  );
}