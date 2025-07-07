import React from 'react';

const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API;

interface PrayerMapEmbedProps {
  location: string; // e.g. 'Freetown, Sierra Leone' or any city/country
  label?: string;
}

const PrayerMapEmbed: React.FC<PrayerMapEmbedProps> = ({ location, label }) => {
  if (!location) return null;
  return (
    <div className="my-6 max-w-2xl mx-auto">
      {label && <h3 className="text-xs mb-2 text-blue-800 font-medium">{label}</h3>}
      <iframe
        width="100%"
        height="300"
        frameBorder="0"
        style={{
          borderRadius: '8px',
          boxShadow: 'rgba(0, 0, 0, 0.08) 1px 1px 40px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
        }}
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAP_API_KEY}&q=${encodeURIComponent(location)}&zoom=10&maptype=roadmap`}
        allowFullScreen
        aria-label={`Map for ${location}`}
      ></iframe>
    </div>
  );
};

export default PrayerMapEmbed;
