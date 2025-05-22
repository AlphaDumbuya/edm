import Link from 'next/link';
import { Frown } from 'lucide-react';

export default function NotFound() {
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