-- AlterTable
ALTER TABLE "EventRegistration" ADD COLUMN     "lastReminderType" TEXT,
ADD COLUMN     "reminderSentAt" TIMESTAMP(3);
