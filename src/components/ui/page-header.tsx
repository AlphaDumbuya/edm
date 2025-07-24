import { LucideIcon } from "lucide-react"
import * as React from "react"

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  icon?: LucideIcon
  className?: string
}

export function PageHeader({ title, subtitle, icon: Icon, className = "", ...props }: PageHeaderProps) {
  return (
    <div className={`text-center space-y-2 ${className}`} {...props}>
      {Icon && (
        <div className="flex justify-center mb-4">
          <Icon className="h-12 w-12 text-primary" />
        </div>
      )}
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h1>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-[900px] mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}
