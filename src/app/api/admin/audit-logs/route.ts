// DEBUG: GET /api/admin/audit-logs?raw=1 will run a raw SQL query and return all rows from the AuditLog table
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { Prisma } from '@prisma/client';
import { cookies } from 'next/headers';

// GET /api/admin/audit-logs
export async function GET(req: NextRequest) {
  try {
    // Print all cookies received for debugging
    const allCookies = await cookies();
    console.log("[DEBUG] All cookies:", allCookies);
    // Try to get token from NextAuth first
    let token = await getToken({ req });
    console.log("[DEBUG] Token from getToken:", token);
    // If token is null, try to decode the 'session' cookie manually
    if (!token) {
      const sessionCookie = allCookies.get('session');
      if (sessionCookie) {
        try {
          const jwt = sessionCookie.value;
          // Decode JWT (without verification)
          const base64Payload = jwt.split('.')[1];
          const payload = JSON.parse(Buffer.from(base64Payload, 'base64').toString());
          token = payload;
          console.log("[DEBUG] Decoded session cookie payload:", payload);
        } catch (err) {
          console.error("[DEBUG] Failed to decode session cookie:", err);
        }
      }
    }
    if (!token || typeof token.role !== 'string' || !["SUPER_ADMIN", "ADMIN"].includes(token.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Always use raw SQL query for audit logs
    let rawLogs = await prisma.$queryRawUnsafe('SELECT * FROM "AuditLog" ORDER BY "timestamp" DESC') as any[];
    console.log("[DEBUG] Raw audit logs from AuditLog table:", rawLogs);
    // If no logs found, try alternative table names
    if (!rawLogs || rawLogs.length === 0) {
      rawLogs = await prisma.$queryRawUnsafe('SELECT * FROM auditlog ORDER BY timestamp DESC') as any[];
      console.log("[DEBUG] Raw audit logs from auditlog table:", rawLogs);
    }
    if (!rawLogs || rawLogs.length === 0) {
      rawLogs = await prisma.$queryRawUnsafe('SELECT * FROM audit_log ORDER BY timestamp DESC') as any[];
      console.log("[DEBUG] Raw audit logs from audit_log table:", rawLogs);
    }
    // Shape the result for frontend compatibility
    const shapedLogs = rawLogs.map(log => ({
      id: log.id,
      user: log.userId ? { email: log.userId } : null, // fallback, since raw SQL doesn't join user
      entityType: log.entityType,
      entityId: log.entityId,
      action: log.action,
      timestamp: log.timestamp,
      details: log.details,
    }));
    console.log("[DEBUG] Shaped audit logs:", shapedLogs);
    return NextResponse.json({ auditLogs: shapedLogs });
  } catch (error) {
    console.error("[API] /api/admin/audit-logs error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
