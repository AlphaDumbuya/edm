'use client';
import { useEffect } from 'react';
import { useState } from 'react';
import { createBlogPostAction } from './actions';
import { useRouter } from 'next/navigation';
import { EditorState, convertToRaw } from 'draft-js';
import dynamic from 'next/dynamic'; // Keep if needed for other components
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'; // Import styles for react-draft-wysiwyg
import stateToHTML from 'draftjs-to-html'; // Corrected package name

const Editor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), { ssr: false });

export default function CreateBlogPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty()); // State for react-draft-wysiwyg content
  const [published, setPublished] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCreate = async (formData: FormData) => {
    formData.append('content', stateToHTML(convertToRaw(editorState.getCurrentContent()))); // Convert and append HTML content
    await createBlogPostAction(formData);
    router.push('/admin/content/blog');
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Blog Post</h1>      
      <form action={handleCreate} className="space-y-4 flex flex-col"> {/* Added flex and flex-col for layout */}
        <div className="mb-4">
          {/* Increased bottom margin */}
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
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
            value={slug}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2" // Increased vertical padding
 onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 flex-grow"> {/* Increased bottom margin and allow editor to grow */}
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
 {isClient && (
 <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="border border-gray-300 rounded-md shadow-sm h-full" // Added border, rounded corners, shadow, and full height
            editorClassName="px-3 py-2 min-h-[200px]" // Added padding, set minimum height
            toolbarClassName="border-b border-gray-300 px-3 py-2 bg-gray-50 rounded-t-md" // Added bottom border, padding, background, rounded top corners
 />
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
        <div>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
> {/* Keeping original button styles */}
            Create Blog Post
          </button>
        </div>
      </form>
    </div>
  );
}