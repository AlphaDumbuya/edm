
import Link from 'next/link';
import Image from 'next/image'; // Added Image import
import { Facebook, Twitter, Instagram, Youtube, ShieldCheck, FileText, ShieldAlert } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 text-primary mb-4">
              <Image src="/assets/images/logo.png" alt="EDM Logo" width={48} height={48} className="h-12 w-12" />
            </Link>
            <p className="text-sm text-muted-foreground">
              EDM: Evangelism, Discipleship, Missions in Sierra Leone, West Africa and beyond.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">About EDM</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about/mission" className="hover:text-primary transition-colors">Our Mission</Link></li>
              <li><Link href="/about/leadership" className="hover:text-primary transition-colors">Leadership</Link></li>
              <li><Link href="/financial-transparency" className="hover:text-primary transition-colors">Financial Transparency</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Get Involved with EDM</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/events" className="hover:text-primary transition-colors">Events</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/donate" className="hover:text-primary transition-colors">Donate to EDM</Link></li>
              <li><Link href="/partnership" className="hover:text-primary transition-colors">Partner With EDM</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={24} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={24} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={24} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Youtube size={24} /></a>
            </div>
            <p className="text-sm text-muted-foreground">contact@edm.org</p>
            <p className="text-sm text-muted-foreground">(+232) XX-XXX-XXX</p>
            <address className="text-sm text-muted-foreground not-italic mt-2">
              EDM Headquarters<br />
              66 Main Grafton Road<br />
              Kossoh Town, Freetown<br />
              Sierra Leone
            </address>
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
            &copy; {currentYear} EDM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
