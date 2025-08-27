import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Shield, User, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-secondary-light flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-lg">
            <Heart className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">HealthMate AI</h1>
          <p className="text-muted-foreground">Your Digital Follow-up Nurse</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-2xl border-0 bg-background/95 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-foreground">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Sign in to continue your health journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="patient" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="patient" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Patient</span>
                </TabsTrigger>
                <TabsTrigger value="doctor" className="flex items-center space-x-2">
                  <Stethoscope className="w-4 h-4" />
                  <span>Doctor</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="patient" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="patient-email">Email</Label>
                  <Input 
                    id="patient-email" 
                    type="email" 
                    placeholder="Enter your email"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patient-password">Password</Label>
                  <Input 
                    id="patient-password" 
                    type="password" 
                    placeholder="Enter your password"
                    className="h-12"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Shield className="w-4 h-4 mr-2" />
                  Sign In as Patient
                </Button>
              </TabsContent>

              <TabsContent value="doctor" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="doctor-email">Email</Label>
                  <Input 
                    id="doctor-email" 
                    type="email" 
                    placeholder="Enter your professional email"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor-password">Password</Label>
                  <Input 
                    id="doctor-password" 
                    type="password" 
                    placeholder="Enter your password"
                    className="h-12"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Button className="w-full h-12 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Sign In as Doctor
                </Button>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary font-medium hover:underline">
                Sign up here
              </Link>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-center text-muted-foreground">
                By signing in, you agree to our{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;