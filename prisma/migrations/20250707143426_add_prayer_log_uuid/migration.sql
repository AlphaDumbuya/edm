-- CreateTable
CREATE TABLE "PrayerLog" (
    "id" TEXT NOT NULL,
    "prayerRequestId" UUID NOT NULL,
    "prayedByUserId" TEXT,
    "prayedByIp" TEXT,
    "prayerText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PrayerLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PrayerLog" ADD CONSTRAINT "PrayerLog_prayerRequestId_fkey" FOREIGN KEY ("prayerRequestId") REFERENCES "PrayerRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
