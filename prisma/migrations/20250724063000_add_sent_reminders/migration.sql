-- CreateSentReminders
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "SentReminder" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "eventId" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SentReminder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SentReminder" ADD CONSTRAINT "SentReminder_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateIndex
CREATE INDEX "SentReminder_eventId_type_idx" ON "SentReminder"("eventId", "type");
