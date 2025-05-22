'use client';

import Link from 'next/link';
import { Frown } from 'lucide-react';
import { Suspense } from 'react';

function NotFoundContent() {
  // If you were using useSearchParams(), it would go here
  // const searchParams = useSearchParams();
  return ( 
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center">
      <Frown className="w-12 h-12 text-primary mb-4" />
      <h2 className="text-2xl font-bold mb-2">Not Found</h2>
      <p className="text-muted-foreground mb-6">Could not find the requested resource.</p>
      <Link href="/" className="text-primary hover:underline">
        Return Home
      </Link>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  );
}