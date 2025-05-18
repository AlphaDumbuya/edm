
// src/components/layout/navbar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Handshake, Globe, Users, BookOpenText, DollarSign, Sparkles, Search, LogIn, UserPlus, LayoutDashboard, LogOut, UserCircle, Rss, Info, HeartHandshake, GraduationCap, Newspaper, Video, Phone, Target, School } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { useAuth } from '@/contexts/auth-context';

const mainNavItems = [
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
      { href: '/ministries/education', title: 'Education Overview', description: 'Our commitment to Christ-centered education in Sierra Leone.' },
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
       { href: '/news', title: 'News & Updates', description: 'Latest articles, reports, and testimonies from Sierra Leone.'},
       { href: '/gallery', title: 'Media Gallery', description: 'Photos, videos, and resources from Sierra Leone and Oregon.'},
    ]
  },
   {
    title: 'Contact',
    icon: Phone,
    href: '/contact',
    description: "Reach out to EDM teams in Sierra Leone or Oregon."
  },
];


export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOutAuth, loading } = useAuth();

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const dynamicNavItems = mainNavItems;


  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image src="https://code-alpha-image-gallary.vercel.app/edm-logo.png" alt="EDM Logo" width={28} height={28} className="h-7 w-7 md:h-8 md:w-8" />
            <span className="text-xl md:text-2xl font-bold text-primary">EDM</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="space-x-1">
              {dynamicNavItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.links ? (
                    <>
                      <NavigationMenuTrigger className="text-xs px-2 py-1.5 md:text-sm md:px-3 md:py-2">
                        {item.icon && <item.icon className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-1.5" />}
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[350px] gap-2 p-3 md:w-[450px] md:grid-cols-2 lg:w-[500px] ">
                          {item.links.map((link) => (
                            <ListItem key={link.title} title={link.title} href={link.href}>
                              {link.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={item.href || '#'} legacyBehavior passHref>
                      <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "flex items-center text-xs px-2 py-1.5 md:text-sm md:px-3 md:py-2")}>
                        {item.icon && <item.icon className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-1.5" />}
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden lg:flex items-center gap-1 md:gap-2">
            <Button variant="ghost" size="icon" aria-label="Search (Coming Soon)" className="h-8 w-8 md:h-9 md:w-9" disabled>
              <Search className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
            {loading ? (
              <Button variant="outline" disabled  size="sm">Loading...</Button>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 md:h-10 md:w-10 rounded-full">
                    <Avatar className="h-8 w-8 md:h-9 md:w-9">
                      <AvatarImage src={user.photoURL || undefined} alt={user.displayName || user.email || "User Avatar"} data-ai-hint="user avatar"/>
                      <AvatarFallback>{getInitials(user.displayName || user.email)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <p className="font-medium truncate text-sm">{user.displayName || 'User Profile'}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile"><UserCircle className="mr-2 h-4 w-4" /> My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOutAuth} className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" /> Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="User account options" className="h-8 w-8 md:h-9 md:w-9">
                    <UserCircle className="h-5 w-5 md:h-6 md:w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/auth/login" className="flex items-center cursor-pointer text-sm">
                      <LogIn className="mr-2 h-4 w-4" /> Login
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signup" className="flex items-center cursor-pointer text-sm">
                      <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[320px] bg-card p-0 flex flex-col">
                <SheetHeader className="p-4 border-b flex flex-row justify-between items-center">
                   <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                       <Image src="https://code-alpha-image-gallary.vercel.app/edm-logo.png" alt="EDM Logo" width={28} height={28} className="h-7 w-7" />
                       <SheetTitle className="text-lg font-semibold text-primary">EDM</SheetTitle>
                    </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon"><X className="h-5 w-5"/></Button>
                  </SheetClose>
                </SheetHeader>
                <ScrollArea className="flex-1">
                  <div className="p-4">
                    <nav className="flex flex-col gap-1">
                      {dynamicNavItems.map((item) => (
                        item.links ? (
                          <div key={item.title} className="py-1">
                            <h3 className="font-semibold text-muted-foreground mb-1 mt-2 flex items-center text-sm px-2">{item.icon && <item.icon className="h-4 w-4 mr-2" />}{item.title}</h3>
                            {item.links.map((link) => (
                              <SheetClose asChild key={link.href}>
                              <Link href={link.href || '#'} className="block py-2 px-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm ml-2" onClick={() => setMobileMenuOpen(false)}>
                                {link.title}
                              </Link>
                              </SheetClose>
                            ))}
                          </div>
                        ) : (
                          <SheetClose asChild key={item.title}>
                            <Link href={item.href || '#'} className="flex items-center py-2.5 px-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                              {item.icon && <item.icon className="h-4 w-4 mr-2" />}{item.title}
                            </Link>
                          </SheetClose>
                        )
                      ))}
                    </nav>
                    <div className="mt-6 border-t pt-6">
                      {loading ? (
                        <Button variant="outline" disabled className="w-full">Loading...</Button>
                      ): user ? (
                        <>
                          <SheetClose asChild>
                            <Link href="/dashboard" className="flex items-center py-2.5 px-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors mb-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                              <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link href="/dashboard/profile" className="flex items-center py-2.5 px-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors mb-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                              <UserCircle className="mr-2 h-4 w-4" /> My Profile
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10" onClick={() => { signOutAuth(); setMobileMenuOpen(false); }}>
                              <LogOut className="mr-2 h-4 w-4" /> Log Out
                            </Button>
                          </SheetClose>
                        </>
                      ) : (
                        <div className="space-y-2">
                          <SheetClose asChild>
                            <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                              <Button variant="outline" className="w-full">
                                <LogIn className="mr-2 h-4 w-4" /> Login
                              </Button>
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                              <Button className="w-full">
                                <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                              </Button>
                            </Link>
                          </SheetClose>
                        </div>
                      )}
                    </div>
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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-2 md:p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-xs md:text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

    