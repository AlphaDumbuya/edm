'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { GoHome, GoPerson, GoBook, GoCalendar, GoHeart, GoCreditCard } from 'react-icons/go';

const AdminSidebar: React.FC<{ onLinkClick?: () => void }> = ({ onLinkClick }) => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/', icon: GoHome },
    { name: 'Dashboard', href: '/admin', icon: GoHome },
    {
      name: 'Users',
      href: '/admin/users',
      icon: GoPerson,
    },
    {
      name: 'Content',
      href: '/admin/content',
      icon: GoBook,
      nested: [
        { name: 'Blog', href: '/admin/content/blog' },
        { name: 'News', href: '/admin/content/news' },
      ],
    },
    { name: 'Events', href: '/admin/events', icon: GoCalendar },
    { name: 'Prayer Requests', href: '/admin/prayer-requests', icon: GoHeart },
    { name: 'Donations', href: '/admin/donations', icon: GoCreditCard },
    {
      name: 'Gallery',
      href: '/admin/gallery',
      icon: GoBook, // You can replace with a more relevant icon
    },
    {
      name: 'Audit Log',
      href: '/admin/audit-logs',
      icon: GoBook, // Using GoBook as a placeholder
    },
  ];

  return (
    <nav className="flex flex-col gap-2 w-full h-full overflow-y-auto" aria-label="Admin navigation">
      <div className="text-2xl font-bold mb-6 px-4 pt-4">Admin Dashboard</div>
      <div>
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              {item.nested ? (
                <>
                  <div className="flex items-center py-2 px-4 rounded w-full select-none whitespace-nowrap text-base font-normal text-gray-500 cursor-default">
                    {item.icon && React.createElement(item.icon, { className: 'mr-2 w-5 h-5 flex-shrink-0' })}
                    <span className="truncate">{item.name}</span>
                  </div>
                  <ul className="ml-4 mt-1">
                    {item.nested.map((nestedItem) => (
                      <li key={nestedItem.name} className="mb-1">
                        <Link
                          href={nestedItem.href}
                          className={`block py-1 px-3 text-sm rounded cursor-pointer transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 whitespace-nowrap truncate
                            ${(pathname ?? '').startsWith(nestedItem.href) ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white'}`}
                          onClick={onLinkClick}
                        >
                          {nestedItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center py-2 px-4 rounded transition-colors duration-150 w-full cursor-pointer select-none whitespace-nowrap text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70
                    ${pathname === item.href ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white'}`}
                  onClick={onLinkClick}
                >
                  {item.icon && React.createElement(item.icon, { className: 'mr-2 w-5 h-5 flex-shrink-0' })}
                  <span className="truncate">{item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default AdminSidebar;