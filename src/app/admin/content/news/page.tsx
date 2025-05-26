'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getNewsArticlesAction } from "./actions"; // Import the new server action
import { deleteNewsArticleAction } from "./actions";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,

  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialog,
} from "@/components/ui/alert-dialog";
import { hasRole } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useSession } from "next-auth/react";

const NewsManagementPage = () => {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [newsArticles, setNewsArticles] = useState<any[]>([]);
  const [totalNewsArticles, setTotalNewsArticles] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Or another default
  const [loading, setLoading] = useState(true);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [newsArticleToDeleteId, setNewsArticleToDeleteId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const offset = (currentPage - 1) * itemsPerPage;
        const { newsArticles: fetchedArticles, totalCount } = await getNewsArticlesAction({
          search: searchQuery,
          limit: itemsPerPage,
          offset,
          orderBy: { createdAt: 'desc' }, // Or other default sort
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

    fetchNewsArticles();

    // Update URL search params
    const params = new URLSearchParams(searchParams.toString());
    params.set('search', searchQuery);
    params.set('page', currentPage.toString());
    router.push(`?${params.toString()}`, { scroll: false });

  }, [searchQuery, currentPage, itemsPerPage, searchParams, router]);

  const handleDeleteClick = (articleId: string) => {
    setNewsArticleToDeleteId(articleId);
    setShowDeleteDialog(true);
  };

  return (
    <>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">News Management</h1>

        {error && <p className="text-red-500">Error: {error}</p>}
        <div className="mb-4 flex space-x-4">

          {session?.user?.role && hasRole(session.user.role, ['SUPER_ADMIN', 'ADMIN', 'EDITOR']) && (
            <Link href="/admin/content/news/create">
              <Button>Create New News Article</Button>
            </Link>
          )}
        </div>

        {loading ? (
          <>
            <p>Loading news articles...</p>
          </>
        ) : newsArticles.length === 0 ? (
          <>
            <p>No news articles found.</p>
          </>
        ) : (
          <>
            <div className="space-y-4">
              <Input
                placeholder="Search news articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
                    {newsArticles.map((article) => (
                      <TableRow key={article.id}>
                        <TableCell>{article.title}</TableCell>
                        <TableCell>{article.slug}</TableCell>
                        <TableCell>{article.published ? "Yes" : "No"}</TableCell>
                        <TableCell className="flex space-x-2">
                          {session?.user?.role && hasRole(session.user.role, ['SUPER_ADMIN', 'ADMIN', 'EDITOR']) && (
                            <Link
                              href={`/admin/content/news/edit/${article.id}`}
                              className="text-blue-500 hover:underline"
                            >
                              Edit
                            </Link>
                          )}

                          {session?.user?.role && hasRole(session.user.role, ['SUPER_ADMIN', 'ADMIN', 'EDITOR']) && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteClick(article.id)}
                            >
                              Delete
                            </Button>

                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </>
        )}
      </div>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              news article.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setNewsArticleToDeleteId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={async () => {
              if (newsArticleToDeleteId) {
                await deleteNewsArticleAction(newsArticleToDeleteId);
                // Optionally re-fetch data or update state
              }
            }}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default NewsManagementPage;
