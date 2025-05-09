// src/components/layout/navbar.tsx
'use client';

import Link from 'next/link';
import { Menu, X, Church, Handshake, Globe, Users, BookOpen, DollarSign, Sparkles, Search, LogIn, UserPlus, LayoutDashboard, LogOut, UserCircle } from 'lucide-react';
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
import { cn } from '@/lib/utils';
import * as React from 'react';
import { useAuth } from '@/contexts/auth-context';

const mainNavItems = [
  {
    title: 'About',
    icon: Handshake,
    links: [
      { href: '/about/mission', title: 'Our Mission', description: 'Learn about our core values and goals.' },
      { href: '/about/leadership', title: 'Leadership', description: 'Meet the team guiding our mission.' },
    ],
  },
  {
    title: 'Ministries',
    icon: Users,
    links: [
      { href: '/events', title: 'Events', description: 'Upcoming mission events and activities.' },
      { href: '/content', title: 'Content Hub', description: 'Articles, testimonies, and resources.' },
      { href: '/blog', title: 'Blog', description: 'Insights, updates, and stories from the field.' },
    ],
  },
  {
    title: 'Connect',
    icon: Globe,
    links: [
      { href: '/prayer', title: 'Prayer Wall', description: 'Submit and view prayer requests.' },
      { href: '/missions', title: 'Missions Map', description: 'See where we are actively involved.' },
      { href: '/gallery', title: 'Media Gallery', description: 'Photos and videos from our work.' },
    ],
  },
  {
    title: 'Tools',
    icon: Sparkles,
    href: '/scripture-generator',
  },
];


export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOutAuth, loading } = useAuth();

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  const dynamicNavItems = user 
  ? [
      ...mainNavItems,
      { title: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    ]
  : mainNavItems;


  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary/90 transition-colors">
            <Church className="h-8 w-8" />
            <span>EDM Connect</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {dynamicNavItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.links ? (
                    <>
                      <NavigationMenuTrigger>
                        <item.icon className="h-4 w-4 mr-2" />
                        {item.title}
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
                    <Link href={item.href || '#'} legacyBehavior passHref>
                      <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "flex items-center")}>
                        <item.icon className="h-4 w-4 mr-2" />
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="hidden lg:flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            {loading ? (
              <Button variant="outline" disabled>Loading...</Button>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.photoURL || undefined} alt={user.displayName || user.email || "User Avatar"} data-ai-hint="user avatar"/>
                      <AvatarFallback>{getInitials(user.displayName || user.email)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <p className="font-medium truncate">{user.displayName || 'User Profile'}</p>
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
                  <DropdownMenuItem onClick={signOutAuth} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" /> Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline">
                    <LogIn className="mr-2 h-4 w-4" /> Login
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button>
                    <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                  </Button>
                </Link>
              </>
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
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-card p-0">
                <SheetHeader className="p-4 border-b">
                   <SheetClose asChild>
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary" onClick={() => setMobileMenuOpen(false)}>
                      <Church className="h-7 w-7" />
                      <span>EDM Connect</span>
                    </Link>
                  </SheetClose>
                </SheetHeader>
                <div className="p-4">
                  <nav className="flex flex-col gap-2">
                    {dynamicNavItems.map((item) => (
                      item.links ? (
                        <div key={item.title}>
                          <h3 className="font-semibold text-muted-foreground mb-1 mt-3 flex items-center"><item.icon className="h-4 w-4 mr-2" />{item.title}</h3>
                          {item.links.map((link) => (
                            <SheetClose asChild key={link.href}>
                             <Link href={link.href || '#'} className="block py-2 px-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm" onClick={() => setMobileMenuOpen(false)}>
                               {link.title}
                             </Link>
                            </SheetClose>
                          ))}
                        </div>
                      ) : (
                        <SheetClose asChild key={item.title}>
                          <Link href={item.href || '#'} className="flex items-center py-2 px-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors" onClick={() => setMobileMenuOpen(false)}>
                             <item.icon className="h-4 w-4 mr-2" />{item.title}
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
                          <Link href="/dashboard/profile" className="flex items-center py-2 px-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors mb-2" onClick={() => setMobileMenuOpen(false)}>
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
