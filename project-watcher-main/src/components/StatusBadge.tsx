import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: 'On-track' | 'Delayed' | 'Completed' | 'Submitted' | 'Under Review' | 'Assigned' | 'Resolved';
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const variants = {
    'On-track': 'bg-info/10 text-info border-info/20',
    'Delayed': 'bg-warning/10 text-warning border-warning/20',
    'Completed': 'bg-success/10 text-success border-success/20',
    'Submitted': 'bg-muted text-muted-foreground border-border',
    'Under Review': 'bg-warning/10 text-warning border-warning/20',
    'Assigned': 'bg-info/10 text-info border-info/20',
    'Resolved': 'bg-success/10 text-success border-success/20',
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variants[status],
        className
      )}
    >
      {status}
    </span>
  );
};
