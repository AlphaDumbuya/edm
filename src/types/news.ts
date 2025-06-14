export interface NewsPost {
  id: string | number;
  title: string;
  slug: string;
  content: string;
  createdAt: Date;
  date: string;
  author: string;
  excerpt: string;
  imageUrl: string;
}