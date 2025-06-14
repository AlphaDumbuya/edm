import Image from 'next/image';
import React from 'react';

export default function MovieScreeningPage() {
  return (
    <div className="space-y-8">
      {/* Page Header (Optional - you might want a separate component for this) */}
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold">Movie Screening Outreach</h1>
      </header>
      {/* Main Image */}
      <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-md">
        <Image
          src="https://images.unsplash.com/photo-1703764884882-2edc8c4961bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGplc3VzJTIwbW92aWUlMjBzaG93JTIwaW4lMjBhZnJpY2F8ZW58MHx8MHx8fDA%3D"
          alt="People watching a movie screening in Africa"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Placeholder Content */}
      <section className="container mx-auto px-4">
        <p className="text-lg text-muted-foreground">
          Movie screening outreach is a powerful evangelistic tool used by EDM to bring the message of God's word to villages and unreached communities in Sierra Leone. By hosting a screening of the "Jesus" film or other relevant materials, you can play a vital role in sharing the Gospel with those who might otherwise not have the opportunity to hear it.
        </p>
         <p className="text-lg text-muted-foreground mt-4">
          This method of outreach allows us to preach God's word in a relatable and impactful way, overcoming literacy barriers and cultural differences. It's about taking the light of the Gospel to the unreachable corners and seeing lives transformed by the power of Christ.
        </p>
       {/* You can add more sections here for steps on hosting, resources, contact info, etc. */}
      </section>
    </div>
  );
}