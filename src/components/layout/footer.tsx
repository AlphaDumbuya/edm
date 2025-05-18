
import Link from 'next/link';
import Image from 'next/image'; 
import { Facebook, Twitter, Instagram, Youtube, ShieldCheck, FileText, ShieldAlert, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/assets/images/logo.png" alt="EDM Logo" width={48} height={48} className="h-12 w-12" />
              <span className="text-xl font-bold text-primary">EDM</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Evangelism, Discipleship, Missions in Sierra Leone, West Africa and with our partners in Ohio, USA.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">About EDM</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary transition-colors">Our Story & Mission</Link></li>
              <li><Link href="/about/what-we-believe" className="hover:text-primary transition-colors">What We Believe</Link></li>
              <li><Link href="/international-board" className="hover:text-primary transition-colors">International Board</Link></li>
              <li><Link href="/financial-transparency" className="hover:text-primary transition-colors">Financial Transparency</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/ministries" className="hover:text-primary transition-colors">Ministries</Link></li>
              <li><Link href="/get-involved" className="hover:text-primary transition-colors">Get Involved</Link></li>
              <li><Link href="/donate" className="hover:text-primary transition-colors">Donate</Link></li>
              <li><Link href="/news" className="hover:text-primary transition-colors">News & Updates</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">Media Gallery</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="text-sm text-muted-foreground not-italic space-y-2">
              <div className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1 text-primary shrink-0" />
                <div>
                  <strong>Sierra Leone HQ:</strong><br />
                  66 Main Grafton Road<br />
                  Kossoh Town, Freetown<br />
                  Sierra Leone
                </div>
              </div>
              <div className="flex items-start">
                 <MapPin size={16} className="mr-2 mt-1 text-primary shrink-0" />
                <div>
                  <strong>USA (Ohio Partner Office):</strong><br />
                  12301 South East Stephens Street<br />
                  Portland, Ohio 97233
                </div>
              </div>
              <div className="flex items-center">
                <Mail size={16} className="mr-2 text-primary shrink-0" />
                <a href="mailto:contact@edm.org" className="hover:text-primary">contact@edm.org</a>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="mr-2 text-primary shrink-0" />
                <span>(+232) XX-XXX-XXX (SL)</span>
              </div>
            </address>
            <div className="flex space-x-3 mt-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={20} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Youtube size={20} /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-2">
            <Link href="/terms-and-conditions" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center">
              <FileText size={16} className="mr-1" /> Terms & Conditions
            </Link>
            <span className="hidden sm:inline text-muted-foreground">|</span>
            <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center">
              <ShieldAlert size={16} className="mr-1" /> Privacy Policy
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} EDM. Evangelism, Discipleship, Missions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
