import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Bell, 
  Calendar, 
  CheckCircle2, 
  Heart, 
  Pill, 
  Target, 
  TrendingUp,
  Award,
  Clock
} from "lucide-react";

const PatientDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/30 to-secondary-light/30">
      {/* Header */}
      <header className="bg-background border-b border-border p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Good Morning, Sarah!</h1>
            <p className="text-muted-foreground">Let's keep your health on track today</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 space-y-6">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/80">Today's Score</p>
                  <p className="text-2xl font-bold">92%</p>
                </div>
                <Target className="w-8 h-8" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary text-secondary-foreground">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary-foreground/80">Streak</p>
                  <p className="text-2xl font-bold">12 Days</p>
                </div>
                <Award className="w-8 h-8" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground">Medications</p>
                  <p className="text-2xl font-bold text-foreground">3/4</p>
                </div>
                <Pill className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground">Next Checkup</p>
                  <p className="text-2xl font-bold text-foreground">5 Days</p>
                </div>
                <Calendar className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Medications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Pill className="w-5 h-5 text-primary" />
                  <span>Today's Medications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-success-light rounded-lg border border-success/20">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-6 h-6 text-success" />
                    <div>
                      <h4 className="font-medium text-foreground">Metformin 500mg</h4>
                      <p className="text-sm text-muted-foreground">Taken at 8:00 AM</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-6 h-6 text-warning" />
                    <div>
                      <h4 className="font-medium text-foreground">Lisinopril 10mg</h4>
                      <p className="text-sm text-muted-foreground">Due at 2:00 PM</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-primary">Take Now</Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-6 h-6 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium text-foreground">Atorvastatin 20mg</h4>
                      <p className="text-sm text-muted-foreground">Due at 9:00 PM</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Remind Me</Button>
                </div>
              </CardContent>
            </Card>

            {/* Health Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                  <span>Health Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Blood Sugar Control</span>
                      <span className="text-sm text-muted-foreground">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Medication Adherence</span>
                      <span className="text-sm text-muted-foreground">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Exercise Goals</span>
                      <span className="text-sm text-muted-foreground">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-destructive" />
                  <span>AI Health Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
                  <p className="text-sm font-medium text-foreground">Blood Pressure Alert</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your readings have been slightly elevated. Consider reducing sodium intake.
                  </p>
                </div>
                
                <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                  <p className="text-sm font-medium text-foreground">Great Progress!</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your medication adherence has improved by 15% this month.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>Upcoming</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-card rounded-lg border border-border">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Dr. Sharma</p>
                    <p className="text-sm text-muted-foreground">Jan 15, 2:30 PM</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-card rounded-lg border border-border">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Lab Tests</p>
                    <p className="text-sm text-muted-foreground">Jan 18, 9:00 AM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gamification */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-warning" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Health Points</span>
                    <span className="font-bold text-primary">2,450</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Current Streak</span>
                    <span className="font-bold text-secondary">12 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Next Reward</span>
                    <span className="text-xs text-muted-foreground">550 points left</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;