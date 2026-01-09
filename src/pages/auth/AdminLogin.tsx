import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Admin Login Successful", description: "Welcome to the Admin Dashboard." });
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <Card className="border-border/50 shadow-elevated">
            <CardHeader className="text-center pb-2">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-7 h-7 text-accent" />
              </div>
              <CardTitle className="text-2xl">Admin Portal</CardTitle>
              <CardDescription>
                Secure access to administrative controls
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Admin Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@govtrack.gov"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full gap-2">
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-6">
                Authorized personnel only
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Info */}
      <div className="hidden lg:flex flex-1 gradient-accent items-center justify-center p-12">
        <div className="max-w-md text-accent-foreground">
          <h2 className="text-3xl font-bold mb-4">Administrative Control</h2>
          <p className="text-accent-foreground/80 mb-8">
            Manage all government projects, contractors, and citizen complaints 
            from a centralized dashboard with full administrative privileges.
          </p>
          <div className="space-y-4">
            {['Manage all projects', 'Assign contractors', 'Review complaints', 'View analytics & reports'].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
