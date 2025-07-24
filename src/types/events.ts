export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string | null;
  isVirtual: boolean;
  onlineLink?: string | null;
}
