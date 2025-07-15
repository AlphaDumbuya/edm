export interface PrayerRequestData {
  id: string;
  title: string;
  body: string;
  authorName?: string;
  authorEmail?: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  category?: string;
  formattedFullDate?: string;
}