import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building2, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Step = 'aadhaar' | 'otp' | 'register' | 'login';

const CitizenLogin = () => {
  const [step, setStep] = useState<Step>('login');
  const [aadhaar, setAadhaar] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAadhaarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aadhaar.length === 12) {
      toast({ title: "OTP Sent", description: "A verification code has been sent to your registered mobile." });
      setStep('otp');
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      toast({ title: "Aadhaar Verified", description: "Your identity has been verified successfully." });
      setStep('register');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Registration Complete", description: "Welcome to GovTrack!" });
    navigate('/citizen/dashboard');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "OTP Sent", description: "Please check your email for the login code." });
    setTimeout(() => {
      navigate('/citizen/dashboard');
    }, 1000);
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
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-7 h-7 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">
                {step === 'login' ? 'Welcome Back' : 
                 step === 'aadhaar' ? 'Aadhaar Verification' :
                 step === 'otp' ? 'Enter OTP' : 'Complete Registration'}
              </CardTitle>
              <CardDescription>
                {step === 'login' ? 'Sign in with your email to continue' :
                 step === 'aadhaar' ? 'Verify your identity using Aadhaar' :
                 step === 'otp' ? 'Enter the 6-digit code sent to your mobile' :
                 'Link your email for future logins'}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              {step === 'login' && (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="citizen@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2">
                    Send Login OTP
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">New to GovTrack?</span>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setStep('aadhaar')}
                  >
                    Register with Aadhaar
                  </Button>
                </form>
              )}

              {step === 'aadhaar' && (
                <form onSubmit={handleAadhaarSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="aadhaar">Aadhaar Number</Label>
                    <Input
                      id="aadhaar"
                      type="text"
                      placeholder="XXXX XXXX XXXX"
                      maxLength={12}
                      value={aadhaar}
                      onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ''))}
                      required
                    />
                    <p className="text-xs text-muted-foreground">Enter your 12-digit Aadhaar number</p>
                  </div>
                  <Button type="submit" className="w-full gap-2" disabled={aadhaar.length !== 12}>
                    Verify Aadhaar
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button type="button" variant="ghost" className="w-full" onClick={() => setStep('login')}>
                    Back to Login
                  </Button>
                </form>
              )}

              {step === 'otp' && (
                <form onSubmit={handleOtpSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp">Verification Code</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="XXXXXX"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      className="text-center text-2xl tracking-widest"
                      required
                    />
                    <p className="text-xs text-muted-foreground text-center">
                      Enter the code sent to your Aadhaar-linked mobile
                    </p>
                  </div>
                  <Button type="submit" className="w-full gap-2" disabled={otp.length !== 6}>
                    Verify OTP
                    <CheckCircle2 className="w-4 h-4" />
                  </Button>
                  <Button type="button" variant="ghost" className="w-full" onClick={() => setStep('aadhaar')}>
                    Resend Code
                  </Button>
                </form>
              )}

              {step === 'register' && (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="p-3 bg-success/10 rounded-lg flex items-center gap-3 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span className="text-sm text-success">Aadhaar verified successfully</span>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email Address</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      You'll use this email for future logins
                    </p>
                  </div>
                  <Button type="submit" className="w-full gap-2">
                    Complete Registration
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Info */}
      <div className="hidden lg:flex flex-1 gradient-hero items-center justify-center p-12">
        <div className="max-w-md text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">Track Public Projects</h2>
          <p className="text-primary-foreground/80 mb-8">
            Access real-time updates on government infrastructure projects in your area. 
            Monitor progress, view documents, and ensure accountability.
          </p>
          <div className="space-y-4">
            {['View all city projects', 'Track progress & timelines', 'File and monitor complaints'].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenLogin;
