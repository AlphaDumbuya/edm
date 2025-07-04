// src/types/my-types.ts
// src/types/my-types.ts
import { Prisma } from '@prisma/client';

export type FileUploadThing = {
  key: string;
  url: string;
  // Add other relevant fields from your UploadThing metadata if needed
};

export type NewsExt = {
  slug: any;
  id: string;
  title: string;
  content: string;
  author: string;
  published: boolean;
  createdAt: Date; // Or string, depending on how you handle dates
  coverImage: FileUploadThing | null;
  // Add other fields from your News model if they exist
};