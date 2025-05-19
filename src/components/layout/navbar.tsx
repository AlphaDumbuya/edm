
'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Menu, X, Search, LogIn, UserPlus, LayoutDashboard, LogOut,
  UserCircle, Info, HeartHandshake, GraduationCap, Newspaper,
  Phone, Target, School, DollarSign, Users, ExternalLink, BookOpenText, Briefcase
} from 'lucide-react';
import { useState, useEffect } from 'react';
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
    ]
  },
  {
    title: 'Contact',
    icon: Phone,
    href: '/contact',
    description: 'Reach out to EDM teams in Sierra Leone or Oregon.'
  },
];


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
  )
})
ListItem.displayName = "ListItem"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOutAuth, loading } = useAuth();

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
              <Image src="https://code-alpha-image-gallary.vercel.app/edm-logo.png" alt="EDM Logo" width={28} height={28} className="h-7 w-7 md:h-8 md:w-8" />
              <span className="text-xl md:text-2xl font-bold text-primary">EDM</span>
            </>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {mainNavItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.links ? (
                    <>
                      <NavigationMenuTrigger className="flex items-center text-xs px-1.5 py-1 md:text-sm md:px-2 md:py-1.5">
                        {item.icon && <item.icon className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-1.5" />} {item.title}
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
                    </>
                  ) : (
                    // This is for direct links in the main nav that are NOT dropdowns
                    (<NavigationMenuLink asChild>
                      <Link
                        href={item.href || '#'}
                        className={cn(navigationMenuTriggerStyle(), "flex items-center text-xs px-1.5 py-1 md:text-sm md:px-2 md:py-1.5")}
                      >
                        {item.icon && <item.icon className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-1.5" />}
                        {item.title}
                      </Link>
                    </NavigationMenuLink>)
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search and Auth Icons - Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            <Button variant="ghost" size="icon" disabled>
              <Search className="h-4 w-4" />
            </Button>
            {loading ? (
              <Button variant="outline" disabled size="sm" className="text-xs px-2 py-1">Loading...</Button>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full p-0 h-8 w-8">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                      <AvatarFallback>{getInitials(user.displayName || user.email)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <p className="font-medium text-sm truncate">{user.displayName || 'User Account'}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile"><UserCircle className="mr-2 h-4 w-4" />My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOutAuth} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />Log Out
                  </DropdownMenuItem>
 </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <UserCircle className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/auth/login"><LogIn className="mr-2 h-4 w-4" />Sign In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signup"><UserPlus className="mr-2 h-4 w-4" />Register</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-xs sm:max-w-sm bg-card p-0">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle className="flex items-center gap-2">
                    <Image src="https://code-alpha-image-gallary.vercel.app/edm-logo.png" alt="EDM Logo" width={24} height={24} />
                    <span className="text-lg font-bold text-primary">EDM Menu</span>
                  </SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-var(--header-height,120px))]"> {/* Adjusted height */}
                  <nav className="flex flex-col p-4 space-y-2">
                    {mainNavItems.map((item) => (
                      <div key={item.title}>
                        {item.links ? (
                          <div className="space-y-1">
                            <h4 className="font-semibold text-sm text-primary flex items-center mb-1">
                              {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                              {item.title}
                            </h4>
                            {item.links.map((link) => (
                              <SheetClose asChild key={link.href}>
                                <Link
                                  href={link.href}
                                  className="block rounded-md py-2 px-3 text-sm hover:bg-accent text-muted-foreground hover:text-accent-foreground"
 >
                                  {link.title}
                                </Link>
                              </SheetClose>
                            ))}
                          </div>
                        ) : (
                          <SheetClose asChild>
                            <Link
                              href={item.href || '#'}
                              className="flex items-center rounded-md py-2 px-3 text-sm font-medium hover:bg-accent text-foreground hover:text-accent-foreground"
 >
                              {item.icon && <item.icon className="h-4 w-4 mr-2 text-primary" />}
                              {item.title}
                            </Link>
                          </SheetClose>
                        )}
                        <div className="my-2 border-b border-border/50 last:border-b-0"></div>
                      </div>
                    ))}
                    {/* Mobile Auth Links */}
                    <div className="pt-4">
                    {loading ? (
                        <Button variant="outline" disabled className="w-full justify-start text-sm">Loading...</Button>
                    ) : user ? (
                      <>
                        <SheetClose asChild>
                          <Link
                            href="/dashboard"
                            className="flex items-center rounded-md py-2 px-3 text-sm font-medium hover:bg-accent text-foreground hover:text-accent-foreground"
                          >
                            <LayoutDashboard className="mr-2 h-4 w-4 text-primary" /> Dashboard
                          </Link>
                        </SheetClose>
                         <SheetClose asChild>
                          <Link
                            href="/dashboard/profile"
                            className="flex items-center rounded-md py-2 px-3 text-sm font-medium hover:bg-accent text-foreground hover:text-accent-foreground"
                          >
                            <UserCircle className="mr-2 h-4 w-4 text-primary" /> My Profile
                          </Link>
                        </SheetClose>
                        <div className="my-2 border-b border-border/50"></div>
                        <SheetClose asChild>
                          <Button variant="ghost" onClick={signOutAuth} className="w-full justify-start text-sm text-destructive hover:text-destructive focus:bg-destructive/10">
                            <LogOut className="mr-2 h-4 w-4" /> Log Out
                          </Button>
                        </SheetClose>
                      </>
                    ) : (
                      <>
                        <SheetClose asChild>
                          <Link
                            href="/auth/login"
                            className="flex items-center rounded-md py-2 px-3 text-sm font-medium hover:bg-accent text-foreground hover:text-accent-foreground"
                            legacyBehavior>
                            <LogIn className="mr-2 h-4 w-4 text-primary" /> Sign In
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link
                            href="/auth/signup"
                            className="flex items-center rounded-md py-2 px-3 text-sm font-medium hover:bg-accent text-foreground hover:text-accent-foreground"
                          >
                            <UserPlus className="mr-2 h-4 w-4 text-primary" /> Register
                          </Link>
                        </SheetClose>
                      </>
                    )}
                    </div>
                  </nav>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
