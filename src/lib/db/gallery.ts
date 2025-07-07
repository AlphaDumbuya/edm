import prisma from './prisma';

export async function getGalleryMedia() {
  return prisma.media.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getGalleryPhotos() {
  // Fetch all media with type 'photo', visible only
  return prisma.media.findMany({
    where: { type: 'photo', NOT: { imageUrl: null }, published: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getGalleryVideos() {
  // Fetch all media with type 'video', visible only
  return prisma.media.findMany({
    where: { type: 'video', NOT: { videoUrl: null }, published: true },
    orderBy: { createdAt: 'desc' },
  });
}

// Fetch all images and videos from all tables that may contain them
export async function getAllImagesAndVideos() {
  // Fetch from Media table
  const media = await prisma.media.findMany({ orderBy: { createdAt: 'desc' } });

  // Fetch from Event table (imageUrl)
  const events = await prisma.event.findMany({
    where: { imageUrl: { not: null } },
    select: { id: true, imageUrl: true, title: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  });

  // Fetch from BlogPost table (imageUrl)
  const blogPosts = await prisma.blogPost.findMany({
    where: { imageUrl: { not: null } },
    select: { id: true, imageUrl: true, title: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  });

  // Fetch from NewsArticle table (imageUrl)
  const newsArticles = await prisma.newsArticle.findMany({
    where: { imageUrl: { not: null } },
    select: { id: true, imageUrl: true, title: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  });

  // Fetch from News table (coverImage as JSON)
  const news = await prisma.news.findMany({
    where: { coverImage: { not: undefined } },
    select: { id: true, coverImage: true, title: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  });

  return { media, events, blogPosts, newsArticles, news };
}
