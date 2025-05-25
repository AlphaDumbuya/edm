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

import { fetchBlogPosts } from "./fetchBlogPosts"; // Import the server action
import Link from "next/link";
import { deleteBlogPostAction } from "./actions";
import { useState, useEffect, use } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { hasRole } from '@/lib/utils';

export default function BlogManagementPage() { // Changed to a client component
  const searchParams = useSearchParams();
  const router = useRouter();

  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [totalBlogPosts, setTotalBlogPosts] = useState(0);
  const [loading, setLoading] = useState(true);
  let error = null;
  
  const { data: session } = useSession();
  const userRole = session?.user?.role; // Assuming role is on user object in session
  const allowedToCreate = hasRole(userRole, ['SUPER_ADMIN', 'ADMIN', 'EDITOR']);

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [itemsPerPage, setItemsPerPage] = useState(10); // You can make this dynamic

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const offset = (currentPage - 1) * itemsPerPage;
        const limit = itemsPerPage;
        const result = await fetchBlogPosts(searchQuery, offset, limit); // Call the server action
        setBlogPosts(result.blogPosts);
        setTotalBlogPosts(result.totalCount);
      } catch (e: any) {
        console.error("Error fetching blog posts:", e);
        error = e.message;
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
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

  const totalPages = Math.ceil(totalBlogPosts / itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Blog Management</h1>
      {allowedToCreate && (
        <div className="flex justify-end mb-4">
          <Button asChild>
            <Link href="/admin/content/blog/create">Create New Blog Post</Link>
          </Button>
        </div>)}
      <div className="mb-4">
        <Input
          placeholder="Search blog posts by title or slug..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      {error && <p className="text-red-500">Error fetching blog posts: {error}</p>}
      {!error && (
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
                  <div className="flex space-x-2">
                    {hasRole(userRole, ['SUPER_ADMIN', 'ADMIN', 'EDITOR']) && (
 <Button variant="outline" size="sm" asChild>
 <Link href={`/admin/content/blog/edit/${post.id}`}>Edit</Link>
 </Button>
 )}
                    {hasRole(userRole, ['SUPER_ADMIN', 'ADMIN', 'EDITOR']) && (/* For now, keeping it as a placeholder */
                    (<Button variant="destructive" size="sm">Delete</Button>)
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
