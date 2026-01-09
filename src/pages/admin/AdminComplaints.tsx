import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { complaints, formatDate } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Search, Eye, CheckCircle2 } from "lucide-react";

const AdminComplaints = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  const filteredComplaints = complaints.filter(c => {
    const matchesSearch = c.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (complaintId: string, newStatus: string) => {
    toast({ 
      title: "Status Updated", 
      description: `Complaint status changed to ${newStatus}` 
    });
  };

  return (
    <DashboardLayout role="admin" title="All Complaints" subtitle="Review and manage citizen complaints">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search complaints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Submitted">Submitted</SelectItem>
            <SelectItem value="Under Review">Under Review</SelectItem>
            <SelectItem value="Assigned">Assigned</SelectItem>
            <SelectItem value="Resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Complaints List */}
      <div className="space-y-4">
        {filteredComplaints.map(complaint => (
          <Card key={complaint.id} className="animate-fade-in">
            <CardContent className="p-5">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-medium text-muted-foreground">#{complaint.id}</span>
                    <StatusBadge status={complaint.status} />
                    <span className="text-xs bg-secondary px-2 py-0.5 rounded">{complaint.category}</span>
                  </div>
                  <h3 className="font-semibold mb-1">{complaint.projectName}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{complaint.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Filed: {formatDate(complaint.createdAt)}</span>
                    {complaint.assignedTo && (
                      <span>Assigned to: {complaint.assignedTo}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Select 
                    defaultValue={complaint.status}
                    onValueChange={(value) => handleStatusUpdate(complaint.id, value)}
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Submitted">Submitted</SelectItem>
                      <SelectItem value="Under Review">Under Review</SelectItem>
                      <SelectItem value="Assigned">Assigned</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  {complaint.status !== 'Resolved' && (
                    <Button 
                      size="sm" 
                      className="gap-1"
                      onClick={() => handleStatusUpdate(complaint.id, 'Resolved')}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Resolve
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default AdminComplaints;
