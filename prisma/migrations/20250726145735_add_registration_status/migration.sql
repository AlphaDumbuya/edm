-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('REGISTERED', 'CANCELLED');

-- AlterTable
ALTER TABLE "EventRegistration" ADD COLUMN     "status" "RegistrationStatus" NOT NULL DEFAULT 'REGISTERED';
