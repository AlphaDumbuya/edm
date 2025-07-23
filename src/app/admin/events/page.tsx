// EventsPage.tsx (or .jsx depending on your setup)

'use client';
import { Suspense } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import RestrictedButton from '@/components/admin/RestrictedButton';

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Keep imports for table components if needed elsewhere or remove if not

import { type Event } from "@prisma/client"; // Keep type import if needed

import EventsClientPage from "./EventsClientPage";


// Wrap the client component with Suspense
export default function EventsPageWrapper() {
  // EventsClientPage will handle its own data fetching based on search params
  return <Suspense fallback={<div>Loading...</div>}><EventsClientPage /></Suspense>;
}