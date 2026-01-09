import { DashboardLayout } from "@/components/DashboardLayout";
import { projects } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  TrendingUp,
  FolderKanban,
  CheckCircle2,
  AlertTriangle,
  IndianRupee,
} from "lucide-react";

const AdminAnalytics = () => {
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const avgProgress = Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length);
  
  const projectsByType = {
    Road: projects.filter(p => p.type === 'Road').length,
    Water: projects.filter(p => p.type === 'Water').length,
    Electricity: projects.filter(p => p.type === 'Electricity').length,
    Health: projects.filter(p => p.type === 'Health').length,
  };

  const projectsByStatus = {
    'On-track': projects.filter(p => p.status === 'On-track').length,
    'Delayed': projects.filter(p => p.status === 'Delayed').length,
    'Completed': projects.filter(p => p.status === 'Completed').length,
  };

  return (
    <DashboardLayout role="admin" title="Analytics" subtitle="Project performance insights">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-primary/5 border-primary/10">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Progress</p>
                <p className="text-3xl font-bold">{avgProgress}%</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-xl">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Projects</p>
                <p className="text-3xl font-bold">{projects.length}</p>
              </div>
              <div className="p-3 bg-secondary rounded-xl">
                <FolderKanban className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-success/5 border-success/10">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-3xl font-bold">{projectsByStatus['Completed']}</p>
              </div>
              <div className="p-3 bg-success/10 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-warning/5 border-warning/10">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Delayed</p>
                <p className="text-3xl font-bold">{projectsByStatus['Delayed']}</p>
              </div>
              <div className="p-3 bg-warning/10 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Projects by Type */}
        <Card>
          <CardHeader>
            <CardTitle>Projects by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(projectsByType).map(([type, count]) => {
                const percentage = (count / projects.length) * 100;
                const colors: Record<string, string> = {
                  Road: 'bg-amber-500',
                  Water: 'bg-blue-500',
                  Electricity: 'bg-yellow-500',
                  Health: 'bg-red-500',
                };
                return (
                  <div key={type}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">{type}</span>
                      <span className="text-muted-foreground">{count} projects ({percentage.toFixed(0)}%)</span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${colors[type]} rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Budget Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Budget by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Public Works Department', 'Water Supply Board', 'Energy Department', 'Health Ministry'].map(dept => {
                const deptProjects = projects.filter(p => p.department === dept);
                const deptBudget = deptProjects.reduce((sum, p) => sum + p.budget, 0);
                const percentage = (deptBudget / totalBudget) * 100;
                return (
                  <div key={dept}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">{dept}</span>
                      <span className="text-muted-foreground">
                        ₹{(deptBudget / 10000000).toFixed(1)}Cr ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full gradient-primary rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Project Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-8 py-6">
              {Object.entries(projectsByStatus).map(([status, count]) => {
                const colors: Record<string, string> = {
                  'On-track': 'text-info',
                  'Delayed': 'text-warning',
                  'Completed': 'text-success',
                };
                const bgColors: Record<string, string> = {
                  'On-track': 'bg-info/10',
                  'Delayed': 'bg-warning/10',
                  'Completed': 'bg-success/10',
                };
                return (
                  <div key={status} className="text-center">
                    <div className={`w-20 h-20 rounded-full ${bgColors[status]} flex items-center justify-center mb-2`}>
                      <span className={`text-2xl font-bold ${colors[status]}`}>{count}</span>
                    </div>
                    <p className="text-sm font-medium">{status}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Project Update', project: 'Highway NH-48 Expansion', time: '2 hours ago' },
                { action: 'Complaint Resolved', project: 'Ring Road Construction', time: '5 hours ago' },
                { action: 'New Project Added', project: 'Metro Station Phase 2', time: '1 day ago' },
                { action: 'Contractor Assigned', project: 'Water Treatment Plant', time: '2 days ago' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.project}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminAnalytics;
