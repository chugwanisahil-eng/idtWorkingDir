import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressBar = ({ value, className, showLabel = true, size = 'md' }: ProgressBarProps) => {
  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const getColor = (val: number) => {
    if (val >= 75) return 'bg-success';
    if (val >= 50) return 'bg-info';
    if (val >= 25) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <div className={cn("w-full", className)}>
      <div className={cn("w-full bg-secondary rounded-full overflow-hidden", heights[size])}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            getColor(value)
          )}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-muted-foreground mt-1 block">
          {value}% Complete
        </span>
      )}
    </div>
  );
};
