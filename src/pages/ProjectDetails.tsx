import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { ProgressBar } from "@/components/ProgressBar";
import { projects, formatCurrency, formatDate } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Building2,
  IndianRupee,
  FileText,
  Image,
  AlertTriangle,
  MessageSquareWarning,
  User,
  Phone,
  Mail,
} from "lucide-react";

interface ProjectDetailsProps {
  role: 'citizen' | 'contractor';
}

const ProjectDetails = ({ role }: ProjectDetailsProps) => {
  const { projectId } = useParams();
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <DashboardLayout role={role} title="Project Not Found">
        <div className="text-center py-12">
          <p className="text-muted-foreground">The requested project could not be found.</p>
          <Link to={`/${role}/dashboard`}>
            <Button variant="outline" className="mt-4">Back to Dashboard</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role={role} title={project.name} subtitle={project.department}>
      <Link to={`/${role}/dashboard`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Projects
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview Card */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle>Project Overview</CardTitle>
                <StatusBadge status={project.status} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">{project.description}</p>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">Progress</h4>
                <ProgressBar value={project.progress} size="lg" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                  <IndianRupee className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Budget</p>
                    <p className="font-semibold">{formatCurrency(project.budget)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="font-semibold">{project.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Start Date</p>
                    <p className="font-semibold">{formatDate(project.startDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">End Date</p>
                    <p className="font-semibold">{formatDate(project.endDate)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delay Reason */}
          {project.delayReason && (
            <Card className="border-warning/30 bg-warning/5">
              <CardContent className="p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                <div>
                  <h4 className="font-medium text-warning">Delay Reason</h4>
                  <p className="text-sm text-muted-foreground mt-1">{project.delayReason}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Project Gallery */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="w-5 h-5" />
                Project Gallery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.images.map((img, i) => (
                  <div key={i} className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
                    <Image className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {project.documents.map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium">{doc}</span>
                    </div>
                    <Button variant="ghost" size="sm">Download</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contractor Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Contractor Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{project.contractor}</p>
                  <p className="text-sm text-muted-foreground">Contractor ID: {project.contractorId}</p>
                </div>
              </div>
              <div className="space-y-2 pt-2 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>contact@contractor.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6 space-y-6">
                <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-border" />
                
                <div className="relative">
                  <div className="absolute -left-4 w-3 h-3 rounded-full bg-success border-2 border-card" />
                  <p className="text-sm font-medium">Project Started</p>
                  <p className="text-xs text-muted-foreground">{formatDate(project.startDate)}</p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-4 w-3 h-3 rounded-full bg-info border-2 border-card" />
                  <p className="text-sm font-medium">Current Progress</p>
                  <p className="text-xs text-muted-foreground">{project.progress}% Complete</p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-4 w-3 h-3 rounded-full bg-muted border-2 border-card" />
                  <p className="text-sm font-medium">Expected Completion</p>
                  <p className="text-xs text-muted-foreground">{formatDate(project.endDate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Complaint Button */}
          {role === 'citizen' && (
            <Link to={`/citizen/complaints/new?projectId=${project.id}`}>
              <Button className="w-full gap-2" variant="outline">
                <MessageSquareWarning className="w-4 h-4" />
                Submit Complaint
              </Button>
            </Link>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectDetails;
