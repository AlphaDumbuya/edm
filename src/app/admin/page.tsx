import React from 'react';
import Link from 'next/link';

interface OverviewData {
  totalDonations: string;
  totalUsers: string;
  recentPrayerRequests: string;
}

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
  // Placeholder data - replace with actual data fetching in a real application
  const overviewData: OverviewData = { totalDonations: '$10,500', totalUsers: '150', recentPrayerRequests: '25' };

  const recentActivity: Activity[] = [
    { id: 1, description: 'New donation received from John Doe' },
    { id: 2, description: 'User Jane Smith registered' },
    { id: 3, description: 'Prayer request added by a user' },
  ];

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
              <p className="text-2xl font-bold text-blue-600">{overviewData.totalDonations}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-medium">Total Users</h3>
              <p className="text-2xl font-bold text-green-600">{overviewData.totalUsers}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-medium">Recent Prayer Requests</h3>
              <p className="text-2xl font-bold text-purple-600">{overviewData.recentPrayerRequests}</p>
            </div>
          </div>
        </div>

        {/* Recent Activity Section (Placeholder) */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-3">
            {recentActivity.map((activity) => (
              <li key={activity.id} className="mb-2 last:mb-0">
                <div className="text-sm text-gray-700">
                  {activity.description}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Another Placeholder Section (Optional) */}
        {/* You can add more sections here as needed */}
        {/* <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Another Section</h2>
          <p>Content for another section...</p>
        </div> */}

        {/* Quick Links Section (Placeholder) */}
        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul>
            {quickLinks.map((link) => (
              <li key={link.id} className="mb-2 last:mb-0">
                {/* Using Link component for Next.js navigation */}
                <Link href={link.href} className="text-blue-600 hover:underline" legacyBehavior>
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