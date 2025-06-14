import type { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
}

export default function PageHeader({ title, subtitle, icon: Icon }: PageHeaderProps) {
  return (
    <div className="mb-6 md:mb-8 text-center md:text-left py-4 md:py-6 border-b border-border">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-3 md:gap-4">
        {Icon && <Icon className="h-10 w-10 md:h-12 md:w-12 text-primary mb-2 md:mb-0" />}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">{title}</h1>
          {subtitle && <p className="mt-1 text-md sm:text-lg text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
