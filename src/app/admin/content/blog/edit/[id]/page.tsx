'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '../../../../../../components/ui/button';
import { useSession } from 'next-auth/react';
import { Label } from '../../../../../../components/ui/label';
import { Input } from '../../../../../../components/ui/input';
import { Checkbox } from '../../../../../../components/ui/checkbox';
import { useToast } from '../../../../../../hooks/use-toast';
import TipTapEditor from '../../../../../../components/TipTapEditor'; // Rich Text Editor
import { UploadButton } from '../../../../../../components/shared/UploadButton'; // File upload component

// Type for the blog post
interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  imageUrl?: string | null;
}

export default function EditBlogPostPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const blogPostId = params?.id as string;
  const currentUserId = session?.user?.id;
  const { toast } = useToast();

  const [blogPost, setBlogPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '', // HTML string for TipTap
    published: false,
    imageUrl: null as string | null, // Add imageUrl to formData
  });

  const [imageUrl, setImageUrl] = useState<string | null>(blogPost?.imageUrl || null);

  useEffect(() => {
    // Mark as mounted for client-only components
    setIsMounted(true);
  }, []);

  useEffect(() => {
    async function fetchBlogPost() {
      try {
        const res = await fetch(`/api/admin/blog/${blogPostId}`);
        if (!res.ok) throw new Error('Failed to fetch blog post');
        const post = await res.json();
        if (post) {
          setBlogPost(post);
          setFormData({
            title: post.title,
            slug: post.slug,
            content: post.content || '',
            published: post.published,
            imageUrl: post.imageUrl || null, // Initialize imageUrl from fetched data
          });
          setImageUrl(post.imageUrl || null);
        } else {
          setError('Blog post not found.');
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to fetch blog post.');
        toast({
          title: 'Error',
          description: 'Failed to load blog post.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }

    if (blogPostId) {
      fetchBlogPost();
    }
  }, [blogPostId, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name === 'slug') {
        // Normalize slug: trim, lowercase, replace spaces with hyphens
        const normalized = value.trim().toLowerCase().replace(/\s+/g, '-');
        return { ...prev, [name]: normalized };
      }
      return { ...prev, [name]: value };
    });
  };


  const handleImageUrlChange = (url: string | null) => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: url,
    }));
  };

  const handleContentChange = (htmlContent: string) => {
    setFormData((prev) => ({ ...prev, content: htmlContent }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      published: checked,
    }));
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUserId) {
      toast({
        title: 'Authentication Error',
        description: 'You must be logged in to update a blog post.',
        variant: 'destructive',
      });
      return;
    }
    // Ensure slug is normalized before saving
    const normalizedSlug = formData.slug.trim().toLowerCase().replace(/\s+/g, '-');
    const payload = {
      title: formData.title,
      slug: normalizedSlug,
      content: formData.content,
      published: formData.published,
      imageUrl: formData.imageUrl, // <-- use formData.imageUrl instead of imageUrl
      userId: currentUserId,
    };
    try {
      const res = await fetch(`/api/admin/blog/${blogPostId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const error = await res.json();
        toast({
          title: 'Error',
          description: error.error || 'Failed to update blog post.',
          variant: 'destructive',
        });
        return;
      }
      toast({
        title: 'Success',
        description: 'Blog post updated successfully.',
        variant: 'default', // changed from 'success' to 'default' to match allowed types
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

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!blogPost) return <p>No blog post found.</p>;

  return (
    <div className="container mx-auto py-8 sm:py-12 bg-gray-900 text-gray-100 rounded-lg shadow-lg max-w-2xl w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
      <h1 className="text-2xl font-bold mb-8 tracking-tight text-center">Edit Blog Post: {blogPost.title}</h1>

      <form onSubmit={handleUpdate} className="space-y-6 w-full max-w-2xl mx-auto px-2 sm:px-4 md:px-8">
        {currentUserId && (
          <input type="hidden" name="userId" value={currentUserId} />
        )}
        <input type="hidden" name="blogPostId" value={blogPost.id} />

        <div>
          <Label htmlFor="title" className="text-gray-200">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input-white-icons mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-gray-100 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 placeholder-gray-400"
            required
          />
        </div>

        <div>
          <Label htmlFor="slug" className="text-gray-200">Slug</Label>
          <Input
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="input-white-icons mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-gray-100 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 placeholder-gray-400"
            required
          />
        </div>

        <div>
          <Label htmlFor="coverImage" className="text-gray-200">Cover Image</Label>
          <UploadButton imageUrl={formData.imageUrl} setImageUrl={handleImageUrlChange} />
        </div>

        <div>
          <Label htmlFor="content" className="text-gray-200">Content</Label>
          <div className="mt-1 border border-gray-700 rounded-md shadow-sm bg-gray-800">
            {isMounted && (
              <TipTapEditor
                value={formData.content}
                onContentChange={handleContentChange}
              />
            )}
          </div>
        </div>

        <div className="flex items-center">
          <Checkbox
            id="published"
            name="published"
            checked={formData.published}
            disabled={session?.user?.role === 'EDITOR'}
            onCheckedChange={handleCheckboxChange}
            className="border-gray-700 bg-gray-800 text-primary"
          />
          <Label htmlFor="published" className="ml-2 text-gray-200">Published</Label>
        </div>

        <input type="hidden" name="content" value={formData.content} />
        <input type="hidden" name="imageUrl" value={formData.imageUrl || ''} />

        <Button type="submit" className="w-full flex justify-center py-2 px-4 border border-primary rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary" onClick={() => toast({ title: 'Updating...', description: 'Updating blog post...', variant: 'default' })}>Update Blog Post</Button>
      </form>
    </div>
  );
}
