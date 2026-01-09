import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { complaints, projects, formatDate } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  MessageSquareWarning,
  Calendar,
  FolderKanban,
  Upload,
  ArrowRight,
} from "lucide-react";

const CitizenComplaints = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const preselectedProjectId = searchParams.get('projectId');
  
  const [showForm, setShowForm] = useState(!!preselectedProjectId);
  const [selectedProject, setSelectedProject] = useState(preselectedProjectId || '');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const userComplaints = complaints.filter(c => c.citizenId === 'CIT001');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ 
      title: "Complaint Submitted", 
      description: "Your complaint has been registered and will be reviewed shortly." 
    });
    setShowForm(false);
    setSelectedProject('');
    setCategory('');
    setDescription('');
  };

  const getStatusSteps = (status: string) => {
    const steps = ['Submitted', 'Under Review', 'Assigned', 'Resolved'];
    const currentIndex = steps.indexOf(status);
    return steps.map((step, i) => ({
      label: step,
      completed: i <= currentIndex,
      current: i === currentIndex,
    }));
  };

  return (
    <DashboardLayout role="citizen" title="My Complaints" subtitle="File and track your complaints">
      <Tabs defaultValue={showForm ? 'new' : 'history'} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="history">Complaint History</TabsTrigger>
            <TabsTrigger value="new">New Complaint</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="history" className="space-y-4">
          {userComplaints.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <MessageSquareWarning className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground">You haven't filed any complaints yet.</p>
                <Button className="mt-4 gap-2" onClick={() => setShowForm(true)}>
                  <Plus className="w-4 h-4" />
                  File Your First Complaint
                </Button>
              </CardContent>
            </Card>
          ) : (
            userComplaints.map((complaint) => (
              <Card key={complaint.id} className="animate-fade-in">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-muted-foreground">#{complaint.id}</span>
                        <StatusBadge status={complaint.status} />
                      </div>
                      <h3 className="font-semibold">{complaint.projectName}</h3>
                      <p className="text-sm text-muted-foreground">{complaint.category}</p>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      {formatDate(complaint.createdAt)}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {complaint.description}
                  </p>

                  {/* Status Progress */}
                  <div className="flex items-center gap-1">
                    {getStatusSteps(complaint.status).map((step, i) => (
                      <div key={step.label} className="flex-1">
                        <div className="flex items-center">
                          <div className={`h-1.5 flex-1 rounded-full ${
                            step.completed ? 'bg-primary' : 'bg-secondary'
                          }`} />
                        </div>
                        <p className={`text-xs mt-1 ${
                          step.current ? 'text-primary font-medium' : 'text-muted-foreground'
                        }`}>
                          {step.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle>File a New Complaint</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label>Select Project</Label>
                  <Select value={selectedProject} onValueChange={setSelectedProject} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose the project this complaint is about" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map(project => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select complaint category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Road issue">Road issue</SelectItem>
                      <SelectItem value="Delay issue">Delay issue</SelectItem>
                      <SelectItem value="Service problem">Service problem</SelectItem>
                      <SelectItem value="Quality concern">Quality concern</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Describe your complaint in detail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Attach Image (Optional)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                </div>

                <Button type="submit" className="w-full gap-2">
                  Submit Complaint
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default CitizenComplaints;
