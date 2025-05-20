
'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Menu, X, UserCircle, Info, HeartHandshake, DollarSign, Newspaper,
  Phone, Target, Users, ExternalLink, BookOpenText, Briefcase, ArrowRight,
  LogIn, UserPlus, LayoutDashboard, LogOut, GraduationCap, School,
} from 'lucide-react';
import { useState, useEffect } from 'react';
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
  href?: undefined; // Ensure href is not present for dropdown items
}

interface NavItemSingleLink {
  title: string;
  icon: React.ForwardRefExoticComponent<any>;
  href: string;
  description: string;
  links?: undefined; // Ensure links is not present for single link items
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
      { href: '/ministries', title: 'Ministries Overview', description: 'Explore all EDM ministry areas.' },
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
      { href: '/get-involved', title: 'Get Involved Overview', description: 'Discover ways to contribute to EDM.' },
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
    id?: string; // Added id
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
            className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image src="https://code-alpha-image-gallary.vercel.app/edm-logo.png" alt="EDM Logo" width={28} height={28} className="h-7 w-7 md:h-8 md:w-8" />
            <span className="text-xl md:text-2xl font-bold text-primary">EDM</span>
          </Link>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {mainNavItems.map((item, index) => {
                const IconComponent = item.icon;
                const itemKey = `nav-item-${item.title || 'link'}-${index}`;

                if (item.links) {
                  return (
                    <NavigationMenuItem key={itemKey}>
                      <NavigationMenuTrigger className="flex items-center text-xs px-1.5 py-1 md:text-sm md:px-2 md:py-1.5">
                        {IconComponent && <IconComponent className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-1.5" />} {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                          {item.links.map((link) => (
                            <ListItem key={link.title} title={link.title} href={link.href}>
                              {link.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                } else {
                  return (
                    <NavigationMenuItem key={itemKey}>
                      <NavigationMenuLink asChild>
                        <Link href={item.href || '#'} className={cn(navigationMenuTriggerStyle(), "flex items-center text-xs px-1.5 py-1 md:text-sm md:px-2 md:py-1.5")}>
                          {IconComponent && <IconComponent className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-1.5" />}
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                }
              })}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-2">
              {loading ? (
                <div className="h-8 w-20 bg-muted rounded-md animate-pulse"></div>
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.photoURL || ''} alt={user.name || user.email || 'User'} />
                        <AvatarFallback>{getInitials(user.name || user.email)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none truncate">{user.name || user.email}</p>
                        <p className="text-xs leading-none text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/profile"><UserCircle className="mr-2 h-4 w-4" /> Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOutAuth}>
                      <LogOut className="mr-2 h-4 w-4" /> Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <UserCircle className="h-5 w-5" />
                      <span className="sr-only">User Menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40" align="end" forceMount>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/login"><LogIn className="mr-2 h-4 w-4" />Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/signup"><UserPlus className="mr-2 h-4 w-4" />Sign Up</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[340px] bg-card p-0">
                <ScrollArea className="h-full">
                  <SheetHeader className="p-4 border-b">
                    <SheetClose asChild>
                      <Link href="/" className="flex items-center gap-2">
                        <Image src="https://code-alpha-image-gallary.vercel.app/edm-logo.png" alt="EDM Logo" width={24} height={24} />
                        <SheetTitle className="text-primary text-lg">EDM</SheetTitle>
                      </Link>
                    </SheetClose>
                  </SheetHeader>
                  <div className="p-4">
                    {loading && (
                       <div className="space-y-2">
                        <div className="h-8 bg-muted rounded-md animate-pulse"></div>
                        <div className="h-8 bg-muted rounded-md animate-pulse"></div>
                       </div>
                    )}
                    {!loading && user && (
                      <div className="mb-4 p-3 rounded-md bg-muted/50 border">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.photoURL || ''} alt={user.name || user.email || 'User'} />
                            <AvatarFallback>{getInitials(user.name || user.email)}</AvatarFallback>
                          </Avatar>
                          <div>
                             <p className="text-sm font-medium leading-none truncate">{user.name || user.email}</p>
                             <p className="text-xs leading-none text-muted-foreground truncate">{user.email}</p>
                          </div>
                        </div>
                        <SheetClose asChild><Link href="/dashboard" className={cn(buttonVariants({variant: "outline", size:"sm"}), "w-full justify-start mb-1")}><LayoutDashboard className="mr-2"/>Dashboard</Link></SheetClose>
                        <SheetClose asChild><Link href="/dashboard/profile" className={cn(buttonVariants({variant: "outline", size:"sm"}), "w-full justify-start mb-1")}><UserCircle className="mr-2"/>Profile</Link></SheetClose>
                        <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => { signOutAuth(); setMobileMenuOpen(false);}}><LogOut className="mr-2"/>Log Out</Button>
                      </div>
                    )}
                    {!loading && !user && (
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <SheetClose asChild>
                          <Link href="/auth/login" className={cn(buttonVariants({ variant: "default" }))}>
                            <LogIn className="mr-2 h-4 w-4" />Login
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link href="/auth/signup" className={cn(buttonVariants({ variant: "outline" }))}>
                            <UserPlus className="mr-2 h-4 w-4" />Sign Up
                          </Link>
                        </SheetClose>
                      </div>
                    )}
                    
                    <nav className="flex flex-col space-y-1">
                      {mainNavItems.map((item, index) => {
                        const IconComponent = item.icon;
                         const itemKey = `mobile-nav-${item.title || 'link'}-${index}`;
                        if (item.links) {
                          return (
                            <div key={itemKey}>
                              <h4 className="font-semibold text-sm text-muted-foreground px-3 py-2 flex items-center">
                                {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
                                {item.title}
                              </h4>
                              <ul className="pl-4">
                                {item.links.map(link => (
                                  <li key={link.href}>
                                    <SheetClose asChild>
                                      <Link href={link.href} className="block py-2 px-3 text-sm hover:bg-accent rounded-md">
                                        {link.title}
                                      </Link>
                                    </SheetClose>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        } else {
                          return (
                            <SheetClose asChild key={itemKey}>
                              <Link
                                href={item.href || '#'}
                                className="flex items-center py-2 px-3 text-sm hover:bg-accent rounded-md font-medium"
                              >
                                {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
                                {item.title}
                              </Link>
                            </SheetClose>
                          );
                        }
                      })}
                    </nav>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
