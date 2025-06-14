'use server';

import { createDonation, deleteDonation } from "@/lib/db/donations";
import { createAuditLogEntry } from '@/lib/db/auditLogs';

export async function createDonationAction(formData: FormData) {
  const donorName = formData.get('donorName') as string | null;
  const donorEmail = formData.get('donorEmail') as string | null;
  const amountString = formData.get('amount') as string;
  const paymentMethod = formData.get('paymentMethod') as string;
  const campaign = formData.get('campaign') as string | null;

  const amount = parseFloat(amountString);

  if (isNaN(amount)) {
    console.error('Invalid amount provided');
    // You might want to return an error or throw an exception here
    return { error: 'Invalid amount provided' };
  }

  try {
    const newDonation = await createDonation({
      donorName,
      donorEmail,
      amount,
      paymentMethod,
      campaign,
    });
    console.log('Donation created:', newDonation);

    // TODO: Replace 'YOUR_USER_ID' with actual logic to get the current user's ID
    await createAuditLogEntry({
      userId: 'YOUR_USER_ID',
      action: 'Created Donation',
      entityType: 'Donation',
      entityId: newDonation.id,
      details: { amount: newDonation.amount, paymentMethod: newDonation.paymentMethod },
    });
    // You might want to return a success indicator or the created object
    return { success: true, donation: newDonation };
  } catch (error) {
    console.error('Error creating donation:', error);
    // You might want to return an error or throw an exception here
    return { error: 'Failed to create donation' };
  }
}

export async function deleteDonationAction(id: string) {
  try {
    await deleteDonation(id);

    // TODO: Replace 'YOUR_USER_ID' with actual logic to get the current user's ID
    await createAuditLogEntry({
      userId: 'YOUR_USER_ID',
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