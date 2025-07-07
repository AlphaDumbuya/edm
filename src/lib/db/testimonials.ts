import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getApprovedTestimonials() {
  return prisma.testimonial.findMany({
    where: { approved: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createTestimonial({ name, message }: { name: string; message: string }) {
  return prisma.testimonial.create({
    data: { name, message, approved: false },
  });
}
