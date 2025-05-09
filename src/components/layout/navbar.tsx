
'use client';

import Link from 'next/link';
import { Menu, X, Church, Handshake, Globe, Users, BookOpen, Video, DollarSign, MessageCircle, Sparkles, Search } from 'lucide-react';
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
import { cn } from '@/lib/utils';
import * as React from 'react';

const navItems = [
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
    title: 'Get Involved',
    icon: DollarSign,
    href: '/donate',
  },
  {
    title: 'Tools',
    icon: Sparkles,
    href: '/scripture-generator',
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              {navItems.map((item) => (
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
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Link href="/donate">
              <Button>
                <DollarSign className="mr-2 h-4 w-4" /> Donate
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-card p-0">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle className="text-xl font-bold text-primary text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="p-4">
                  <SheetClose asChild>
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary mb-6" onClick={() => setMobileMenuOpen(false)}>
                      <Church className="h-7 w-7" />
                      <span>EDM Connect</span>
                    </Link>
                  </SheetClose>
                  <nav className="flex flex-col gap-4">
                    {navItems.map((item) => (
                      item.links ? (
                        <div key={item.title}>
                          <h3 className="font-semibold text-muted-foreground mb-2 flex items-center"><item.icon className="h-4 w-4 mr-2" />{item.title}</h3>
                          {item.links.map((link) => (
                            <SheetClose asChild key={link.href}>
                             <Link href={link.href || '#'} className="block py-2 px-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors" onClick={() => setMobileMenuOpen(false)}>
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
                    <SheetClose asChild>
                      <Link href="/donate" className="mt-4" onClick={() => setMobileMenuOpen(false)}>
                         <Button className="w-full">
                           <DollarSign className="mr-2 h-4 w-4" /> Donate
                         </Button>
                      </Link>
                    </SheetClose>
                  </nav>
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
