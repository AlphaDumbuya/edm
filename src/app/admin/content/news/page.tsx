'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getNewsArticlesAction, deleteNewsArticleAction } from "./actions";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { RefreshCw } from 'lucide-react';

import {
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialog,
} from "@/components/ui/alert-dialog";

import { hasRole } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { ClientSessionProvider } from "@/components/providers/client-session-provider";

import { Suspense } from "react";

const NewsManagementPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isSearchParamsReady, setIsSearchParamsReady] = useState(false);

  const [newsArticles, setNewsArticles] = useState<any[]>([]);
  const [totalNewsArticles, setTotalNewsArticles] = useState(0);
  // Initialize loading to true only if searchParams are not yet loaded
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [newsArticleToDeleteId, setNewsArticleToDeleteId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setSearchQuery(searchParams.get('search') || '');
    setCurrentPage(parseInt(searchParams.get('page') || '1'));
    setIsSearchParamsReady(true);
  }, []);

  useEffect(() => {
    // Only update URL if searchQuery or currentPage have been set from searchParams
    if (isSearchParamsReady) {
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      if (currentPage !== 1) params.set('page', currentPage.toString());
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [searchQuery, currentPage, router, pathname]);

  const fetchNewsArticles = useCallback(async () => {
    setError(null);
    try {
      const offset = (currentPage - 1) * itemsPerPage;
      const { newsArticles: fetchedArticles, totalCount } = await getNewsArticlesAction({
        search: searchQuery,
        limit: itemsPerPage,
        offset,
        orderBy: { createdAt: 'desc' },
      });
      setNewsArticles(fetchedArticles);
      setTotalNewsArticles(totalCount);
      return true;
    } catch (e: any) {
      setError(e.message || "Error fetching news articles.");
      console.error("Error fetching news articles:", e);
      return false;
    }
  }, [currentPage, searchQuery, itemsPerPage]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchNewsArticles();
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    // Only fetch data if searchQuery and currentPage have been initialized
    if (searchQuery === null || currentPage === null) {
      return;
    }
    setLoading(true);
    fetchNewsArticles().finally(() => setLoading(false));
  }, [currentPage, searchQuery, fetchNewsArticles]);

  const handleDeleteClick = (articleId: string) => {
    setNewsArticleToDeleteId(articleId);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (newsArticleToDeleteId) {
      try {
        await deleteNewsArticleAction(newsArticleToDeleteId);
        setNewsArticles(prev => prev.filter(article => article.id !== newsArticleToDeleteId));
      } catch (e) {
        console.error("Error deleting article:", e);
      } finally {
        setShowDeleteDialog(false);
        setNewsArticleToDeleteId(null);
      }
    }
  };

  return (
    <ClientSessionProvider>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">News Management</h1>

        {error && <p className="text-red-500">Error: {error}</p>}

        <div className="mb-4 flex justify-between items-center">
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
            {session?.user?.role && hasRole(session.user.role, ['SUPER_ADMIN', 'ADMIN', 'EDITOR']) && (
              <Button asChild>
                <Link href="/admin/content/news/create">Create New News Article</Link>
              </Button>
            )}
          </div>
        </div>

 {isSearchParamsReady && (
          <Input
 placeholder="Search news articles..."
 value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
 className="mb-4"
          />
 )}

 {loading || !isSearchParamsReady ? (
          <p>Loading news articles...</p>
 ) : newsArticles.length === 0 ? (
          <p>No news articles found.</p>
        ) : (
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
              {newsArticles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>{article.title}</TableCell>
                  <TableCell>{article.slug}</TableCell>
                  <TableCell>{article.published ? "Yes" : "No"}</TableCell>
                  <TableCell className="flex space-x-2">
                    {session?.user?.role && hasRole(session.user.role, ['SUPER_ADMIN', 'ADMIN', 'EDITOR']) && (
                      <>
                        <Link href={`/admin/content/news/edit/${article.id}`} className="text-blue-500 hover:underline">
                          Edit
                        </Link>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(article.id)}>
                          Delete
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the news article.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setNewsArticleToDeleteId(null)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </ClientSessionProvider>
  );
};

export default NewsManagementPage;
