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

const NewsManagementPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const itemsPerPage = 10;

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isSearchParamsReady, setIsSearchParamsReady] = useState(false);

  const [newsArticles, setNewsArticles] = useState<any[]>([]);
  const [totalNewsArticles, setTotalNewsArticles] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [newsArticleToDeleteId, setNewsArticleToDeleteId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
  }, [searchQuery, currentPage, router, pathname, isSearchParamsReady]);

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

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    setLoading(true);
    try {
      await fetchNewsArticles();
    } finally {
      setIsRefreshing(false);
      setLoading(false);
    }
  }, [fetchNewsArticles]);

  useEffect(() => {
    if (searchQuery === null || currentPage === null) {
      return;
    }
    setLoading(true);
    fetchNewsArticles().finally(() => setLoading(false));
  }, [currentPage, searchQuery, fetchNewsArticles]);

  return (
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
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="inline">Refresh</span>
            </button>
          </div>
        </div>
        <div className="h-2" />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {/* Rest of your component's JSX */}
      </div>
    </div>
  );
};

export default function NewsManagementPageWrapper() {
  return (
    <ClientSessionProvider>
      <NewsManagementPage />
    </ClientSessionProvider>
  );
}
