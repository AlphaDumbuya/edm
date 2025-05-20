'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Menu, X, Search, LogIn, UserPlus, LayoutDashboard, LogOut,
  UserCircle, Info, HeartHandshake, GraduationCap, Newspaper,
  Phone, Target, School, DollarSign, Users, ExternalLink, BookOpenText, Briefcase, ArrowRight
} from 'lucide-react';
import { useState } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { useAuth } from '@/contexts/auth-context';

interface NavLink {
  href: string;
  title: string;
  description: string;
}

interface NavItemWithLinks {
  title: string;
  icon: React.ForwardRefExoticComponent<any>;
  links: NavLink[];
}

interface NavItemSingleLink {
  title: string;
  icon: React.ForwardRefExoticComponent<any>;
  href: string;
  description: string;
}

type MainNavItem = NavItemWithLinks | NavItemSingleLink;

const mainNavItems: MainNavItem[] = [
  {
    title: 'About',
    icon: Info,
    links: [
      { href: '/about', title: 'Our Story & Foundations', description: 'EDM\'s history, beliefs, and structure in Sierra Leone and Oregon.' },
      { href: '/about/what-we-believe', title: 'What We Believe', description: 'Our core doctrinal statements.' },
      { href: '/international-board', title: 'International Board', description: 'Meet our leadership team for Sierra Leone and Oregon.' },
    ],
  },
  {
    title: 'The Mission',
    icon: Target,
    href: '/the-mission',
    description: 'Our overall mission, vision, and goals for Sierra Leone and Oregon.',
  },
  {
    title: 'Ministries',
    icon: HeartHandshake,
    links: [
      { href: '/ministries/evangelism', title: 'Evangelism', description: 'Sharing the Gospel through various outreaches in Sierra Leone.' },
      { href: '/ministries/discipleship', title: 'Discipleship', description: 'Training believers to maturity in Sierra Leone.' },
      { href: '/ministries/missions-outreach', title: 'Missions Outreach', description: 'Church planting and community projects in Sierra Leone.' },
      { href: '/ministries/education', title: 'Education Overview', description: 'Our commitment to Christ-centered education.' },
      { href: '/ministries/education/marifa-school', title: 'EDM Marifa School', description: 'Operational secondary school in Rosortta Village, Sierra Leone.' },
    ],
  },
  {
    title: 'Get Involved',
    icon: Users,
    links: [
      { href: '/get-involved/volunteer', title: 'Volunteer', description: 'Offer your time and skills for Sierra Leone or Oregon support.' },
      { href: '/get-involved/prayer', title: 'Prayer Wall', description: 'Join us in prayer for Sierra Leone and Oregon.' },
      { href: '/get-involved/partner', title: 'Partnerships', description: 'Collaborate with EDM for Sierra Leone and Oregon.' },
    ],
  },
  {
    title: 'Donate',
    icon: DollarSign,
    href: '/donate',
    description: 'Support our work financially in Sierra Leone and Oregon.',
  },
  {
    title: 'News & Media',
    icon: Newspaper,
    links: [
      { href: '/news', title: 'News & Updates', description: 'Latest articles, reports, and testimonies from Sierra Leone.' },
      { href: '/gallery', title: 'Media Gallery', description: 'Photos, videos, and resources from Sierra Leone and Oregon.' },
    ],
  },
  {
    title: 'Contact',
    icon: Phone,
    href: '/contact',
    description: 'Reach out to EDM teams in Sierra Leone or Oregon.'
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user: rawUser, signOutAuth, loading } = useAuth();

  const user = rawUser as {
    displayName?: string | null;
    photoURL?: string | null;
    email?: string | null;
    [key: string]: any;
  };

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div>
                <Image src="https://code-alpha-image-gallary.vercel.app/edm-logo.png" alt="EDM Logo" width={28} height={28} className="h-7 w-7 md:h-8 md:w-8" />
                <span className="text-xl md:text-2xl font-bold text-primary">EDM</span>
              </div>
          </Link>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {mainNavItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {'links' in item ? (
                    <>
                      <NavigationMenuTrigger className="flex items-center text-xs px-1.5 py-1 md:text-sm md:px-2 md:py-1.5">
                        {item.icon && <item.icon className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-1.5" />} {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.links.map((link) => (
                            <ListItem key={link.title} title={link.title} href={link.href}>
                              {link.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link href="/dashboard" className="flex items-center px-2 py-1.5 text-sm rounded-sm hover:bg-accent">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>

                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Additional elements (auth, mobile toggle, etc.) would go here */}
        </div>
      </div>
    </header>
  );
}
