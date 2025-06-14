// types/news.ts
export type NewsPost = {
  id: string;
  createdAt: Date;
  title: string;
  slug: string;
  content: string;
  date: string;
  author: {
    name: string;
  };
  excerpt: string;
  imageUrl: string;
};