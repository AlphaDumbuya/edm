'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TipTapEditor from '../../../../../../components/TipTapEditor';
import { UploadButton } from '../../../../../../components/shared/UploadButton';
import { useSession } from 'next-auth/react';

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  imageUrl?: string | null;
}

export default function EditNewsArticlePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const newsArticleId = (params?.id ?? '') as string;
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
        const res = await fetch(`/api/admin/news/${newsArticleId}`);
        if (!res.ok) throw new Error('Failed to fetch news article');
        const article = await res.json();
        setFormData({
          title: article.title || '',
          slug: article.slug || '',
          published: article.published ?? false,
          content: article.content || '',
          imageUrl: article.imageUrl || article.coverImage || null,
        });
        setImageUrl(article.imageUrl || article.coverImage || null);
      } catch (err) {
        setError('Failed to fetch news article.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (newsArticleId) fetchNewsArticle();
  }, [newsArticleId]);

  // Normalize slug on change, match blog edit logic
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (name === 'slug') {
      const normalized = value.trim().toLowerCase().replace(/\s+/g, '-');
      setFormData((prev) => ({ ...prev, slug: normalized }));
      return;
    }
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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
    const currentUserId = session?.user?.id;
    if (!currentUserId) {
      setError('You must be logged in as an admin to update news.');
      setLoading(false);
      return;
    }
    const data = { ...formData, imageUrl, authorId: currentUserId };
    try {
      const res = await fetch(`/api/admin/news/${newsArticleId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        setError(error.error || 'Failed to update news article');
        setLoading(false);
        return;
      }
      router.push('/admin/content/news');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto px-2 py-4 sm:py-12 bg-gray-900 text-gray-100 rounded-lg shadow-lg max-w-2xl w-full">
      <h2 className="text-2xl font-bold mb-8 tracking-tight">Edit News Article: {formData.title || newsArticleId}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-200">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="input-white-icons mt-1 block w-full border border-gray-700 bg-gray-800 text-gray-100 rounded-md shadow-sm p-2 placeholder-gray-400"
            required
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-200">Slug</label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            className="input-white-icons mt-1 block w-full border border-gray-700 bg-gray-800 text-gray-100 rounded-md shadow-sm p-2 placeholder-gray-400"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-200">Content</label>
          <div className="mt-1 border border-gray-700 rounded-md shadow-sm bg-gray-800">
            <TipTapEditor value={formData.content} onContentChange={handleContentChange} />
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            name="published"
            checked={formData.published}
            onChange={handleInputChange}
            className="h-4 w-4 text-primary border-gray-700 bg-gray-800 rounded"
          />
          <label htmlFor="published" className="ml-2 block text-sm font-medium text-gray-200">Published</label>
        </div>
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-200">Cover Image</label>
          <UploadButton imageUrl={imageUrl} setImageUrl={handleImageUrlChange} />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 border border-primary focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </form>
    </div>
  );
}