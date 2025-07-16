"use client";
import React from "react";
import SuperAdminWelcomeMessage from "./SuperAdminWelcomeMessage";

export default function DashboardHeaderClient({ name }: { name: string }) {
  return (
    <div>
      <SuperAdminWelcomeMessage name={name} />
    </div>
  );
}
