import { redirect } from 'next/navigation';

export default function AdminBlogLayoutRedirect({ children }: { children: React.ReactNode }) {
  if (typeof window === 'undefined') {
    // On the server, check the path and redirect if needed
    const pathname = require('next/navigation').usePathname?.() || '';
    if (pathname === '/admin/blog') {
      redirect('/admin/content/blog');
    }
  }
  return children;
}
