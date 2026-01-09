import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  Users,
  HardHat,
  ShieldCheck,
  BarChart3,
  FileCheck,
  Eye,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Eye,
      title: "Complete Transparency",
      description: "Track every government project from inception to completion with real-time updates.",
    },
    {
      icon: BarChart3,
      title: "Progress Monitoring",
      description: "Visual progress bars and detailed timelines keep citizens informed at every stage.",
    },
    {
      icon: FileCheck,
      title: "Document Access",
      description: "Access project documents, budgets, and contractor details in one place.",
    },
    {
      icon: ShieldCheck,
      title: "Accountability",
      description: "File complaints and track resolution status to ensure project quality.",
    },
  ];

  const stats = [
    { value: "150+", label: "Active Projects" },
    { value: "₹2,500Cr", label: "Budget Tracked" },
    { value: "12,000+", label: "Citizens Engaged" },
    { value: "98%", label: "Complaint Resolution" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-95" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5 bg-cover bg-center" />
        
        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 backdrop-blur flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg text-primary-foreground">GovTrack</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/citizen/login">
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                Sign In
              </Button>
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 px-6 py-24 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur rounded-full px-4 py-2 mb-6 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <span className="text-sm text-primary-foreground/90">Trusted by 50+ Government Departments</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 animate-slide-up leading-tight">
            Transparent Government<br />Project Tracker
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Empowering citizens with real-time visibility into public infrastructure projects. 
            Track progress, access documents, and ensure accountability.
          </p>

          {/* Login Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/citizen/login">
              <Button size="lg" className="w-full sm:w-auto bg-primary-foreground text-foreground hover:bg-primary-foreground/90 gap-2">
                <Users className="w-5 h-5" />
                Citizen Login
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/contractor/login">
              <Button size="lg" className="w-full sm:w-auto bg-primary-foreground/10 border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 gap-2">
                <HardHat className="w-5 h-5" />
                Contractor Login
              </Button>
            </Link>
            <Link to="/admin/login">
              <Button size="lg" className="w-full sm:w-auto bg-primary-foreground/10 border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 gap-2">
                <ShieldCheck className="w-5 h-5" />
                Admin Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Complete Project Visibility
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform brings transparency to government projects, enabling citizens 
              to track progress and hold authorities accountable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="bg-card border-border/50 hover:shadow-elevated transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Track Your City's Progress?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of citizens who are actively monitoring public projects in their communities.
          </p>
          <Link to="/citizen/login">
            <Button size="lg" className="gap-2">
              Get Started Now
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sidebar text-sidebar-foreground py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold">GovTrack</p>
                <p className="text-xs text-sidebar-foreground/60">Transparent Government Project Tracker</p>
              </div>
            </div>
            <p className="text-sm text-sidebar-foreground/60">
              © 2024 GovTrack. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
