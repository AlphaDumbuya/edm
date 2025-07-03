'use server';

import { createDonation, deleteDonation } from "@/lib/db/donations";
import { createAuditLogEntry } from '@/lib/db/auditLogs';
import { getCurrentUserId } from '@/lib/auth/session';

export async function createDonationAction(formData: FormData) {
  const donorName = formData.get('donorName') as string | null;
  const donorEmail = formData.get('donorEmail') as string | null;
  const amountString = formData.get('amount') as string;
  const paymentMethod = formData.get('paymentMethod') as string;
  const campaign = formData.get('campaign') as string | null;

  const amount = parseFloat(amountString);

  if (isNaN(amount)) {
    console.error('Invalid amount provided');
    return { error: 'Invalid amount provided' };
  }

  try {
    const userId = await getCurrentUserId();
    const newDonation = await createDonation({
      donorName: donorName || undefined,
      donorEmail: donorEmail || undefined,
      amount,
      paymentMethod,
      campaign: campaign || undefined,
    });
    console.log('Donation created:', newDonation);

    await createAuditLogEntry({
      userId: userId || 'SYSTEM',
      action: 'Created Donation',
      entityType: 'Donation',
      entityId: newDonation.id,
      details: { amount: newDonation.amount, paymentMethod: newDonation.paymentMethod },
    });
    return { success: true, donation: newDonation };
  } catch (error) {
    console.error('Error creating donation:', error);
    return { error: 'Failed to create donation' };
  }
}

export async function deleteDonationAction(id: string) {
  try {
    await deleteDonation(id);

    const userId = await getCurrentUserId();
    // TODO: Handle case where userId is null or undefined
    await createAuditLogEntry({
      userId: userId || 'SYSTEM',
      action: 'Deleted Donation',
      entityType: 'Donation',
    });
    console.log(`Donation with ID ${id} deleted`);
    return { success: true };
  } catch (error) {
    console.error(`Error deleting donation with ID ${id}:`, error);
    return { error: 'Failed to delete donation' };
  }
}