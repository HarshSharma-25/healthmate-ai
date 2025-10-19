import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Bell, Calendar, MessageSquare, Pill, Shield } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "AI Health Assistant",
    description: "24/7 access to intelligent health guidance and personalized care recommendations.",
  },
  {
    icon: Pill,
    title: "Medication Tracking",
    description: "Never miss a dose with smart reminders and medication interaction alerts.",
  },
  {
    icon: Calendar,
    title: "Appointment Management",
    description: "Seamlessly schedule and manage all your healthcare appointments in one place.",
  },
  {
    icon: Activity,
    title: "Health Monitoring",
    description: "Track vital signs, symptoms, and health trends with intuitive dashboards.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Timely alerts for medications, appointments, and important health updates.",
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Your health data is encrypted and protected with enterprise-grade security.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-4 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            Powerful Features for Better Health
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage your healthcare journey in one intelligent platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-primary/10"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
