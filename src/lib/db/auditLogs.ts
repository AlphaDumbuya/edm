import prisma from './prisma';
import { Prisma } from '@prisma/client';

export interface CreateAuditLogEntryParams {
  userId?: string | null; // Now optional and nullable
  action: string;
  entityType: string;
  entityId?: string;
  details?: any; // Use 'any' or define a more specific type if needed
}

export async function createAuditLogEntry({
  userId,
  action,
  entityType,
  entityId,
  details,
}: CreateAuditLogEntryParams) {
  try {
    // Only include fields that are defined and valid for UncheckedCreateInput
    const data: Prisma.AuditLogUncheckedCreateInput = {
      action,
      entityType,
      details,
      userId: (userId && userId !== 'system') ? userId : null,
      ...(entityId ? { entityId } : {}),
      // Do NOT set timestamp, let Prisma default
    };
    // Defensive: remove 'user' property if present (shouldn't be, but just in case)
    delete (data as any).user;
    await prisma.auditLog.create({ data });
  } catch (error) {
    console.error('Error creating audit log entry:', error);
    // Depending on your needs, you might want to throw the error
    // or handle it silently to avoid interrupting the main action.
  }
}
