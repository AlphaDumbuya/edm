import * as React from "react"

export interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  className?: string
}

export function SectionTitle({ title, subtitle, className = "", ...props }: SectionTitleProps) {
  return (
    <div className={`text-center space-y-2 mb-6 md:mb-8 ${className}`} {...props}>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-muted-foreground max-w-[700px] mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}
