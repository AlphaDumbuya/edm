'use client';

import { useParams, useRouter } from 'next/navigation';
import { updateNewsArticleAction } from '../../actions';
import { useEffect, useState } from 'react';
import { getNewsArticleById } from '@/lib/db/news'; // Assuming this function exists
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// TipTap styles (optional, you can add your own)
import '@tiptap/core'; // Minimal core styles if needed
// import '@tiptap/starter-kit'; // Starter kit styles

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

  const editor = useEditor({
    extensions: [
      StarterKit,
      // Add other TipTap extensions you need here (e.g., Heading, Bold, Italic, Link)
    ],
    content: formData.content, // Use formData.content for initial content
    onUpdate: ({ editor }) => {
      // Update form data with the latest HTML content from the editor
      setFormData((prevData) => ({ ...prevData, content: editor.getHTML() }));
    },
    editorProps: { attributes: { class: 'prose max-w-none border p-4 rounded-md' } }, // Basic styling
  });

  useEffect(() => {
    const fetchNewsArticle = async () => {
      try {
        const article = await getNewsArticleById(newsArticleId);
        if (article) {
          // Initialize form data with fetched content
          setNewsArticle(article);
          setFormData({
            title: article.title,
            slug: article.slug,
            published: article.published,
 content: article.content,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  useEffect(() => {
    if (editor && formData.content !== editor.getHTML()) editor.commands.setContent(formData.content || '');
  }, [editor, formData.content]); // Sync formData.content with editor content

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
          {/* Use TipTap EditorContent component */}
          {editor ? (
            <EditorContent editor={editor} />
          ) : (
            <div>Loading editor...</div> // Optional loading state for the editor
          )}
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