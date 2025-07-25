# EDM (Evangelism, Discipleship, Missions) Project

A comprehensive web platform for EDM's mission work in Sierra Leone and Oregon, USA.

<!-- Last updated: July 25, 2025 -->

## Overview

EDM (Evangelism, Discipleship, Missions) is a registered 501(c)(3) non-profit organization dedicated to spreading the Gospel, training disciples, and conducting missions work primarily in Sierra Leone, with key partnerships in Oregon, USA. Our platform serves as a central hub for all EDM activities, communications, and resource management.

### Our Mission
To transform lives through evangelism, create robust discipleship structures, and engage in impactful missions work across Sierra Leone and beyond.

### Key Focus Areas
- **Evangelism**: Spreading the Gospel through various outreach programs
- **Discipleship**: Training and equipping believers through structured programs
- **Missions**: Conducting and supporting mission work in Sierra Leone
- **Bible School**: Operating the ReGom/EDM Bible Institute for theological education

## Features

- **Mission Information**: Detailed information about EDM's vision, goals, and current projects
- **Interactive Maps**: Visual representation of EDM's operational locations
- **Donation System**: Secure platform for supporting EDM's work
- **Event Management**: 
  - Registration and management for various ministry events
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
