import prisma from "@/lib/db/prisma";

export async function cleanupOldContent() {
  try {
    // Get dates for cleanup thresholds
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    // Cleanup old testimonials (older than 14 days)
    const deletedTestimonials = await prisma.testimonial.deleteMany({
      where: {
        createdAt: {
          lt: fourteenDaysAgo
        }
      }
    });

    // Cleanup prayed-for prayer requests (older than 5 days and have been prayed for)
    const deletedPrayers = await prisma.prayerRequest.deleteMany({
      where: {
        createdAt: {
          lt: fiveDaysAgo
        },
        // Only delete prayer requests that have prayer logs
        prayerLogs: {
          some: {}
        }
      }
    });

    console.log(`Cleaned up ${deletedTestimonials.count} old testimonials`);
    console.log(`Cleaned up ${deletedPrayers.count} old prayer requests`);

    return {
      deletedTestimonials: deletedTestimonials.count,
      deletedPrayers: deletedPrayers.count
    };
  } catch (error) {
    console.error("Error during content cleanup:", error);
    throw error;
  }
}
