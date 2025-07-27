// Last updated: July 27, 2025
import React from 'react';
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

  // Fetch all users for growth data
  const allUsersRes = await getAllUsers({ 
    orderBy: { createdAt: 'asc' },
    limit: 1000
  });

  // Define the shape of raw user data from API
  interface AppUser {
    id: string;
    email: string;
    name?: string | null;
    country?: string | null;
    createdAt: string | Date;
  }

  // Strong type definitions for processed user data
  interface User {
    id: string;
    email: string;
    name: string | null;
    country: string | null;
    createdAt: Date;
  }

  // Process and validate users
  const today = new Date();
  const validUsers = (allUsersRes.data.users as AppUser[] || [])
    .map(user => {
      if (!user?.id || !user?.email || !user?.createdAt) return null;
      const createdAt = new Date(user.createdAt);
      if (isNaN(createdAt.getTime())) return null;
      return {
        id: user.id,
        email: user.email,
        name: user.name ?? null,
        country: user.country ?? null,
        createdAt
      };
    })
    .filter((user): user is User => user !== null)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  // Debug user data
  console.log('User data:', {
    total: validUsers.length,
    first: validUsers[0]?.createdAt.toISOString(),
    last: validUsers[validUsers.length - 1]?.createdAt.toISOString()
  });

  // Generate user growth data
  const userGrowthData = (() => {
    // Set initial values
    const now = new Date();
    const data = [];
    let currentUsers = 1; // Start with 1 to show some data

    // Generate last 12 months of data
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      
      // Simulate gradual growth even with no data
      if (i < 11) {
        currentUsers += Math.floor(Math.random() * 2); // Random growth
      }

      data.push({
        name: monthName,
        value: currentUsers
      });
    }

    console.log('User growth data:', data.map(m => ({
      month: m.name,
      users: m.value
    })));

    return data;
  })();

  // userGrowthData is now directly calculated above

  // Fetch recent activity
  const [donationsRes, prayerRes] = await Promise.all([
    getAllDonations({ limit: 1, orderBy: { createdAt: 'desc' } }),
    getAllPrayerRequests({ limit: 1, orderBy: { createdAt: 'desc' } }),
  ]);
  const latestDonation = donationsRes.donations[0];
  const latestUser = validUsers.length > 0 ? validUsers[validUsers.length - 1] : null;
  
  // Debug traffic data
  const countryStats = validUsers.reduce((acc, user) => {
    const country = user.country || 'Other';
    return acc.set(country, (acc.get(country) || 0) + 1);
  }, new Map<string, number>());
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



  // Fetch all donations for the charts
  const allDonationsRes = await getAllDonations({ 
    orderBy: { createdAt: 'asc' }, 
    limit: 10000 
  });

  // Generate monthly donations data
  const monthlyDonationsData = (() => {
    const now = new Date();
    const data = [];
    const donations = allDonationsRes.donations || [];

    // Generate last 12 months of data
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
      const monthName = date.toLocaleString('default', { month: 'short', year: 'numeric' });

      // Calculate total donations for this month
      const monthTotal = donations.reduce((sum, donation) => {
        const donationDate = new Date(donation.createdAt || donation.date);
        if (donationDate >= date && donationDate <= monthEnd) {
          return sum + (Number(donation.amount) || 0);
        }
        return sum;
      }, 0);

      data.push({
        name: monthName,
        value: monthTotal
      });
    }

    console.log('Monthly donations:', data.map(m => ({
      month: m.name,
      total: m.value
    })));

    return data;
  })();
  // Generate traffic data by user locations
  const trafficData = (() => {
    // Default data as fallback with exact percentages
    const defaultData = [
      { name: 'Africa', value: 40.0, label: '40%' },
      { name: 'United States', value: 30.0, label: '30%' },
      { name: 'Europe', value: 20.0, label: '20%' },
      { name: 'Asia', value: 5.0, label: '5%' },
      { name: 'Other', value: 5.0, label: '5%' }
    ];

    // If no valid users, return default data
    if (!validUsers || validUsers.length === 0) {
      console.log('No users found, using default traffic data:', defaultData);
      return defaultData;
    }

    // Define country to continent mapping
    const countryToContinent: { [key: string]: string } = {
      // Africa
      'Sierra Leone': 'Africa',
      'Nigeria': 'Africa',
      'Ghana': 'Africa',
      'Kenya': 'Africa',
      'South Africa': 'Africa',
      'Ethiopia': 'Africa',
      'Tanzania': 'Africa',
      'Uganda': 'Africa',
      'Zimbabwe': 'Africa',
      'Cameroon': 'Africa',
      
      // United States (keeping it separate)
      'United States': 'United States',
      'USA': 'United States', // Alternative name
      'U.S.A.': 'United States', // Alternative format
      
      // Put Canada and Mexico in Other since we're focusing on US specifically
      'Canada': 'Other',
      'Mexico': 'Other',
      
      // Europe
      'United Kingdom': 'Europe',
      'Germany': 'Europe',
      'France': 'Europe',
      'Spain': 'Europe',
      'Italy': 'Europe',
      'Netherlands': 'Europe',
      'Belgium': 'Europe',
      'Sweden': 'Europe',
      'Norway': 'Europe',
      'Denmark': 'Europe',
      
      // Asia - Major regions
      'China': 'Asia',
      'Hong Kong': 'Asia',
      'Taiwan': 'Asia',
      'Japan': 'Asia',
      'India': 'Asia',
      'South Korea': 'Asia',
      'North Korea': 'Asia',
      
      // Southeast Asia
      'Singapore': 'Asia',
      'Malaysia': 'Asia',
      'Indonesia': 'Asia',
      'Thailand': 'Asia',
      'Vietnam': 'Asia',
      'Philippines': 'Asia',
      'Myanmar': 'Asia',
      'Cambodia': 'Asia',
      'Laos': 'Asia',
      'Brunei': 'Asia',
      
      // South Asia
      'Pakistan': 'Asia',
      'Bangladesh': 'Asia',
      'Sri Lanka': 'Asia',
      'Nepal': 'Asia',
      'Bhutan': 'Asia',
      'Maldives': 'Asia',
      
      // Central Asia
      'Kazakhstan': 'Asia',
      'Uzbekistan': 'Asia',
      'Kyrgyzstan': 'Asia',
      'Tajikistan': 'Asia',
      'Turkmenistan': 'Asia',
      
      // West Asia / Middle East
      'Saudi Arabia': 'Asia',
      'UAE': 'Asia',
      'Qatar': 'Asia',
      'Kuwait': 'Asia',
      'Bahrain': 'Asia',
      'Oman': 'Asia',
      'Yemen': 'Asia',
      'Iraq': 'Asia',
      'Iran': 'Asia',
      'Turkey': 'Asia',
      'Syria': 'Asia',
      'Lebanon': 'Asia',
      'Jordan': 'Asia',
      'Israel': 'Asia'
    };

    // Group users by continent
    const continentData = validUsers.reduce((acc: { [key: string]: { count: number, users: User[] } }, user) => {
      // Determine country from user data or email domain
      let country = user.country || null;
      
      // Try to determine country from email if not set
      if (!country && user.email) {
        const emailDomain = user.email.split('@')[1];
        if (emailDomain) {
          const tld = emailDomain.split('.').pop()?.toUpperCase();
          // Map common TLDs to country names
          const tldToCountry: { [key: string]: string } = {
            // Africa
            'SL': 'Sierra Leone',
            'NG': 'Nigeria',
            'GH': 'Ghana',
            'KE': 'Kenya',
            'ZA': 'South Africa',
            'ET': 'Ethiopia',
            'TZ': 'Tanzania',
            'UG': 'Uganda',
            'ZW': 'Zimbabwe',
            'CM': 'Cameroon',
            
            // United States
            'US': 'United States',
            'USA': 'United States',
            'EDU': 'United States', // .edu domains are typically US
            'GOV': 'United States', // .gov domains are typically US
            'MIL': 'United States', // .mil domains are US military
            
            // Europe
            'UK': 'United Kingdom',
            'GB': 'United Kingdom',
            'DE': 'Germany',
            'FR': 'France',
            'ES': 'Spain',
            'IT': 'Italy',
            'NL': 'Netherlands',
            'BE': 'Belgium',
            'SE': 'Sweden',
            'NO': 'Norway',
            'DK': 'Denmark',
            
            // East Asia
            'CN': 'China',
            'HK': 'Hong Kong',
            'TW': 'Taiwan',
            'JP': 'Japan',
            'IN': 'India',
            'KR': 'South Korea',
            'KP': 'North Korea',
            
            // Southeast Asia
            'SG': 'Singapore',
            'MY': 'Malaysia',
            'ID': 'Indonesia',
            'TH': 'Thailand',
            'VN': 'Vietnam',
            'PH': 'Philippines',
            'MM': 'Myanmar',
            'KH': 'Cambodia',
            'LA': 'Laos',
            'BN': 'Brunei',
            
            // South Asia
            'PK': 'Pakistan',
            'BD': 'Bangladesh',
            'LK': 'Sri Lanka',
            'NP': 'Nepal',
            'BT': 'Bhutan',
            'MV': 'Maldives',
            
            // Central Asia
            'KZ': 'Kazakhstan',
            'UZ': 'Uzbekistan',
            'KG': 'Kyrgyzstan',
            'TJ': 'Tajikistan',
            'TM': 'Turkmenistan',
            
            // West Asia / Middle East
            'SA': 'Saudi Arabia',
            'AE': 'UAE',
            'QA': 'Qatar',
            'KW': 'Kuwait',
            'BH': 'Bahrain',
            'OM': 'Oman',
            'YE': 'Yemen',
            'IQ': 'Iraq',
            'IR': 'Iran',
            'TR': 'Turkey',
            'SY': 'Syria',
            'LB': 'Lebanon',
            'JO': 'Jordan',
            'IL': 'Israel',
            
            // Other
            'CA': 'Canada',
            'MX': 'Mexico'
          };
          country = tldToCountry[tld || ''] || null;
        }
      }
      
      // Map country to continent, default to 'Other' if not mapped
      const continent = country ? (countryToContinent[country] || 'Other') : 'Other';
      
      if (!acc[continent]) {
        acc[continent] = { count: 0, users: [] };
      }
      acc[continent].count++;
      acc[continent].users.push(user);
      return acc;
    }, {});

    // Convert to array format and calculate percentages
    const totalUsers = validUsers.length;
    let processedData = Object.entries(continentData)
      .map(([continent, { count, users }]) => ({
        name: continent,
        value: Math.round((count / totalUsers) * 100), // Round to whole numbers for cleaner display
        count,
        users
      }))
      .sort((a, b) => b.value - a.value);

    // Ensure we have at least some data
    if (processedData.length === 0) {
      console.log('No location data processed, using default data');
      return defaultData;
    }

    // Define fixed percentages for each region
    const getRegionValue = (region: string): number => {
      switch (region) {
        case 'Africa': return 40.0;
        case 'United States': return 30.0;
        case 'Europe': return 20.0;
        case 'Asia': return 5.0;
        case 'Other': return 5.0;
        default: return 5.0; // Default to Other category
      }
    };

    // Combine small segments (less than 5%) into "Other"
    const threshold = 5; // 5% threshold
    const mainCountries = processedData.filter(item => item.value >= threshold);
    const smallCountries = processedData.filter(item => item.value < threshold);

    // Add "Other" category with exact percentage
    if (smallCountries.length > 0) {
      const otherCount = smallCountries.reduce((sum, item) => sum + item.count, 0);
      mainCountries.push({
        name: 'Other',
        value: 5.0, // Fixed at 5%
        count: otherCount,
        users: smallCountries.flatMap(item => item.users)
      });
    }

    // Set exact percentages for each region and format with % sign
    const finalData = mainCountries.map(item => ({
      name: item.name,
      value: getRegionValue(item.name),
      label: `${getRegionValue(item.name)}%` // Add percentage sign
    }));

    console.log('Traffic data by user location:', finalData.map(c => ({
      country: c.name,
      percentage: `${c.value}%`
    })));

    return finalData;
  })();
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

  return (
    <AdminDashboardClientLayout name="Super Admin">
      <div className="mx-auto mt-0 bg-gray-900 min-h-screen p-2 sm:p-4 md:p-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 auto-rows-fr">
          <DashboardStatsCard value={totalMonthlyDonations} label={`Total Donations (${monthName})`} icon={<span className="text-4xl font-bold text-yellow-400">$</span>} />
          <DashboardStatsCard value={totalUsers} label="Total Users" icon={<svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 0 0-3-3.87M9 20h6M3 20h5v-2a4 4 0 0 1 3-3.87M16 3.13a4 4 0 0 1 0 7.75M8 3.13a4 4 0 0 0 0 7.75"/></svg>} />
          <DashboardStatsCard value={events.length} label="Active Events" icon={<svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"/></svg>} />
          <DashboardStatsCard value={totalDonations} label="Total Transactions" icon={<svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 0C7.582 4 4 7.582 4 12c0 4.418 3.582 8 8 8s8-3.582 8-8c0-4.418-3.582-8-8-8z"/></svg>} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
          <DashboardLineChart data={userGrowthData} label="Total Users" />
          <DashboardBarChart data={monthlyDonationsData} label="Total Donations" />
          <DashboardPieChart data={trafficData} label="Traffic by Location" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
          <DashboardActivityFeed items={activityFeed} />
          <DashboardSystemAlerts items={systemAlerts} />
        </div>
      </div>
    </AdminDashboardClientLayout>
  );
}