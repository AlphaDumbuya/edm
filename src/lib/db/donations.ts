import prisma from '../db/prisma'; // Assuming your prisma client is exported from here

export async function getAllDonations(options: {
 search?: string;
 status?: string;
 paymentMethod?: string;
 offset?: number; // Corrected type for offset
 limit?: number; // Corrected type for limit
      orderBy?: { [key: string]: 'asc' | 'desc' };
    }) {
  try {
    const { search, status, paymentMethod, offset = 0, limit = 10, orderBy = { createdAt: 'desc' } } = options || {};
    const where: any = {};

    if (search) {
      where.OR = [
        { donorName: { contains: search, mode: 'insensitive' } },
        { donorEmail: { contains: search, mode: 'insensitive' } },
        { campaign: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (paymentMethod) {
      where.paymentMethod = paymentMethod;
    }

    if (status) {
      where.status = status;
    }

    const [donations, totalCount] = await Promise.all([
      prisma.donation.findMany({
        where,
        skip: offset,
        take: limit,
        orderBy,
      }),
      prisma.donation.count({
        where,
      }),
    ]);

    return { donations, totalCount };
  } catch (error) {
    console.error('Error fetching donations:', error);
    throw new Error('Failed to fetch donations.');
  }
}

export async function getDonationCount() {
  try {
    const count = await prisma.donation.count();
    return count;
  } catch (error) {
    console.error('Error getting donation count:', error);
    throw error;
  }
}
export async function getDonationById(id: string) {
  try {
    const donation = await prisma.donation.findUnique({
      where: { id },
    });
    return donation;
  } catch (error) {
    console.error(`Error fetching donation with ID ${id}:`, error);
    throw new Error(`Failed to fetch donation with ID ${id}.`);
  }
}

export async function createDonation(data: {
  donorName?: string;
  donorEmail?: string;
  amount: number;
  paymentMethod: string;
  campaign?: string;
}) {
  try {
    const newDonation = await prisma.donation.create({
      data: {
        ...data,
        // Convert amount to a format suitable for your database if needed (e.g., Decimal)
        // For simplicity, assuming float is sufficient for now.
        amount: data.amount,
      },
    });
    return newDonation;
  } catch (error: any) { // Catch the error with type 'any' to access properties
    console.error('Error creating donation:', error);
    console.error('Error message:', error.message); // Log error message
    console.error('Error stack:', error.stack); // Log error stack trace
    throw new Error('Failed to create donation.');
  }
}

export async function updateDonation(
  id: string,
  data: {
    donorName?: string;
    donorEmail?: string;
    amount?: number;
    paymentMethod?: string;
    campaign?: string;
  },
) {
  try {
    const updatedDonation = await prisma.donation.update({
      where: { id },
      data: {
        ...data,
        // Convert amount if needed
        amount: data.amount !== undefined ? data.amount : undefined,
      },
    });
    return updatedDonation;
  } catch (error) {
    console.error(`Error updating donation with ID ${id}:`, error);
    throw new Error(`Failed to update donation with ID ${id}.`);
  }
}


export async function deleteDonation(id: string) {
  try {
    await prisma.donation.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting donation with ID ${id}:`, error);
    throw new Error(`Failed to delete donation with ID ${id}.`);
  }
}