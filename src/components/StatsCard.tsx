import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  variant?: 'default' | 'primary' | 'accent' | 'warning';
}

export const StatsCard = ({ title, value, subtitle, icon: Icon, trend, variant = 'default' }: StatsCardProps) => {
  const variants = {
    default: 'bg-card',
    primary: 'bg-primary/5 border-primary/10',
    accent: 'bg-accent/5 border-accent/10',
    warning: 'bg-warning/5 border-warning/10',
  };

  const iconVariants = {
    default: 'bg-secondary text-foreground',
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/10 text-accent',
    warning: 'bg-warning/10 text-warning',
  };

  return (
    <Card className={cn("animate-slide-up", variants[variant])}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold mt-1 text-foreground">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
            {trend && (
              <p className={cn(
                "text-xs mt-2 font-medium",
                trend.positive ? "text-success" : "text-destructive"
              )}>
                {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}% from last month
              </p>
            )}
          </div>
          <div className={cn("p-3 rounded-xl", iconVariants[variant])}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
