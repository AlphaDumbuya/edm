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
  // Refresh handler
  const handleRefresh = async () => {
    setLoading(true);
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
    } catch (e: any) {
      setError(e.message || "Error fetching news articles.");
      console.error("Error fetching news articles:", e);
    } finally {
      setLoading(false);
    }
  };
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


  // Correct refresh handler for the button
  const handleRefresh = async () => {
    setLoading(true);
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
    } catch (e: any) {
      setError(e.message || "Error fetching news articles.");
      console.error("Error fetching news articles:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientSessionProvider>
      <div className="container mx-auto py-6 px-2 sm:px-4 md:px-8 flex flex-col gap-6">
        <div className="bg-gray-900 text-gray-100 rounded-lg shadow-lg border border-gray-800 w-full p-2 sm:p-6 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-6 w-full">
            <h1 className="text-3xl font-bold w-full md:w-auto text-left tracking-tight mt-4 mb-4">News Management</h1>
            <div className="flex w-full md:w-auto justify-between gap-2 mt-4">
              {session?.user?.role && hasRole(session.user.role, ['SUPER_ADMIN', 'ADMIN', 'EDITOR']) && (
                <Button asChild size="sm" className="px-2 py-1 text-xs font-semibold rounded bg-primary text-white hover:bg-primary/90 w-28 sm:w-auto">
                  <Link href="/admin/content/news/create">Create</Link>
                </Button>
              )}
              <button
                className="flex items-center gap-2 px-2 py-1 text-xs font-semibold rounded bg-gray-800 text-gray-100 hover:bg-gray-700 border border-gray-700 transition shadow w-28 sm:w-auto justify-center focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={handleRefresh}
                title="Refresh"
                disabled={loading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582M20 20v-5h-.581m-2.638 2.638A7.974 7.974 0 0112 20c-4.418 0-8-3.582-8-8 0-1.657.507-3.197 1.382-4.462m2.638-2.638A7.974 7.974 0 0112 4c4.418 0 8 3.582 8 8 0-1.657-.507-3.197-1.382 4.462" />
                </svg>
                <span className="inline">Refresh</span>
              </button>
            </div>
          </div>
          <div className="h-2" />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            {isSearchParamsReady && (
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-white-icons text-sm px-2 py-2 w-full bg-gray-800 text-gray-100 border border-gray-700 placeholder-gray-400 focus:ring-primary focus:border-primary rounded-md"
              />
            )}
          </div>
          {/* Conditional rendering for loading, empty, and content states */}
          <>
            {loading || !isSearchParamsReady ? (
              <p className="text-gray-400 text-sm">Loading...</p>
            ) : newsArticles.length === 0 ? (
              <p className="text-gray-400 text-sm">No news found.</p>
            ) : (
              <>
                {/* Desktop: Table layout (md+) */}
                <div className="hidden md:block w-full">
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
                      {newsArticles.map((article) => (
                        <tr key={article.id} className="border-t border-gray-800 text-sm">
                          <td className="px-4 py-2 text-gray-100 max-w-xs break-words">{article.title}</td>
                          <td className="px-4 py-2 text-gray-400 break-words">{article.slug}</td>
                          <td className="px-4 py-2">
                            {article.published ? <span className="text-green-400 font-semibold">Yes</span> : <span className="text-red-400 font-semibold">No</span>}
                          </td>
                          <td className="px-4 py-2">
                            <div className="flex gap-2">
                              {session?.user?.role && hasRole(session.user.role, ['SUPER_ADMIN', 'ADMIN', 'EDITOR']) && (
                                <>
                                  <Link href={`/admin/content/news/edit/${article.id}`} className="px-3 py-1 bg-primary text-white rounded font-semibold text-center hover:bg-primary/90 transition text-xs">Edit</Link>
                                  <Button variant="destructive" size="sm" className="px-3 py-1 rounded bg-red-700 text-white hover:bg-red-800 font-semibold text-xs" onClick={() => handleDeleteClick(article.id)}>
                                    Delete
                                  </Button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Mobile Card Layout */}
            <div className="block lg:hidden w-full">
              {newsArticles.map((article) => (
                <div key={article.id} className="bg-gray-900 border border-gray-700 rounded shadow p-4 flex flex-col gap-2 text-sm mb-4">
                  <div className="font-bold text-base text-gray-100 mb-2 text-left">{article.title}</div>
                  <div className="text-gray-400 text-xs mb-1"><span className="font-semibold text-gray-300">Slug:</span> {article.slug}</div>
                  <div className="text-gray-400 text-xs mb-1"><span className="font-semibold text-gray-300">Published:</span> {article.published ? <span className="text-green-400 font-semibold">Yes</span> : <span className="text-red-400 font-semibold">No</span>}</div>
                  {session?.user?.role && hasRole(session.user.role, ['SUPER_ADMIN', 'ADMIN', 'EDITOR']) && (
                    <div className="flex flex-row gap-2 mt-3">
                      <Link href={`/admin/content/news/edit/${article.id}`} className="px-3 py-2 bg-primary text-white rounded font-semibold text-center hover:bg-primary/90 transition">Edit</Link>
                      <Button variant="destructive" size="sm" className="px-3 py-2 rounded bg-red-700 text-white hover:bg-red-800 font-semibold" onClick={() => handleDeleteClick(article.id)}>
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
              </>
            )}
          </>
          <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogContent className="bg-gray-900 text-gray-100 border border-gray-800">
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                <AlertDialogDescription>
                  This cannot be undone. Delete this news article?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <div className="flex flex-row gap-2 justify-end w-full">
                  <AlertDialogCancel onClick={() => setNewsArticleToDeleteId(null)} className="bg-gray-700 text-gray-100 hover:bg-gray-600 px-4 py-2 rounded w-auto">Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded w-auto">Delete</AlertDialogAction>
                </div>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </ClientSessionProvider>
  );
};

export default NewsManagementPage;
