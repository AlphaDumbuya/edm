import React from 'react';
import Link from 'next/link';
import { getAllBlogPosts, getBlogPostCount } from '@/lib/db/blogPosts';
import { getDonationCount, getAllDonations } from '@/lib/db/donations';
import { getUserCount, getAllUsers } from '@/lib/db/users';
import { getPrayerRequestCount, getAllPrayerRequests } from '@/lib/db/prayerRequests';

interface Activity {
  id: number;
  description: string;
}

interface QuickLink {
  id: number;
  name: string;
  href: string;
}

export default async function AdminDashboardPage() {
  // Fetch real counts
  const [totalDonations, totalUsers, recentPrayerRequests] = await Promise.all([
    getDonationCount(),
    getUserCount(),
    getPrayerRequestCount(),
  ]);
  const totalBlogPosts = await getBlogPostCount();

  // Fetch recent activity
  const [donationsRes, usersRes, prayerRes] = await Promise.all([
    getAllDonations({ limit: 1, orderBy: { createdAt: 'desc' } }),
    getAllUsers({ limit: 1, orderBy: { createdAt: 'desc' } }),
    getAllPrayerRequests({ limit: 1, orderBy: { createdAt: 'desc' } }),
  ]);
  const latestDonation = donationsRes.donations[0];
  const latestUser = usersRes.users[0];
  const latestPrayer = prayerRes.prayerRequests[0];

  const quickLinks: QuickLink[] = [
    { id: 1, name: 'Manage Donations', href: '/admin/donations' },
    { id: 2, name: 'Manage Users', href: '/admin/users' },
    { id: 3, name: 'Manage Content', href: '/admin/content' },
  ];

  return (
    <div className="mx-auto mt-0"> {/* Added mt-0 to remove top margin */}
      {/* Responsive Grid Layout for Dashboard Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Overview Section (Placeholder) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-medium">Total Donations</h3>
              <p className="text-2xl font-bold text-blue-600">{totalDonations}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-medium">Total Users</h3>
              <p className="text-2xl font-bold text-green-600">{totalUsers}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-medium">Recent Prayer Requests</h3>
              <p className="text-2xl font-bold text-purple-600">{recentPrayerRequests}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-medium">Total Blog Posts</h3>
              <p className="text-2xl font-bold text-indigo-600">{totalBlogPosts}</p>
            </div>
          </div>
        </div>

        {/* Recent Activity Section (Placeholder) */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-2 text-sm">
            {latestDonation && (
              <li>New donation received from {latestDonation.donorName || 'Anonymous'} (${latestDonation.amount})</li>
            )}
            {latestUser && (
              <li>User {latestUser.name || latestUser.email} registered</li>
            )}
            {latestPrayer && (
              <li>Prayer request added by {latestPrayer.authorName || 'a user'}</li>
            )}
            {!latestDonation && !latestUser && !latestPrayer && (
              <li className="text-muted-foreground">No recent activity.</li>
            )}
          </ul>
        </div>

        {/* Quick Links Section (Placeholder) */}
        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul>
            {quickLinks.map((link) => (
              <li key={link.id} className="mb-2 last:mb-0">
                <Link href={link.href} className="text-blue-600 hover:underline">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}