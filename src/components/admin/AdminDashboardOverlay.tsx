"use client";
import React from "react";
import DashboardHeaderClient from "./DashboardHeaderClient";

export default function AdminDashboardOverlay({ name }: { name: string }) {
  return <DashboardHeaderClient name={name} />;
}
