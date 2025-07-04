import React from "react";
import { NewsList } from "@/components/news/NewsList";

export default function NewsPage() {
  return (
    <main className="container mx-auto px-4 py-10 min-h-screen">
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Latest News</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Stay up to date with the latest news, updates, and announcements from our organization.
        </p>
      </div>
      <NewsList />
    </main>
  );
}
