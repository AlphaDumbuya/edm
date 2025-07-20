-- DropForeignKey
ALTER TABLE "AuditLog" DROP CONSTRAINT "AuditLog_userId_fkey";

-- DropForeignKey
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_authorId_fkey";

-- DropForeignKey
ALTER TABLE "EventRegistration" DROP CONSTRAINT "EventRegistration_eventId_fkey";

-- DropForeignKey
ALTER TABLE "NewsArticle" DROP CONSTRAINT "NewsArticle_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "PrayerLog" DROP CONSTRAINT "PrayerLog_prayerRequestId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "cancelled" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "EventRegistration_reminderSentAt_idx" ON "EventRegistration"("reminderSentAt");
