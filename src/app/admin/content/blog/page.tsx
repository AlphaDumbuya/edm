'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
// Import the server action
import Link from "next/link";
import { useState, useEffect, use, Suspense } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { hasRole } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import React from "react";

function BlogContent() {
  // Minimal test: return a simple div
  return <div>Test</div>;
}

export default function BlogManagementPage() {
  return <React.Fragment><BlogContent /></React.Fragment>;
}
