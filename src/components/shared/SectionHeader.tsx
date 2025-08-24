import React from "react";
import type { LucideIcon } from "lucide-react";
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  Icon?: LucideIcon;
}
export function SectionHeader({
  title,
  subtitle,
  Icon
}: SectionHeaderProps) {
  return <div className="text-center mb-12">
      {Icon ? <div className="flex items-center justify-center gap-2 mb-4">
          
        </div> : null}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{title}</h2>
      {subtitle ? <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p> : null}
    </div>;
}