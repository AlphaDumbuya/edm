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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
// Import the server action
import Link from "next/link";
import { useState, useEffect, use, Suspense } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { hasRole } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

function BlogContent() {
  const router = useRouter(); // Call useRouter directly

  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [totalBlogPosts, setTotalBlogPosts] = useState(0);
  const [loading, setLoading] = useState(true);

  let error = null;

  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const userRole = session?.user?.role; // Assuming role is on user object in session
  const canManageBlogPosts = hasRole(userRole, ['SUPER_ADMIN', 'ADMIN', 'EDITOR']);
  // Initialize state only after searchParams is available
  const [searchQuery, setSearchQuery] = useState(searchParams ? searchParams.get('search') || '' : '');
  const [currentPage, setCurrentPage] = useState(searchParams ? parseInt(searchParams.get('page') || '1') : 1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // You can make this dynamic

  const { toast } = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const offset = (currentPage - 1) * itemsPerPage;
        const limit = itemsPerPage;
        const params = new URLSearchParams();
        if (searchQuery) params.set('search', searchQuery);
        params.set('offset', offset.toString());
        params.set('limit', limit.toString());
        const res = await fetch(`/api/admin/blog?${params.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch blog posts');
        const result = await res.json();
        setBlogPosts(Array.isArray(result.blogPosts) ? result.blogPosts : []);
        setTotalBlogPosts(result.totalCount || 0);
      } catch (e: any) {
        console.error("Error fetching blog posts:", e);
        error = e.message;
      } finally {
        setLoading(false);
      }
    };

    if (searchParams) fetchPosts(); // Fetch data only after searchParams is initialized
  }, [searchQuery, currentPage, itemsPerPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
    updateUrlParams({ search: e.target.value, page: '1' });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateUrlParams({ page: page.toString() });
  };

  const updateUrlParams = (params: { [key: string]: string }) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    Object.keys(params).forEach(key => {
      if (params[key]) {
        currentParams.set(key, params[key]);
      } else {
        currentParams.delete(key);
      }
    });
    router.push(`/admin/content/blog?${currentParams.toString()}`);
  };

  const handleDelete = async (postId: string) => {
    if (!session?.user?.id) {
      toast({
        title: 'Authentication Error',
        description: 'You must be logged in to delete a blog post.',
        variant: 'destructive',
      });
      return;
    }
    if (!window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/blog/${postId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.user.id }),
      });
      if (!res.ok) {
        const error = await res.json();
        toast({
          title: 'Delete Failed',
          description: error.error || 'There was an error deleting the blog post.',
          variant: 'destructive',
        });
        return;
      }
      toast({
        title: 'Blog Post Deleted',
        description: 'The blog post was deleted successfully.',
        variant: 'success',
      });
      setBlogPosts(blogPosts.filter(post => post.id !== postId));
    } catch (error) {
      toast({
        title: 'Delete Failed',
        description: 'There was an error deleting the blog post.',
        variant: 'destructive',
      });
    }
  };

  const totalPages = Math.ceil(totalBlogPosts / itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Blog Management</h1>
        {canManageBlogPosts && (
          <Button asChild>
            <Link
              href="/admin/content/blog/create"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              + Create Blog
            </Link>
          </Button>
        )}
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search blog posts by title or slug..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      {blogPosts.length === 0 && !loading && (
        <div className="text-center text-gray-500 py-8">No blog posts found.</div>
      )}
      {error && <p className="text-red-500">Error fetching blog posts: {error}</p>}
      {!error && blogPosts.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.slug}</TableCell>
                <TableCell>{post.published ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <div className="flex space-x-2 ">
                    {canManageBlogPosts && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/content/blog/edit/${post.id}`}>Edit</Link>
                      </Button>
                    )}
                    {canManageBlogPosts && (
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)}>Delete</Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {loading && <p>Loading...</p>}
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1} />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink onClick={() => handlePageChange(i + 1)} isActive={currentPage === i + 1}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default function BlogManagementPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogContent />
    </Suspense>
  );
}
