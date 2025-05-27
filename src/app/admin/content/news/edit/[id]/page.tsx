'use client';

import { useParams, useRouter } from 'next/navigation';
import { getNewsArticleById } from '@/lib/db/news'; // Assuming this function exists
import { updateNewsArticleAction } from '../../actions';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import 'react-quill/dist/quill.snow.css'; // Import Quill styles to be available globally or per component if needed.
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
// Ensure React and its hooks are imported correctly
export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
}

export default function EditNewsArticlePage() {
  const router = useRouter();
  const params = useParams();
  const newsArticleId = params.id as string;
  const [newsArticle, setNewsArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    published: false,
  });

  useEffect(() => {
    const fetchNewsArticle = async () => {
      try {
        const article = await getNewsArticleById(newsArticleId);
        if (article) {
          setNewsArticle(article);
          setFormData({
            title: article.title,
            slug: article.slug,
            content: article.content,
            published: article.published,
          });
        } else {
          setError('News article not found.');
        }
      } catch (err) {
        setError('Failed to fetch news article.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (newsArticleId) {
      fetchNewsArticle();
    }
  }, [newsArticleId]);

  const handleContentChange = (html: string) => {
    setFormData({
      ...formData,
      content: html,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!newsArticle) {
    return <div>News Article not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Edit News Article: {newsArticleId}</h2>
      <form action={updateNewsArticleAction.bind(null, newsArticleId)} className="space-y-4">
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
          {/* Use ReactQuill component */}
          <ReactQuill
            value={formData.content}
            onChange={handleContentChange}
            theme="snow" // or "bubble"
            modules={{
              toolbar: [['bold', 'italic', 'underline'], [{ 'list': 'ordered'}, { 'list': 'bullet' }], ['link', 'image']]
            }}
            required
          />
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
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}