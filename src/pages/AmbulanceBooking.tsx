import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Ambulance, ArrowLeft } from "lucide-react";
import { z } from "zod";

const bookingSchema = z.object({
  patient_name: z.string().min(1, "Patient name is required").max(100),
  patient_phone: z.string().min(10, "Valid phone number required").max(15),
  pickup_address: z.string().min(5, "Pickup address is required").max(200),
  destination_address: z.string().min(5, "Destination address is required").max(200),
  emergency_type: z.string().min(3, "Emergency type is required").max(100),
});

const AmbulanceBooking = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    patient_name: "",
    patient_phone: "",
    pickup_address: "",
    destination_address: "",
    emergency_type: "",
    ambulance_type: "basic",
  });

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please sign in to book an ambulance.",
      });
      navigate("/login");
      return;
    }
    setUser(user);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form data
      bookingSchema.parse(formData);

      if (!user) {
        throw new Error("User not authenticated");
      }

      const { error } = await supabase.from("ambulance_bookings").insert({
        user_id: user.id,
        patient_name: formData.patient_name,
        patient_phone: formData.patient_phone,
        pickup_address: formData.pickup_address,
        destination_address: formData.destination_address,
        emergency_type: formData.emergency_type,
        status: "pending",
      });

      if (error) throw error;

      toast({
        title: "Booking Successful!",
        description: "An ambulance will be assigned to you shortly.",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Booking failed",
        description: error.message || "Please check your information and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto p-6 max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/ambulance-tracking")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tracking
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-3xl">
              <Ambulance className="h-8 w-8 text-primary" />
              Book an Ambulance
            </CardTitle>
            <p className="text-muted-foreground">Fill in the details for emergency ambulance service</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patient_name">Patient Name *</Label>
                  <Input
                    id="patient_name"
                    placeholder="Enter patient name"
                    value={formData.patient_name}
                    onChange={(e) =>
                      setFormData({ ...formData, patient_name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patient_phone">Contact Number *</Label>
                  <Input
                    id="patient_phone"
                    type="tel"
                    placeholder="+91-XXXXXXXXXX"
                    value={formData.patient_phone}
                    onChange={(e) =>
                      setFormData({ ...formData, patient_phone: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pickup_address">Pickup Address *</Label>
                <Textarea
                  id="pickup_address"
                  placeholder="Enter complete pickup address"
                  value={formData.pickup_address}
                  onChange={(e) =>
                    setFormData({ ...formData, pickup_address: e.target.value })
                  }
                  required
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination_address">Destination Address *</Label>
                <Textarea
                  id="destination_address"
                  placeholder="Enter hospital or destination address"
                  value={formData.destination_address}
                  onChange={(e) =>
                    setFormData({ ...formData, destination_address: e.target.value })
                  }
                  required
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergency_type">Emergency Type *</Label>
                <Input
                  id="emergency_type"
                  placeholder="e.g., Accident, Cardiac Emergency, etc."
                  value={formData.emergency_type}
                  onChange={(e) =>
                    setFormData({ ...formData, emergency_type: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ambulance_type">Ambulance Type</Label>
                <Select
                  value={formData.ambulance_type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, ambulance_type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic Life Support (BLS)</SelectItem>
                    <SelectItem value="advanced">Advanced Life Support (ALS)</SelectItem>
                    <SelectItem value="air">Air Ambulance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Booking..." : "Book Ambulance Now"}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                * Required fields. Emergency hotline: <strong>102</strong> or <strong>108</strong>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AmbulanceBooking;
