import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HardHat, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContractorLogin = () => {
  const [email, setEmail] = useState('');
  const [contractorId, setContractorId] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Login Successful", description: "Welcome back to the Contractor Portal." });
    navigate('/contractor/dashboard');
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
              <div className="w-14 h-14 rounded-xl bg-warning/10 flex items-center justify-center mx-auto mb-4">
                <HardHat className="w-7 h-7 text-warning" />
              </div>
              <CardTitle className="text-2xl">Contractor Portal</CardTitle>
              <CardDescription>
                Sign in to manage your assigned projects
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contractor@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contractorId">Contractor ID</Label>
                  <Input
                    id="contractorId"
                    type="text"
                    placeholder="CON-XXXXX"
                    value={contractorId}
                    onChange={(e) => setContractorId(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full gap-2">
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-6">
                Contact admin if you don't have contractor credentials
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Info */}
      <div className="hidden lg:flex flex-1 bg-warning/5 items-center justify-center p-12">
        <div className="max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Manage Your Projects</h2>
          <p className="text-muted-foreground mb-8">
            Update project progress, upload documents, and respond to citizen feedback 
            through a streamlined contractor dashboard.
          </p>
          <div className="space-y-4">
            {['Update project progress', 'Upload photos & documents', 'Respond to complaints', 'Track all assigned projects'].map((item) => (
              <div key={item} className="flex items-center gap-3 text-foreground">
                <CheckCircle2 className="w-5 h-5 text-warning" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractorLogin;
