"use client";
export const dynamic = 'force-dynamic'

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
      <p className="text-muted-foreground text-center mb-8">
        We couldn&apos;t find the page you were looking for.
      </p>
      <Link href="/" className="inline-flex">
        <Button variant="default" size="lg">
          Return Home
        </Button>
      </Link>
    </div>
  );
}