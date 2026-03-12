import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "react-router-dom";
import {
  Heart,
  Activity,
  Droplets,
  Moon,
  TrendingUp,
  MessageCircle,
  Pill,
  Bell,
  Settings,
  Home,
  Phone,
  Bot,
  User,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: Home, path: "/dashboard" },
  { label: "Vitals", icon: Activity, path: "/dashboard" },
  { label: "AI Nurse", icon: MessageCircle, path: "/dashboard" },
  { label: "Prescriptions", icon: Pill, path: "/dashboard" },
  { label: "Reminders", icon: Bell, path: "/dashboard" },
  { label: "Settings", icon: Settings, path: "/dashboard" },
];

const vitalsCards = [
  { label: "Heart Rate", value: "--", icon: Heart, color: "bg-primary" },
  { label: "Blood Pressure", value: "--/--", icon: Activity, color: "bg-secondary" },
  { label: "Blood Sugar", value: "--", icon: Droplets, color: "bg-primary" },
  { label: "Sleep Hours", value: "--", icon: Moon, color: "bg-secondary" },
];

const PatientDashboard = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Top Navbar */}
      <header className="bg-card border-b border-border sticky top-0 z-30">
        <div className="container mx-auto flex items-center justify-between px-4 h-14">
          <Link to="/" className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            <span className="font-bold text-foreground text-lg">Health Mate AI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = item.label === "Dashboard";
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 md:p-6 space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                <User className="w-8 h-8 text-muted-foreground" />
              </div>
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-secondary rounded-full border-2 border-card" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary">
                Welcome back, User
              </h1>
              <p className="text-muted-foreground flex items-center gap-1">
                <Activity className="w-4 h-4" />
                Here's your health summary for today
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Phone className="w-4 h-4" />
              Reminder Calls
            </Button>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Bot className="w-4 h-4" />
              Chat with Offline AI
            </Button>
          </div>
        </div>

        {/* Vitals Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {vitalsCards.map((card) => (
            <Card key={card.label} className="bg-card">
              <CardContent className="p-5">
                <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center mb-4`}>
                  <card.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <p className="text-2xl font-bold text-foreground">{card.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{card.label}</p>
                <Badge variant="outline" className="mt-2 text-xs font-normal text-muted-foreground">
                  unknown
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* 7-Day Vitals Trends */}
          <Card className="border-2 border-primary/20">
            <CardHeader className="bg-primary/5 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="w-5 h-5 text-primary" />
                7-Day Vitals Trends
              </CardTitle>
              <CardDescription>Blood pressure and heart rate tracking</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center min-h-[250px]">
              <div className="text-center text-muted-foreground">
                <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-medium">No vitals data recorded yet</p>
                <p className="text-sm mt-1">Visit the Vitals page to start tracking your health</p>
              </div>
            </CardContent>
          </Card>

          {/* Health Risk Score */}
          <Card className="border-2 border-secondary/20">
            <CardHeader className="bg-secondary/5 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Heart className="w-5 h-5 text-secondary" />
                Health Risk Score
              </CardTitle>
              <CardDescription>Overall health assessment based on vitals</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center min-h-[250px] gap-4">
              <div className="relative">
                <div className="w-4 h-4 bg-secondary rounded-full mx-auto mb-2" />
                <p className="text-5xl font-bold text-foreground">0</p>
                <p className="text-sm text-muted-foreground text-center mt-1">Risk Score</p>
              </div>

              <div className="flex items-center gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary" /> Low (0-30)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-warning" /> Medium (31-70)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-destructive" /> High (71-100)
                </span>
              </div>

              <div className="w-full flex items-center justify-between mt-2">
                <span className="text-sm text-muted-foreground">Risk Level</span>
                <Badge className="bg-secondary/10 text-secondary border-secondary/20">Low Risk</Badge>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Your vitals are within healthy ranges. Keep up the good work!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
