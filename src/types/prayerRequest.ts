export interface PrayerRequestData {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  request: string;
  isPublic: boolean;
  status: string;
  category?: string;
  formattedFullDate: string;
}