'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { updateBlogPostAction } from '@/app/admin/content/blog/actions';
import { fetchBlogPostForEdit } from './actions';
import TipTapEditor from '@/components/TipTapEditor'; // Rich Text Editor

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
  const blogPostId = params.id as string;
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
  });

  useEffect(() => {
    // Mark as mounted for client-only components
    setIsMounted(true);
  }, []);

  useEffect(() => {
    async function fetchBlogPost() {
      try {
        const post = await fetchBlogPostForEdit(blogPostId);
        if (post) {
          setBlogPost(post);
          setFormData({
            title: post.title,
            slug: post.slug,
            content: post.content || '',
            published: post.published,
          });
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!blogPost) return <p>No blog post found.</p>;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">
        Edit Blog Post: {blogPost.title}
      </h1>

      <form action={updateBlogPostAction} className="space-y-4">
        {currentUserId && (
          <input type="hidden" name="userId" value={currentUserId} />
        )}
        <input type="hidden" name="blogPostId" value={blogPost.id} />

        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="content">Content</Label>
          <div className="border rounded-md p-2">
            {isMounted && (
              <TipTapEditor
                value={formData.content}
                onContentChange={handleContentChange}
              />
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="published"
            name="published"
            checked={formData.published}
            disabled={session?.user?.role === 'EDITOR'}
            onCheckedChange={handleCheckboxChange}
          />
          <Label htmlFor="published">Published</Label>
        </div>

        <input type="hidden" name="content" value={formData.content} />

        <Button type="submit">Update Blog Post</Button>
      </form>
    </div>
  );
}
