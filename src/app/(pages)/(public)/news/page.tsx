import prisma from "@/lib/db/prisma";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NewsExt } from "@/types/my-types";
import { ArrowRight, Clock, User } from "lucide-react";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "News | Shalom Radio",
};

export default async function NewsPage() {
  let news: NewsExt[] = [];

  try {
    news = (await prisma.news.findMany({
      orderBy: { createdAt: "desc" },
      where: { published: true },
    })) as NewsExt[];
  } catch (error) {
    console.error("Error fetching news articles:", error);
    // Return placeholder content during build time or when database is unavailable
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Latest News</h1>
        <p className="text-muted-foreground">
          Unable to load news articles. Please try again later.
        </p>
      </div>
    );
  }

  if (!news || news.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Latest News</h1>
        <p className="text-muted-foreground">
          No news articles available at this time.
        </p>
      </div>
    );
  }

  // Function to strip HTML tags for content previews
  const stripHtml = (html: string): string => {
    return html.replace(/<[^>]*>/g, "");
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-10">Latest News</h1>

      {/* News Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news?.map((item) => (
          <Card key={item?.id} className="overflow-hidden flex flex-col h-full">
            <div className="relative aspect-video w-full">
              {item?.coverImage ? (
                <Image
                  src={item?.coverImage?.url}
                  alt={item?.title}
                  fill
                  className="object-cover"
                  priority={item?.id === news[0]?.id} // Priority loading for first item only
                />
              ) : (
                <div className="h-full w-full bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">No image available</p>
                </div>
              )}
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl line-clamp-2">
                {item?.title}
              </CardTitle>
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="h-3 w-3 mr-1" />
                <span className="mr-3">{item?.author}</span>
                <Clock className="h-3 w-3 mr-1" />
                <span>{format(new Date(item?.createdAt), "MMM d, yyyy")}</span>
              </div>
            </CardHeader>
            <CardContent className="pb-2 flex-grow">
              <p className="line-clamp-2 text-muted-foreground">
                {stripHtml(item?.content).substring(0, 150)}
                {item?.content?.length > 150 ? "..." : ""}
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button asChild variant="outline" size="sm">
                <Link href={`/news/${item?.id}`}>
                  Read More <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}