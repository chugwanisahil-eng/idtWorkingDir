import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProjectCard } from "@/components/ProjectCard";
import { StatsCard } from "@/components/StatsCard";
import { projects } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FolderKanban, Clock, CheckCircle2, AlertTriangle, Search } from "lucide-react";

const CitizenDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || project.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: projects.length,
    onTrack: projects.filter(p => p.status === 'On-track').length,
    delayed: projects.filter(p => p.status === 'Delayed').length,
    completed: projects.filter(p => p.status === 'Completed').length,
  };

  return (
    <DashboardLayout role="citizen" title="Dashboard" subtitle="Track government projects in your area">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Projects"
          value={stats.total}
          icon={FolderKanban}
          variant="primary"
        />
        <StatsCard
          title="On Track"
          value={stats.onTrack}
          icon={Clock}
          variant="default"
          trend={{ value: 12, positive: true }}
        />
        <StatsCard
          title="Delayed"
          value={stats.delayed}
          icon={AlertTriangle}
          variant="warning"
        />
        <StatsCard
          title="Completed"
          value={stats.completed}
          icon={CheckCircle2}
          variant="accent"
        />
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl p-4 mb-6 shadow-card border border-border/50">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Project Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Road">Road</SelectItem>
              <SelectItem value="Water">Water</SelectItem>
              <SelectItem value="Electricity">Electricity</SelectItem>
              <SelectItem value="Health">Health</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="On-track">On-track</SelectItem>
              <SelectItem value="Delayed">Delayed</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <div key={project.id} style={{ animationDelay: `${index * 0.05}s` }}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <FolderKanban className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No projects found matching your criteria</p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default CitizenDashboard;
