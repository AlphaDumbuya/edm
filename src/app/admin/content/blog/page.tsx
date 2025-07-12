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
// Import the server action
import Link from "next/link";
import { useState, useEffect, use, Suspense } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { hasRole } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import React from "react";
import { ConfirmDeleteBlogDialog } from '@/components/blog/ConfirmDeleteBlogDialog';
import RestrictedButton from '@/components/admin/RestrictedButton';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  createdAt: string;
  author?: { name: string | null } | null;
}

export default BlogContent;

function BlogContent() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const { data: session } = useSession();
  const { toast } = useToast();
  const role = session?.user?.role || "VIEWER";
  const router = useRouter();

  // Fetch blog posts from API
  const fetchBlogPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/blog", { method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch blog posts");
      const data = await res.json();
      setBlogPosts(Array.isArray(data) ? data : data.posts || []);
    } catch (err: any) {
      setError(err.message || "An error occurred while loading blog posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filtered posts based on search
  const filteredPosts: BlogPost[] = blogPosts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.slug.toLowerCase().includes(search.toLowerCase())
  );

  // Refresh handler
  function handleRefresh() {
    fetchBlogPosts();
  }

  // Edit handler
  function handleEdit(id: string) {
    if (id === "create") {
      router.push("/admin/content/blog/create");
    } else {
      router.push(`/admin/content/blog/edit/${id}`);
    }
  }

  // Delete handler
  function handleDeleteClickSecured(id: string) {
    setSelectedBlogId(id);
    setDeleteDialogOpen(true);
  }

  // After delete
  function handleDeleted() {
    setDeleteDialogOpen(false);
    setSelectedBlogId(null);
    toast({ title: "Blog post deleted." });
    fetchBlogPosts();
  }

  return (
    <div className="container mx-auto py-8 px-2 sm:px-6 lg:px-8 bg-gray-900 text-gray-100 rounded-lg shadow-lg max-w-4xl w-full border border-gray-800">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-left md:text-left w-full md:w-auto mb-4">Blog Management</h1>
        <div className="flex flex-row w-full md:w-auto gap-2">
          <div className="flex-1 flex justify-start">
            <RestrictedButton
              allowedRoles={["ADMIN", "SUPER_ADMIN", "EDITOR"]}
              userRole={role}
              onClick={() => handleEdit("create")}
              className="bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              title={role === "VIEWER" ? "Viewers cannot create blogs." : undefined}
            >
              <Link href="/admin/content/blog/create" className={role === "VIEWER" ? "pointer-events-none" : ""}>Create Blog</Link>
            </RestrictedButton>
          </div>
          <div className="flex-1 flex justify-end">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-100 rounded hover:bg-gray-700 border border-gray-700 transition font-medium shadow focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={handleRefresh}
              title="Refresh blog list"
              disabled={loading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582M20 20v-5h-.581m-2.638 2.638A7.974 7.974 0 0112 20c-4.418 0-8-3.582-8-8 0-1.657-.507-3.197-1.382-4.462m2.638-2.638A7.974 7.974 0 0112 4c4.418 0 8 3.582 8 8 0-1.657-.507-3.197-1.382 4.462" />
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </div>
      <div className="mb-6 max-w-sm mx-auto md:mx-0 w-full">
        <Input
          placeholder="Search blog posts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input-white-icons text-sm px-2 py-2 w-full bg-gray-800 text-gray-100 border border-gray-700 placeholder-gray-400 focus:ring-primary focus:border-primary rounded-md"
        />
      </div>
      {loading ? (
        <div className="text-gray-400 text-sm">Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-gray-400 text-sm">No blog posts found.</div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg">
              <thead>
                <tr className="text-left text-gray-300 text-sm">
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Slug</th>
                  <th className="px-4 py-2">Published</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post: BlogPost) => (
                  <tr key={post.id} className="border-t border-gray-800 text-sm">
                    <td className="px-4 py-2 text-gray-100 max-w-xs break-words">{post.title}</td>
                    <td className="px-4 py-2 text-gray-400 break-words">{post.slug}</td>
                    <td className="px-4 py-2">
                      {post.published ? <span className="text-green-400 font-semibold">Yes</span> : <span className="text-red-400 font-semibold">No</span>}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <RestrictedButton
                          allowedRoles={["ADMIN", "SUPER_ADMIN", "EDITOR"]}
                          userRole={role}
                          onClick={() => handleEdit(post.id)}
                          className="px-3 py-1 bg-primary text-white rounded font-semibold text-center hover:bg-primary/90 transition text-xs"
                          title={role === "VIEWER" ? "Viewers cannot edit blogs." : undefined}
                        >
                          Edit
                        </RestrictedButton>
                        <RestrictedButton
                          allowedRoles={["ADMIN", "SUPER_ADMIN"]}
                          userRole={role}
                          onClick={() => handleDeleteClickSecured(post.id)}
                          className="px-3 py-1 bg-red-700 text-white rounded font-semibold text-center hover:bg-red-800 transition text-xs"
                          title={role === "VIEWER" ? "Viewers cannot delete blogs." : undefined}
                        >
                          Delete
                        </RestrictedButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile Cards */}
          <div className="flex flex-col gap-4 md:hidden">
            {filteredPosts.map((post: BlogPost) => (
              <div key={post.id} className="bg-gray-900 border border-gray-700 rounded shadow p-3 flex flex-col gap-1 text-xs w-full">
                <div className="font-bold text-base text-gray-100 mb-1">{post.title}</div>
                <div className="text-gray-400 text-xs mb-1"><span className="font-semibold text-gray-300">Slug:</span> {post.slug}</div>
                <div className="text-gray-400 text-xs mb-1"><span className="font-semibold text-gray-300">Published:</span> {post.published ? <span className="text-green-400 font-semibold">Yes</span> : <span className="text-red-400 font-semibold">No</span>}</div>
                <div className="flex flex-row gap-2 mt-2">
                  <RestrictedButton
                    allowedRoles={["ADMIN", "SUPER_ADMIN", "EDITOR"]}
                    userRole={role}
                    onClick={() => handleEdit(post.id)}
                    className="px-3 py-2 bg-primary text-white rounded font-semibold text-center hover:bg-primary/90 transition"
                    title={role === "VIEWER" ? "Viewers cannot edit blogs." : undefined}
                  >
                    Edit
                  </RestrictedButton>
                  <RestrictedButton
                    allowedRoles={["ADMIN", "SUPER_ADMIN"]}
                    userRole={role}
                    onClick={() => handleDeleteClickSecured(post.id)}
                    className="px-3 py-2 bg-red-700 text-white rounded font-semibold text-center hover:bg-red-800 transition"
                    title={role === "VIEWER" ? "Viewers cannot delete blogs." : undefined}
                  >
                    Delete
                  </RestrictedButton>
                </div>
              </div>
            ))}
          </div>
        </>
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
