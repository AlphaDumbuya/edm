import DashboardHeaderClient from '@/components/admin/DashboardHeaderClient';
// Trigger redeploy: July 6, 2025
// File is clean and conflict-free

import React from 'react';
import Link from 'next/link';
import { getAllBlogPosts, getBlogPostCount } from '@/lib/db/blogPosts';
import { getDonationCount, getAllDonations } from '@/lib/db/donations';
import { getUserCount, getAllUsers } from '@/lib/db/users';
import { getPrayerRequestCount, getAllPrayerRequests } from '@/lib/db/prayerRequests';
import AdminNotificationBell, { Notification } from '@/components/admin/AdminNotificationBell';
import AdminDashboardNotificationsClient from '@/components/admin/AdminDashboardNotificationsClient';
import { getRecentAdminNotifications } from '@/lib/db/adminNotifications';
import { getAllEvents } from '@/lib/db/events';
import { getEventRegistrationsForEvent } from '@/lib/db/eventRegistrations';
import { useSession } from 'next-auth/react';
import SuperAdminMonthlyDonationsCard from '@/components/admin/SuperAdminMonthlyDonationsCard';
import DashboardStatsCard from '@/components/admin/DashboardStatsCard';
import DashboardLineChart from '@/components/admin/DashboardLineChart';
import DashboardBarChart from '@/components/admin/DashboardBarChart';
import DashboardPieChart from '@/components/admin/DashboardPieChart';
import DashboardActivityFeed from '@/components/admin/DashboardActivityFeed';
import DashboardSystemAlerts from '@/components/admin/DashboardSystemAlerts';
import AdminDashboardOverlay from '@/components/admin/AdminDashboardOverlay';
import AdminDashboardClientLayout from '@/components/admin/AdminDashboardClientLayout';
import SuperAdminWelcomeMessage from '@/components/admin/SuperAdminWelcomeMessage';

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

  // Remove the old notifications array and only use audit logs for notifications
  // const notifications: Notification[] = [];
  // if (latestDonation) notifications.push({ ... });
  // if (latestUser) notifications.push({ ... });
  // if (latestPrayer) notifications.push({ ... });

  // Fetch all relevant admin notifications (from audit logs)
  const allNotifications: Notification[] = await getRecentAdminNotifications(10);

  // Fetch all events and their participant counts
  const eventsRes = await getAllEvents({ orderBy: { date: 'desc' } });
  const events = eventsRes.events;

  // For each event, get the participant count
  const eventParticipantCounts = await Promise.all(
    events.map(async (event) => {
      const registrations = await import('@/lib/db/eventRegistrations').then(m => m.getEventRegistrationsForEvent(event.id));
      return {
        event,
        count: registrations.length,
      };
    })
  );

  // Calculate total donations for the current month
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  const monthlyDonationsRes = await getAllDonations({
    orderBy: { createdAt: 'desc' },
    limit: 1000, // adjust as needed
  });
  const totalMonthlyDonations = monthlyDonationsRes.donations
    .filter(d => new Date(d.date) >= startOfMonth && new Date(d.date) <= endOfMonth)
    .reduce((sum, d) => sum + d.amount, 0);

  const monthName = now.toLocaleString('default', { month: 'long', year: 'numeric' });

  const quickLinks: QuickLink[] = [
    { id: 1, name: 'Manage Donations', href: '/admin/donations' },
    { id: 2, name: 'Manage Users', href: '/admin/users' },
    { id: 3, name: 'Manage Content', href: '/admin/content' },
  ];

  // Generate real user growth data (users registered per month for the past 12 months)
  const userGrowthMap = new Map<string, number>();
  const allUsersRes = await getAllUsers({ orderBy: { createdAt: 'asc' }, limit: 10000 });
  allUsersRes.users.forEach((user: any) => {
    const date = user.createdAt ? new Date(user.createdAt) : null;
    if (date) {
      const key = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      userGrowthMap.set(key, (userGrowthMap.get(key) || 0) + 1);
    }
  });
  const userGrowthData = Array.from(userGrowthMap.entries()).map(([name, value]) => ({ name, value }));

  // Generate real monthly donations data (sum of donations per month for the past 12 months)
  const monthlyDonationsMap = new Map<string, number>();
  const allDonationsRes = await getAllDonations({ orderBy: { createdAt: 'asc' }, limit: 10000 });
  allDonationsRes.donations.forEach((donation: any) => {
    const date = donation.createdAt ? new Date(donation.createdAt) : null;
    if (date) {
      const key = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      monthlyDonationsMap.set(key, (monthlyDonationsMap.get(key) || 0) + (donation.amount || 0));
    }
  });
  const monthlyDonationsData = Array.from(monthlyDonationsMap.entries()).map(([name, value]) => ({ name, value }));
  // Generate real traffic data by location (user registrations by country)
  const countryMap = new Map<string, number>();
  allUsersRes.users.forEach((user: any) => {
    const country = user.country || 'Other';
    countryMap.set(country, (countryMap.get(country) || 0) + 1);
  });
  const totalUsersForTraffic = Array.from(countryMap.values()).reduce((a, b) => a + b, 0);
  const trafficData = Array.from(countryMap.entries()).map(([name, value]) => ({
    name,
    value: totalUsersForTraffic ? Math.round((value / totalUsersForTraffic) * 1000) / 10 : 0 // percent, 1 decimal
  }));
  // Build a custom activity feed: only show the latest donation, user, prayer request, and event participant counts
  const activityFeed = [];
  if (latestDonation) {
    activityFeed.push({
      id: latestDonation.id,
      message: `New donation received from ${latestDonation.donorName || 'Anonymous'} ($${latestDonation.amount})`,
      createdAt: typeof latestDonation.createdAt === 'string' ? latestDonation.createdAt : new Date(latestDonation.createdAt).toISOString(),
    });
  }
  if (latestUser) {
    activityFeed.push({
      id: latestUser.id,
      message: `New user registered: ${latestUser.name || latestUser.email}`,
      createdAt: new Date().toISOString(), // fallback to now since no timestamp available
    });
  }
  if (latestPrayer) {
    activityFeed.push({
      id: latestPrayer.id,
      message: `New prayer request by ${latestPrayer.authorName || 'Anonymous'}`,
      createdAt: typeof latestPrayer.createdAt === 'string' ? latestPrayer.createdAt : new Date(latestPrayer.createdAt).toISOString(),
    });
  }
  // Show event participant counts (latest event only)
  if (eventParticipantCounts.length > 0) {
    const latestEvent = eventParticipantCounts[0];
    activityFeed.push({
      id: latestEvent.event.id,
      message: `${latestEvent.event.title} has ${latestEvent.count} participant${latestEvent.count === 1 ? '' : 's'}`,
      createdAt: typeof latestEvent.event.date === 'string' ? latestEvent.event.date : new Date(latestEvent.event.date).toISOString(),
    });
  }
  // System alerts: none for now
  const systemAlerts: any[] = [];

  // Get the authenticated user's name from the session
  let userName = 'Super Admin';
  if (typeof window !== 'undefined') {
    try {
      const session = window.sessionStorage.getItem('next-auth.session-token');
      if (session) {
        const payload = JSON.parse(atob(session.split('.')[1]));
        userName = payload.name || payload.email || userName;
      }
    } catch {}
  }
  return (
    <AdminDashboardClientLayout name={userName}>
      <div className="mx-auto mt-0 bg-gray-900 min-h-screen p-2 sm:p-4 md:p-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 w-full">
          <DashboardStatsCard value={totalMonthlyDonations} label={`Total Donations (${monthName})`} icon={<span className="text-4xl font-bold text-yellow-400">$</span>} className="w-full" />
          <DashboardStatsCard value={totalUsers} label="Total Users" icon={<svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 0 0-3-3.87M9 20h6M3 20h5v-2a4 4 0 0 1 3-3.87M16 3.13a4 4 0 0 1 0 7.75M8 3.13a4 4 0 0 0 0 7.75"/></svg>} className="w-full" />
          <DashboardStatsCard value={events.length} label="Active Events" icon={<svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"/></svg>} className="w-full" />
          <DashboardStatsCard value={totalDonations} label="Total Transactions" icon={<svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 0C7.582 4 4 7.582 4 12c0 4.418 3.582 8 8 8s8-3.582 8-8c0-4.418-3.582-8-8-8z"/></svg>} className="w-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 w-full">
          <DashboardLineChart data={userGrowthData} label="Total Users" />
          <DashboardBarChart data={monthlyDonationsData} label="Total Donations" />
          <DashboardPieChart data={trafficData} label="Traffic by Location" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 w-full">
          <DashboardActivityFeed items={activityFeed} />
          <DashboardSystemAlerts items={systemAlerts} />
        </div>
      </div>
    </AdminDashboardClientLayout>
  );
}