-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "isVirtual" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "onlineLink" TEXT;
