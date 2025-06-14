'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/layout/footer';

const FooterVisibility = () => {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null; // Don't render footer on admin pages
  }

  return <Footer />;
};

export default FooterVisibility;