-- AlterTable for EventRegistration
ALTER TABLE "EventRegistration" ADD COLUMN "reminderSentAt" TIMESTAMP(3);
ALTER TABLE "EventRegistration" ADD COLUMN "lastReminderType" TEXT;
