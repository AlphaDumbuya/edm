"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { NewsDialog } from "./NewsDialog";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";
import { NewsExt } from "../../types/my-types";
import { useToast } from "../../hooks/use-toast";
import Image from "next/image";
import { Pencil, Trash2, Plus, RefreshCw } from "lucide-react";
import { format } from "date-fns";

export function NewsTable() {
  const { toast } = useToast();
  const [news, setNews] = useState<NewsExt[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<NewsExt | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isNewNews, setIsNewNews] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/news");
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error("Error fetching news:", error);
      toast({
        title: "Error",
        description: "Failed to fetch news. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleCreateNews = () => {
    setSelectedNews(null);
    setIsNewNews(true);
    setIsDialogOpen(true);
  };

  const handleEditNews = (newsItem: NewsExt) => {
    setSelectedNews(newsItem);
    setIsNewNews(false);
    setIsDialogOpen(true);
  };

  const handleDeleteNews = (newsItem: NewsExt) => {
    setSelectedNews(newsItem);
    setIsDeleteDialogOpen(true);
  };

  const handleNewsSaved = () => {
    fetchNews();
    setIsDialogOpen(false);
  };

  const handleNewsDeleted = () => {
    fetchNews();
    setIsDeleteDialogOpen(false);
    setSelectedNews(null);
  };

  return (
    <>
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/40">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>News Articles</CardTitle>
            <div className="flex items-center mt-2 sm:mt-0 gap-2">
              <Button variant="outline" size="sm" onClick={fetchNews}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button size="sm" onClick={handleCreateNews}>
                <Plus className="h-4 w-4 mr-2" />
                Add News
              </Button>
            </div>
          </div>
          <CardDescription>
            Manage news articles for the Shalom Radio platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <p className="text-muted-foreground">Loading news articles...</p>
            </div>
          ) : (
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {news.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center text-muted-foreground p-4"
                      >
                        No news articles found
                      </TableCell>
                    </TableRow>
                  ) : (
                    news.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="p-2 sm:p-4">
                          <div className="relative h-12 w-20 overflow-hidden rounded-md bg-muted ">
                            {item.coverImage ? (
                              <Image
                                src={item.coverImage.url}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                                <span className="text-xs">No image</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium p-2 sm:p-4">
                          {item.title}
                        </TableCell>
                        <TableCell className="p-2 sm:p-4">{item.author}</TableCell>
                        <TableCell className="p-2 sm:p-4">
                          {item.published ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                              Published
                            </Badge>
                          ) : (
                            <Badge variant="outline">Draft</Badge>
                          )}
                        </TableCell>
                        <TableCell className="p-2 sm:p-4">
                          {format(new Date(item.createdAt), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell className="text-right p-2 sm:p-4">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditNews(item)}
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive"
                              onClick={() => handleDeleteNews(item)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-muted/40 border-t p-3 text-sm flex justify-between">
          <div>Total news articles: {news.length}</div>
        </CardFooter>
      </Card>

      <NewsDialog
        news={selectedNews}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSaved={handleNewsSaved}
        isNew={isNewNews}
      />

      <ConfirmDeleteDialog
        news={selectedNews}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDeleted={handleNewsDeleted}
      />
    </>
  );
}
