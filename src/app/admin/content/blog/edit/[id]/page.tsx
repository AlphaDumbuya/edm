'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Import useRouter
import { getBlogPostById, updateBlogPost } from '@/lib/db/blog'; // Assuming updateBlogPost exists
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input'; // Keep Input
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { updateBlogPostAction } from '@/app/admin/content/blog/actions'; // Import the server action

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
}

export default function EditBlogPostPage() {
  const params = useParams();
  const blogPostId = params.id as string;
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();

  const [blogPost, setBlogPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '', // Keep slug here
    content: '',
    published: false,
  });

  useEffect(() => {
    async function fetchBlogPost() {
      try {
        const post = await getBlogPostById(blogPostId);
        if (post) {
          setBlogPost(post);
          setFormData({
            title: post.title,
            slug: post.slug,
            content: post.content, // Initialize content with fetched data
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { // Only for Input fields
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContentChange = (value: string) => { // For ReactQuill
    setFormData((prevData) => ({
 ...prevData, // Spread the previous state
 content: value, // Update the content property
    }));
  }; // Error in original code: should be ...prevData, content: value

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      published: checked,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!blogPost) {
    return <div>Blog post not found.</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Edit Blog Post: {blogPostId}</h1>
      <form action={updateBlogPostAction.bind(null, blogPost.id)} className="space-y-4">
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
          <Label htmlFor="content">Content</Label> {/* Keep Label */}
          <ReactQuill // Replace Textarea with ReactQuill
            value={formData.content}
            onChange={handleContentChange} // Use handleContentChange for ReactQuill
            theme="snow" // You can choose a different theme
            className="h-64" // Adjust height as needed
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="published"
            name="published"
            checked={formData.published}
            disabled={session?.user?.role === 'EDITOR'} // Disable for EDITOR role
            onCheckedChange={handleCheckboxChange}
          />
          <Label htmlFor="published">Published</Label>
        </div>
        <Button type="submit">Update Blog Post</Button>
      </form>
    </div>
  );
}