/*
  Warnings:

  - You are about to drop the column `status` on the `PrayerRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PrayerRequest" DROP COLUMN "status",
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT true;
