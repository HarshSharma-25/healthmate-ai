import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Shield, Smartphone } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-light via-background to-secondary-light min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Heart className="w-4 h-4 mr-2" />
                AI-Powered Healthcare Companion
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                Your Digital
                <span className="text-primary block">Follow-up Nurse</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                HealthMate AI helps chronic patients stay consistent with their treatment through 
                personalized reminders, AI-driven insights, and seamless doctor-patient communication.
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Personalized Care</h3>
                  <p className="text-sm text-muted-foreground">AI-driven health insights</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Smart Reminders</h3>
                  <p className="text-sm text-muted-foreground">Never miss medication</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
              <a href="/login">
                Start Your Health Journey
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5" asChild>
              <a href="/login">For Healthcare Providers</a>
            </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Adherence Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">50K+</div>
                <div className="text-sm text-muted-foreground">Patients Helped</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">AI Support</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/healthcare-hero-635w.jpg" 
                srcSet="/healthcare-hero-400w.jpg 400w, /healthcare-hero-635w.jpg 635w, /healthcare-hero-800w.jpg 800w"
                sizes="(max-width: 640px) 400px, (max-width: 1024px) 635px, 800px"
                alt="HealthMate AI - Digital healthcare companion showing patient monitoring and care" 
                className="w-full h-auto"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-4 -left-4 bg-card rounded-lg shadow-lg p-4 border border-border">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Medication Reminder</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Take your morning dose</p>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-card rounded-lg shadow-lg p-4 border border-border">
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-destructive" />
                <span className="text-sm font-medium">Health Alert</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Schedule checkup</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;