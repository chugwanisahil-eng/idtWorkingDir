import { useState } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/StatsCard";
import { StatusBadge } from "@/components/StatusBadge";
import { ProgressBar } from "@/components/ProgressBar";
import { projects, complaints, formatCurrency, formatDate } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderKanban, AlertTriangle, CheckCircle2, MessageSquareWarning, ArrowRight, Upload } from "lucide-react";

const ContractorDashboard = () => {
  // Filter projects for this contractor (CON001)
  const contractorId = 'CON001';
  const myProjects = projects.filter(p => p.contractorId === contractorId);
  const myComplaints = complaints.filter(c => c.assignedTo === contractorId);

  const stats = {
    totalProjects: myProjects.length,
    activeProjects: myProjects.filter(p => p.status !== 'Completed').length,
    completedProjects: myProjects.filter(p => p.status === 'Completed').length,
    pendingComplaints: myComplaints.filter(c => c.status !== 'Resolved').length,
  };

  return (
    <DashboardLayout role="contractor" title="Dashboard" subtitle="Manage your assigned projects">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Projects"
          value={stats.totalProjects}
          icon={FolderKanban}
          variant="primary"
        />
        <StatsCard
          title="Active Projects"
          value={stats.activeProjects}
          icon={AlertTriangle}
          variant="warning"
        />
        <StatsCard
          title="Completed"
          value={stats.completedProjects}
          icon={CheckCircle2}
          variant="accent"
        />
        <StatsCard
          title="Pending Complaints"
          value={stats.pendingComplaints}
          icon={MessageSquareWarning}
          variant="default"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Projects List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>My Projects</CardTitle>
              <Link to="/contractor/projects">
                <Button variant="ghost" size="sm" className="gap-1">
                  View All <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {myProjects.map(project => (
                <div key={project.id} className="p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Link to={`/contractor/project/${project.id}`} className="font-semibold hover:text-primary transition-colors">
                        {project.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">{project.department}</p>
                    </div>
                    <StatusBadge status={project.status} />
                  </div>
                  <ProgressBar value={project.progress} size="sm" />
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-muted-foreground">
                      Budget: {formatCurrency(project.budget)}
                    </span>
                    <Link to={`/contractor/updates?projectId=${project.id}`}>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Upload className="w-3 h-3" />
                        Update
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Complaints */}
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Assigned Complaints</CardTitle>
              <Link to="/contractor/complaints">
                <Button variant="ghost" size="sm" className="gap-1">
                  View All <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {myComplaints.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No complaints assigned</p>
              ) : (
                myComplaints.slice(0, 3).map(complaint => (
                  <div key={complaint.id} className="p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-medium line-clamp-1">{complaint.projectName}</p>
                      <StatusBadge status={complaint.status} />
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{complaint.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">{formatDate(complaint.createdAt)}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContractorDashboard;
