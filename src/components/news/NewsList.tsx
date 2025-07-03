"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NewsExt } from "@/types/my-types";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ArrowRight, Clock } from "lucide-react";

export function NewsList() {
  const { toast } = useToast();
  const [news, setNews] = useState<NewsExt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublishedNews = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/news");
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
        toast({
          title: "Error",
          description: "Failed to load news. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPublishedNews();
  }, [toast]);

  if (loading) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Loading news articles...</p>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">
          No news articles available at this time.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Latest News</h2>
      {/* Featured News (first item) */}
      {news.length > 0 && (
        <div className="relative overflow-hidden rounded-xl">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
            {news[0]?.coverImage ? (
              <Image
                src={news[0].coverImage.url}
                alt={news[0].title}
                fill
                className="object-cover transition-transform hover:scale-105 duration-500"
                priority
              />
            ) : (
              <div className="h-full w-full bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">No image available</p>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
              <div className="absolute bottom-0 left-0 p-6 flex flex-col">
                <div className="flex items-center text-white/80 mb-2">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    {format(new Date(news[0].createdAt), "MMMM d, yyyy")}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {news[0].title}
                </h3>
                <p className="text-white/90 mb-4 line-clamp-2">
                  {news[0].content.substring(0, 150)}
                  {news[0].content.length > 150 ? "..." : ""}
                </p>
                <Button asChild variant="secondary" className="w-fit">
                  <Link href={`/news/${news[0].slug}`}>Read More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Other News List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.slice(1).map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative aspect-video overflow-hidden">
              {item.coverImage ? (
                <Image
                  src={item.coverImage.url}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform hover:scale-105 duration-500"
                />
              ) : (
                <div className="h-full w-full bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">No image available</p>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex items-center text-muted-foreground mb-2">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">
                  {format(new Date(item.createdAt), "MMMM d, yyyy")}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {item.content.substring(0, 100)}
                {item.content.length > 100 ? "..." : ""}
              </p>
              <Button asChild variant="outline" size="sm" className="w-fit">
                <Link href={`/news/${item.slug}`}>Read More</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}