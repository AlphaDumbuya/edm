'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Youtube, FileText, ShieldAlert, MapPin, Mail, Phone } from 'lucide-react';
import React from 'react';

export default function Footer({ className = "" }: { className?: string }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-card text-card-foreground border-t ${className}`}>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="space-y-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex items-center gap-2">
                <Image src="https://code-alpha-image-gallary.vercel.app/edm-logo.png" alt="EDM Logo" width={40} height={40} className="h-10 w-10" />
                <span className="text-lg md:text-xl font-bold text-primary">EDM</span>
              </span>
            </Link>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Evangelism, Discipleship, Missions in Sierra Leone, West Africa, with vital partnerships in Oregon, USA.
              </p>
              <p className="text-xs text-muted-foreground mt-1 sm:mt-2">
                EDM is a registered 501(c)(3) non-profit organization.
              </p>
          </div>
          <div>
            <h3 className="text-md sm:text-lg font-semibold mb-3 md:mb-4">About EDM</h3>
            <ul className="space-y-1.5 md:space-y-2 text-xs sm:text-sm">
              <li><Link href="/about" className="hover:text-primary transition-colors">Our Story & Foundations</Link></li>
              <li><Link href="/about/what-we-believe" className="hover:text-primary transition-colors">What We Believe</Link></li>
              <li><Link href="/international-board" className="hover:text-primary transition-colors">International Board</Link></li>
              <li><Link href="/financial-transparency" className="hover:text-primary transition-colors">Financial Transparency</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-md sm:text-lg font-semibold mb-3 md:mb-4">Quick Links</h3>
            <ul className="space-y-1.5 md:space-y-2 text-xs sm:text-sm">
              <li><Link href="/ministries" className="hover:text-primary transition-colors">Ministries</Link></li>
              <li><Link href="/get-involved" className="hover:text-primary transition-colors">Get Involved</Link></li>
              <li><Link href="/donate" className="hover:text-primary transition-colors">Donate</Link></li>
              <li><Link href="/news" className="hover:text-primary transition-colors">News & Updates</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">Media Gallery</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-md sm:text-lg font-semibold mb-3 md:mb-4">Contact Us</h3>
            <address className="text-xs sm:text-sm text-muted-foreground not-italic space-y-1.5 md:space-y-2">
              <div className="flex items-start">
                <MapPin size={14} className="mr-2 mt-0.5 text-primary shrink-0" />
                <div>
                  <strong>Sierra Leone HQ:</strong><br />
                  66 Main Grafton Road<br />
                  Kossoh Town, Freetown<br />
                  Sierra Leone
                </div>
              </div>
              <div className="flex items-start">
                 <MapPin size={14} className="mr-2 mt-0.5 text-primary shrink-0" />
                <div>
                  <strong>USA (Oregon Partner Office):</strong><br />
                  12301 South East Stephens St.<br />
                  Portland, Oregon 97233<br />
                  USA
                </div>
              </div>
              <div className="flex items-center">
                <Mail size={14} className="mr-2 text-primary shrink-0" />
                <a href="mailto:contact@edmmission.org" className="hover:text-primary">contact@edmmission.org</a>
              </div>
            
                 
              <div className="flex items-center">
                <Phone size={14} className="mr-2 text-primary shrink-0" />
                <span>+23276781153 (SL) - Dominic Dumbuya</span>
              </div>
              <div className="flex items-center">
                <Phone size={14} className="mr-2 text-primary shrink-0" />
                <span>+23276293906 (SL) - Samuel Tarawally</span>
              </div>
              <div className="flex items-center">
                <Phone size={14} className="mr-2 text-primary shrink-0" />
                <span>+ 1 503-505-8884 (USA - Edwin Kargbo)</span>
              </div>
            </address>
            <div className="flex space-x-2 sm:space-x-3 mt-3 md:mt-4">
              <a href="https://www.facebook.com/EDMmissions/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={18} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={18} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={18} /></a>
              <a href="https://www.youtube.com/@EvangelismDiscipleshipMissions" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Youtube size={18} /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 md:mt-12 border-t border-border pt-6 md:pt-8 text-center">
 <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 mb-1 sm:mb-2">
 <Link
   href="/terms-and-conditions"
   className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
 >
 <span>
 <FileText size={14} className="mr-1" /> Terms & Conditions
 </span>
</Link>
            <span className="hidden sm:inline text-muted-foreground">|</span>
 <Link
   href="/privacy-policy"
   className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
 >
 <span>
 <ShieldAlert size={14} className="mr-1" /> Privacy Policy
 </span>
</Link>
 </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            &copy; {currentYear} Evangelism, Discipleship, Missions (EDM). All rights reserved.
          </p>
           <p className="text-xs text-muted-foreground mt-1">
              EDM is a registered 501(c)(3) non-profit organization.
            </p>
        </div>
      </div>
    </footer>
  );
}
