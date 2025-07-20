'use client';

import Link from 'next/link';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function BlogPagination({ currentPage, totalPages }: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <Link href={`/blog?page=${currentPage - 1}`} passHref>
              <PaginationPrevious />
            </Link>
          </PaginationItem>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <PaginationItem key={pageNum}>
            <Link 
              href={`/blog?page=${pageNum}`}
              className={`px-4 py-2 text-sm font-medium ${
                pageNum === currentPage
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              {pageNum}
            </Link>
          </PaginationItem>
        ))}
        {currentPage < totalPages && (
          <PaginationItem>
            <Link href={`/blog?page=${currentPage + 1}`} passHref>
              <PaginationNext />
            </Link>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
