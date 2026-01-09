import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/StatsCard";
import { StatusBadge } from "@/components/StatusBadge";
import { ProgressBar } from "@/components/ProgressBar";
import { projects, contractors, complaints, formatCurrency, formatDate } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FolderKanban,
  Building2,
  MessageSquareWarning,
  IndianRupee,
  ArrowRight,
  Plus,
  TrendingUp,
  Users,
  AlertTriangle,
} from "lucide-react";

const AdminDashboard = () => {
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const avgProgress = Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length);
  
  const stats = {
    totalProjects: projects.length,
    totalContractors: contractors.length,
    pendingComplaints: complaints.filter(c => c.status !== 'Resolved').length,
    totalBudget: formatCurrency(totalBudget),
  };

  const recentProjects = [...projects].sort((a, b) => 
    new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  ).slice(0, 5);

  const pendingComplaints = complaints.filter(c => c.status !== 'Resolved').slice(0, 4);

  return (
    <DashboardLayout role="admin" title="Admin Dashboard" subtitle="Manage all government projects">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Projects"
          value={stats.totalProjects}
          icon={FolderKanban}
          variant="primary"
          trend={{ value: 8, positive: true }}
        />
        <StatsCard
          title="Active Contractors"
          value={stats.totalContractors}
          icon={Building2}
          variant="default"
        />
        <StatsCard
          title="Pending Complaints"
          value={stats.pendingComplaints}
          icon={MessageSquareWarning}
          variant="warning"
        />
        <StatsCard
          title="Total Budget"
          value={stats.totalBudget}
          subtitle="Across all projects"
          icon={IndianRupee}
          variant="accent"
        />
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link to="/admin/projects/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add New Project
          </Button>
        </Link>
        <Link to="/admin/contractors">
          <Button variant="outline" className="gap-2">
            <Users className="w-4 h-4" />
            Manage Contractors
          </Button>
        </Link>
        <Link to="/admin/analytics">
          <Button variant="outline" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            View Analytics
          </Button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Projects Overview */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Projects</CardTitle>
              <Link to="/admin/projects">
                <Button variant="ghost" size="sm" className="gap-1">
                  View All <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Project</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Contractor</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Progress</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentProjects.map(project => (
                      <tr key={project.id} className="border-b border-border/50 hover:bg-secondary/30">
                        <td className="py-3 px-2">
                          <div>
                            <p className="font-medium text-sm">{project.name}</p>
                            <p className="text-xs text-muted-foreground">{project.department}</p>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-sm">{project.contractor}</td>
                        <td className="py-3 px-2 w-32">
                          <ProgressBar value={project.progress} size="sm" showLabel={false} />
                          <span className="text-xs text-muted-foreground">{project.progress}%</span>
                        </td>
                        <td className="py-3 px-2">
                          <StatusBadge status={project.status} />
                        </td>
                        <td className="py-3 px-2 text-right">
                          <Link to={`/admin/projects/${project.id}`}>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Progress Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Road', 'Water', 'Electricity', 'Health'].map(type => {
                  const typeProjects = projects.filter(p => p.type === type);
                  const avgTypeProgress = typeProjects.length > 0
                    ? Math.round(typeProjects.reduce((sum, p) => sum + p.progress, 0) / typeProjects.length)
                    : 0;
                  return (
                    <div key={type}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{type} Projects</span>
                        <span className="text-muted-foreground">{avgTypeProgress}% avg</span>
                      </div>
                      <ProgressBar value={avgTypeProgress} size="sm" showLabel={false} />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pending Complaints */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Pending Complaints
              </CardTitle>
              <Link to="/admin/complaints">
                <Button variant="ghost" size="sm" className="gap-1">
                  View All <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingComplaints.map(complaint => (
                <div key={complaint.id} className="p-3 bg-secondary/30 rounded-lg">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-sm font-medium line-clamp-1">{complaint.projectName}</p>
                    <StatusBadge status={complaint.status} />
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{complaint.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">{formatDate(complaint.createdAt)}</span>
                    <Button size="sm" variant="ghost" className="h-6 text-xs">Review</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Contractors */}
          <Card>
            <CardHeader>
              <CardTitle>Top Contractors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {contractors.slice(0, 4).map(contractor => (
                <div key={contractor.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{contractor.name}</p>
                    <p className="text-xs text-muted-foreground">{contractor.projects.length} projects</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-warning">★ {contractor.rating}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
