'use server';

import { deleteUser } from '@/lib/db/users'; // Assuming you have a deleteUser function in your users data access file
import { createAuditLogEntry } from '@/lib/db/auditLogs'; // Assuming you have audit logging

export async function deleteUserAction(userId: string) {
  try {
    // Call your data access function to delete the user
    await deleteUser(userId);

    // Optional: Create audit log entry
    // Replace 'YOUR_USER_ID' with logic to get the current user's ID
    // You'll need to implement a way to get the ID of the user performing the action
    await createAuditLogEntry({
      userId: 'YOUR_USER_ID', // <-- Replace with actual user ID
      action: 'Deleted User',
      entityType: 'User',
      entityId: userId,
    });

    console.log(`User with ID ${userId} deleted successfully.`);

    // You might want to return a success status or object here
    // The UserManagementPage component currently reloads the window after deletion,
    // but you could return a status here and handle it on the client side instead.
    return { success: true };

  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);

    // Handle error appropriately
    // You might want to return an error status or object here
    throw new Error(`Failed to delete user with ID ${userId}.`);
    // Or return { error: `Failed to delete user with ID ${userId}.` };
  }
}