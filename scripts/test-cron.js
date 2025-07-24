const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config({ path: '.env.local' });

async function testCronEndpoint() {
  const url = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}/api/cron/event-reminders`
    : 'http://localhost:3000/api/cron/event-reminders';

  console.log('Testing event reminder cron endpoint:', url);

  try {
    const response = await fetch(url, {
      headers: {
        'x-cron-secret': process.env.CRON_SECRET || ''
      }
    });

    console.log('Response status:', response.status);
    console.log('Response:', await response.text());
  } catch (error) {
    console.error('Error testing cron endpoint:', error);
  }
}

testCronEndpoint().catch(console.error);
