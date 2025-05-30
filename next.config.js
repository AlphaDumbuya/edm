require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'code-alpha-image-gallary.vercel.app',
        pathname: '**', // Or a more specific path if you only serve images from a subdirectory
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**', // Or a more specific path if you only serve images from a subdirectory
      },
 {
 protocol: 'https',
 hostname: 'source.unsplash.com',
 pathname: '**', // Or a more specific path if you only serve images from a subdirectory
 },
    ],
  },
};

module.exports = nextConfig;