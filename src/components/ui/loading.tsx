'use client';

import React from 'react';

interface LoadingProps {
  message?: string;
  className?: string;
}

export function Loading({ message = 'Loading...', className = '' }: LoadingProps) {
  return (
    <div className={`flex items-center justify-center h-[400px] bg-gray-100 rounded-lg ${className}`}>
      <div className="text-center">
        <p className="text-gray-600">{message}</p>
        <div className="mt-2 w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

export function ErrorMessage({ message, className = '' }: { message: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center h-[400px] bg-gray-100 rounded-lg ${className}`}>
      <div className="text-center text-red-500">
        <p>Error</p>
        <p className="text-sm mt-2">{message}</p>
      </div>
    </div>
  );
}
