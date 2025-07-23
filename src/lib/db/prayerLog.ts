import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function logPrayer({
  prayerRequestId,
  prayedByUserId,
  prayedByIp,
  prayerText,
}: {
  prayerRequestId: string;
  prayedByUserId?: string | null;
  prayedByIp?: string | null;
  prayerText?: string | null;
}) {
  return prisma.prayerLog.create({
    data: {
      prayerRequestId,
      prayedByUserId,
      prayedByIp,
      prayerText,
    },
  });
}
