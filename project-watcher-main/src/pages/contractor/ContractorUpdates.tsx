import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { projects } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Image, CheckCircle2, ArrowRight } from "lucide-react";

const ContractorUpdates = () => {
  const [searchParams] = useSearchParams();
  const preselectedProjectId = searchParams.get('projectId');
  const { toast } = useToast();
  
  const contractorId = 'CON001';
  const myProjects = projects.filter(p => p.contractorId === contractorId);
  
  const [selectedProject, setSelectedProject] = useState(preselectedProjectId || '');
  const [progress, setProgress] = useState([50]);
  const [notes, setNotes] = useState('');
  const [delayReason, setDelayReason] = useState('');

  const currentProject = myProjects.find(p => p.id === selectedProject);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ 
      title: "Update Submitted", 
      description: "Your progress update has been submitted for admin review." 
    });
  };

  return (
    <DashboardLayout role="contractor" title="Submit Updates" subtitle="Update project progress and upload documents">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Update Form */}
        <Card>
          <CardHeader>
            <CardTitle>Progress Update</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label>Select Project</Label>
                <Select value={selectedProject} onValueChange={setSelectedProject} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {myProjects.map(project => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {currentProject && (
                <>
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Current Progress</p>
                    <p className="text-2xl font-bold">{currentProject.progress}%</p>
                  </div>

                  <div className="space-y-4">
                    <Label>Updated Progress: {progress[0]}%</Label>
                    <Slider
                      value={progress}
                      onValueChange={setProgress}
                      min={currentProject.progress}
                      max={100}
                      step={1}
                      className="py-4"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Progress Notes</Label>
                    <Textarea
                      placeholder="Describe the work completed..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                    />
                  </div>

                  {currentProject.status === 'Delayed' && (
                    <div className="space-y-2">
                      <Label>Delay Reason Update</Label>
                      <Textarea
                        placeholder="Update the delay reason if applicable..."
                        value={delayReason}
                        onChange={(e) => setDelayReason(e.target.value)}
                        rows={2}
                      />
                    </div>
                  )}

                  <Button type="submit" className="w-full gap-2">
                    Submit Update
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Upload Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="w-5 h-5" />
                Upload Photos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm font-medium">Drop progress photos here</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB each</p>
                <Button variant="outline" className="mt-4">Browse Files</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Upload Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm font-medium">Drop documents here</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, DOC up to 25MB each</p>
                <Button variant="outline" className="mt-4">Browse Files</Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Uploads */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Uploads</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {['progress_photo_nov28.jpg', 'site_report.pdf', 'milestone_2_completion.pdf'].map((file, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    {file.endsWith('.pdf') ? (
                      <FileText className="w-5 h-5 text-destructive" />
                    ) : (
                      <Image className="w-5 h-5 text-info" />
                    )}
                    <span className="text-sm">{file}</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-success" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContractorUpdates;
