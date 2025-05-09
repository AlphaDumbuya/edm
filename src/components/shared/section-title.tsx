interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({ title, subtitle, className }: SectionTitleProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <h2 className="text-3xl font-semibold tracking-tight text-foreground">{title}</h2>
      {subtitle && <p className="mt-1 text-md text-muted-foreground">{subtitle}</p>}
      <div className="mt-2 h-1 w-16 bg-primary rounded"></div>
    </div>
  );
}
