import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface DonationOptionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  actionText: string;
  actionLink: string;
}

export default function DonationOption({ title, description, icon: Icon, actionText, actionLink }: DonationOptionProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="items-center text-center">
        <div className="p-4 bg-primary/10 rounded-full mb-4 w-fit">
          <Icon className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow text-center">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="justify-center border-t pt-6">
        <Link href={actionLink}>
          <Button size="lg" className="w-full md:w-auto">
            {actionText} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
