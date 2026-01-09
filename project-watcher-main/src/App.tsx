import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Auth Pages
import CitizenLogin from "./pages/auth/CitizenLogin";
import ContractorLogin from "./pages/auth/ContractorLogin";
import AdminLogin from "./pages/auth/AdminLogin";

// Citizen Pages
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import CitizenComplaints from "./pages/citizen/CitizenComplaints";
import ProjectDetails from "./pages/ProjectDetails";

// Contractor Pages
import ContractorDashboard from "./pages/contractor/ContractorDashboard";
import ContractorUpdates from "./pages/contractor/ContractorUpdates";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminComplaints from "./pages/admin/AdminComplaints";
import AdminAnalytics from "./pages/admin/AdminAnalytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing */}
          <Route path="/" element={<Index />} />
          
          {/* Auth Routes */}
          <Route path="/citizen/login" element={<CitizenLogin />} />
          <Route path="/contractor/login" element={<ContractorLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Citizen Routes */}
          <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
          <Route path="/citizen/projects" element={<CitizenDashboard />} />
          <Route path="/citizen/project/:projectId" element={<ProjectDetails role="citizen" />} />
          <Route path="/citizen/complaints" element={<CitizenComplaints />} />
          <Route path="/citizen/complaints/new" element={<CitizenComplaints />} />
          
          {/* Contractor Routes */}
          <Route path="/contractor/dashboard" element={<ContractorDashboard />} />
          <Route path="/contractor/projects" element={<ContractorDashboard />} />
          <Route path="/contractor/project/:projectId" element={<ProjectDetails role="contractor" />} />
          <Route path="/contractor/updates" element={<ContractorUpdates />} />
          <Route path="/contractor/complaints" element={<ContractorDashboard />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/projects/new" element={<AdminProjects />} />
          <Route path="/admin/projects/:projectId" element={<AdminProjects />} />
          <Route path="/admin/contractors" element={<AdminDashboard />} />
          <Route path="/admin/complaints" element={<AdminComplaints />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/users" element={<AdminDashboard />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
