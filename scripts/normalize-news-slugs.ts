// scripts/normalize-news-slugs.ts
// Run with: npx tsx scripts/normalize-news-slugs.ts
import prisma from '../src/lib/db/prisma';

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function main() {
  const articles = await prisma.newsArticle.findMany();
  for (const article of articles) {
    if (!article.slug || article.slug !== slugify(article.title)) {
      const newSlug = slugify(article.title);
      // Ensure uniqueness by appending id if needed
      let uniqueSlug = newSlug;
      let i = 1;
      while (
        await prisma.newsArticle.findFirst({
          where: { slug: uniqueSlug, id: { not: article.id } },
        })
      ) {
        uniqueSlug = `${newSlug}-${i}`;
        i++;
      }
      await prisma.newsArticle.update({
        where: { id: article.id },
        data: { slug: uniqueSlug },
      });
      console.log(`Updated slug for article '${article.title}' to '${uniqueSlug}'`);
    }
  }
  console.log('All news article slugs normalized.');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
