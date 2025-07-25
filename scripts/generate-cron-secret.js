const crypto = require('crypto');

// Generate a 32-byte random string and convert it to hex
const cronSecret = crypto.randomBytes(32).toString('hex');

console.log('Generated CRON_SECRET:');
console.log(cronSecret);
console.log('\nMake sure to:\n1. Add this to your .env.local file\n2. Add it to your Vercel environment variables');
