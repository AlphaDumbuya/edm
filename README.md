# EDM (Evangelism, Discipleship, Missions) Project

A comprehensive web platform for EDM's mission work in Sierra Leone and Oregon, USA.

<!-- Last updated: July 24, 2025 -->
<!-- Trigger redeploy: July 24, 2025 8:45:00 PM -->

## Overview

EDM (Evangelism, Discipleship, Missions) is a registered 501(c)(3) non-profit organization dedicated to spreading the Gospel, training disciples, and conducting missions work primarily in Sierra Leone, with key partnerships in Oregon, USA.

## Features

- **Mission Information**: Detailed information about EDM's vision, goals, and current projects
- **Interactive Maps**: Visual representation of EDM's operational locations
- **Donation System**: Secure platform for supporting EDM's work
- **Event Management**: 
  - Registration and management for various ministry events
  - Automated email reminders (24h, 1h, and 30m before events)
  - Special handling for virtual events with secure join links
- **News & Updates**: Regular updates about EDM's activities and achievements
- **Prayer Requests**: System for submitting and managing prayer requests
- **Admin Dashboard**: Comprehensive management interface for EDM staff

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **Deployment**: Vercel
- **Media Storage**: Uploadthing

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/AlphaDumbuya/edm_clone.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in required environment variables:
     ```env
     # Database URLs (Required)
     DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
     DIRECT_DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE

     # Email Configuration (Required for event reminders)
     SMTP_HOST=your-smtp-host
     SMTP_PORT=587
     SMTP_USER=your-smtp-user
     SMTP_PASSWORD=your-smtp-password
     EMAIL_FROM_NAME="EDM Events Team"

     # Cron Job Security (Required for event reminders)
     CRON_SECRET=your-generated-secret  # Generate using scripts/generate-cron-secret.js
     ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at http://localhost:9003

## Contributing

We welcome contributions! Please read our contributing guidelines before submitting pull requests.

## License

This project is proprietary and confidential. All rights reserved.

## Contact

For any inquiries about the project, please contact EDM administration.
