"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { NewsExt } from "@/types/my-types";
import { format } from "date-fns";
import { ArrowLeft, Clock, User } from "lucide-react";

interface NewsDetailProps {
  newsId: string;
}

export function NewsDetail({ newsId }: NewsDetailProps) {
  const { toast } = useToast();
  const [news, setNews] = useState<NewsExt | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedNews, setRelatedNews] = useState<NewsExt[]>([]);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      setLoading(true);
      try {
        // Fetch the specific news article
        const response = await fetch(`/api/news/${newsId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch news article");
        }
        const data = await response.json();
        setNews(data);

        // Fetch related news (other published articles)
        const relatedResponse = await fetch(`/api/news?exclude=${newsId}`);
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json();
          setRelatedNews(relatedData.slice(0, 3)); // Limit to 3 related articles
        }
      } catch (error) {
        console.error("Error fetching news details:", error);
        toast({
          title: "Error",
          description:
            "Failed to load the news article. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (newsId) {
      fetchNewsDetail();
    }
  }, [newsId, toast]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Skeleton className="h-10 w-3/4 mb-6" />
        <Skeleton className="h-[400px] w-full mb-6" />
        <Skeleton className="h-6 w-full mb-4" />
        <Skeleton className="h-6 w-full mb-4" />
        <Skeleton className="h-6 w-3/4 mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The news article you're looking for could not be found.
        </p>
        <Button asChild>
          <Link href="/news" legacyBehavior>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Back button */}
      <div className="mb-6">
        <Button asChild variant="outline" size="sm">
          <Link href="/news" legacyBehavior>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News
          </Link>
        </Button>
      </div>
      {/* Article title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6">{news.title}</h1>
      {/* Article metadata */}
      <div className="flex flex-wrap gap-4 items-center mb-6 text-muted-foreground">
        <div className="flex items-center">
          <User className="h-4 w-4 mr-2" />
          <span>{news.author}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          <span>{format(new Date(news.createdAt), "MMMM d, yyyy")}</span>
        </div>
      </div>
      {/* Article featured image */}
      {news.coverImage && (
        <div className="mb-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted">
            <Image
              src={news.coverImage.url}
              alt={news.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}
      {/* Article content */}
      <div
        className="prose prose-lg max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: news.content }}
      />
      {/* Related Articles */}
      {relatedNews.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedNews.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative aspect-video overflow-hidden">
                  {item.coverImage ? (
                    <Image
                      src={item.coverImage.url}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-muted flex items-center justify-center">
                      <p className="text-muted-foreground">No image</p>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <div
                    className="text-muted-foreground mb-4 text-sm line-clamp-2 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/news/${item.id}`}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}