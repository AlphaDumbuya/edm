'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { hasRole } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw } from 'lucide-react';
import { ConfirmDeleteBlogDialog } from '@/components/blog/ConfirmDeleteBlogDialog';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  createdAt: string;
  author?: { name: string | null } | null;
}

function BlogContent() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { data: session } = useSession();
  const { toast } = useToast();

  const fetchBlogPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/blog?admin=1");
      if (!res.ok) throw new Error("Failed to fetch blog posts");
      const data = await res.json();
      setBlogPosts(data.blogPosts || []);
      return true;
    } catch (err: any) {
      setError(err.message || "Failed to load blog posts.");
      return false;
    }
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchBlogPosts();
      toast({ title: 'Success', description: 'Blog posts refreshed successfully', variant: 'default' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to refresh blog posts', variant: 'destructive' });
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBlogPosts().finally(() => setLoading(false));
  }, [fetchBlogPosts]);

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  // Delete handler
  const handleDelete = async (postId: string) => {
    if (!session?.user?.id) {
      toast({ title: 'Error', description: 'You must be logged in to delete.', variant: 'destructive' });
      return;
    }
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      const res = await fetch(`/api/admin/blog/${postId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.user.id }),
      });
      if (!res.ok) {
        const error = await res.json();
        toast({ title: 'Error', description: error.error || 'Failed to delete blog post.', variant: 'destructive' });
        return;
      }
      setBlogPosts(posts => posts.filter(p => p.id !== postId));
      toast({ title: 'Deleted', description: 'Blog post deleted.', variant: 'default' });
    } catch (err) {
      toast({ title: 'Error', description: 'An unexpected error occurred.', variant: 'destructive' });
    }
  };

  const handleDeleteClick = (blogId: string) => {
    setSelectedBlogId(blogId);
    setDeleteDialogOpen(true);
  };

  const handleDeleted = () => {
    setBlogPosts(posts => posts.filter(p => p.id !== selectedBlogId));
    setSelectedBlogId(null);
    setDeleteDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Management</h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button asChild>
            <Link href="/admin/content/blog/create">Create Blog</Link>
          </Button>
        </div>
      </div>
      <div className="mb-4 max-w-sm">
        <Input
          placeholder="Search blog posts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : filteredPosts.length === 0 ? (
        <div>No blog posts found.</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.slug}</TableCell>
                <TableCell>{post.published ? "Yes" : "No"}</TableCell>
                <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{post.author?.name || "Unknown"}</TableCell>
                <TableCell>
                  <Link href={`/admin/content/blog/edit/${post.id}`}>Edit</Link>
                  <Button variant="destructive" size="sm" className="ml-2" onClick={() => handleDeleteClick(post.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <ConfirmDeleteBlogDialog
        blogId={selectedBlogId}
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onDeleted={handleDeleted}
        userId={session?.user?.id || null}
      />
    </div>
  );
}

export default function BlogManagementPage() {
  return <BlogContent />;
}
