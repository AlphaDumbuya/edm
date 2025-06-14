import prisma from './prisma';

export interface CreateAuditLogEntryParams {
  userId: string;
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
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        entityType,
        entityId,
        details,
      },
    });
  } catch (error) {
    console.error('Error creating audit log entry:', error);
    // Depending on your needs, you might want to throw the error
    // or handle it silently to avoid interrupting the main action.
  }
}
