'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { GoHome, GoPerson, GoBook, GoCalendar, GoHeart, GoCreditCard } from 'react-icons/go';

const AdminSidebar: React.FC = () => {
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
      name: 'Audit Log',
      href: '/admin/audit-logs',
 icon: GoBook, // Using GoBook as a placeholder, consider a more relevant icon if available
    },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-gray-200 p-4 h-screen flex flex-col shadow-lg">
      <div className="text-2xl font-bold mb-6">Admin Dashboard</div>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link href={item.href} passHref legacyBehavior>
                <div
                  className={`flex items-center py-2 px-4 rounded ${
                    pathname === item.href ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item.icon && React.createElement(item.icon, { className: 'mr-2' })}
                  {item.name}
                </div>
              </Link>
              {item.nested && (
                <ul className="ml-4 mt-1">
                  {item.nested.map((nestedItem) => (
                    <li key={nestedItem.name} className="mb-1 text-gray-400">
                      <Link href={nestedItem.href} passHref legacyBehavior>
                        <div
                          // Add padding to nested items for visual separation
                          className={`block py-1 px-3 text-sm rounded ${
                            pathname.startsWith(nestedItem.href)
                              ? 'bg-gray-700 text-white'
                              : 'hover:bg-gray-700 hover:text-white'
                          }`}
                        >
                          {nestedItem.name}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;