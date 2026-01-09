import { Link } from "react-router-dom";
import { Project, formatCurrency, formatDate } from "@/data/mockData";
import { StatusBadge } from "./StatusBadge";
import { ProgressBar } from "./ProgressBar";
import { Card, CardContent } from "./ui/card";
import { MapPin, Calendar, Building2, IndianRupee } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  linkPrefix?: string;
}

export const ProjectCard = ({ project, linkPrefix = '/citizen' }: ProjectCardProps) => {
  const typeColors = {
    Road: 'bg-amber-500',
    Water: 'bg-blue-500',
    Electricity: 'bg-yellow-500',
    Health: 'bg-red-500',
  };

  return (
    <Link to={`${linkPrefix}/project/${project.id}`}>
      <Card className="group hover:shadow-elevated transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/20 animate-fade-in">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2 h-2 rounded-full ${typeColors[project.type]}`} />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {project.type}
                </span>
              </div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                {project.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{project.department}</p>
            </div>
            <StatusBadge status={project.status} />
          </div>

          <ProgressBar value={project.progress} size="md" className="mb-4" />

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <IndianRupee className="w-4 h-4" />
              <span className="truncate">{formatCurrency(project.budget)}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="w-4 h-4" />
              <span className="truncate">{project.contractor}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(project.endDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{project.location}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
