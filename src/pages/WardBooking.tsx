import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Bed, IndianRupee, MapPin, CheckCircle } from "lucide-react";
import { z } from "zod";

const bookingSchema = z.object({
  patient_name: z.string().min(1, "Patient name is required").max(100),
  patient_age: z.number().min(0, "Valid age required").max(150),
  patient_phone: z.string().min(10, "Valid phone number required").max(15),
  admission_date: z.string().min(1, "Admission date is required"),
  medical_condition: z.string().max(500).optional(),
  doctor_name: z.string().max(100).optional(),
  special_requirements: z.string().max(500).optional(),
});

interface Ward {
  id: string;
  ward_name: string;
  ward_type: string;
  total_beds: number;
  available_beds: number;
  floor_number: number;
  department: string;
  amenities: string[];
  price_per_day: number;
}

const WardBooking = () => {
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    patient_name: "",
    patient_age: "",
    patient_phone: "",
    admission_date: "",
    medical_condition: "",
    doctor_name: "",
    special_requirements: "",
  });

  useEffect(() => {
    checkUser();
    fetchWards();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please sign in to book a ward.",
      });
      navigate("/login");
      return;
    }
    setUser(user);
  };

  const fetchWards = async () => {
    try {
      const { data, error } = await supabase
        .from("hospital_wards")
        .select("*")
        .order("ward_type");

      if (error) throw error;
      setWards(data || []);
    } catch (error) {
      console.error("Error fetching wards:", error);
    }
  };

  const handleWardSelect = (ward: Ward) => {
    if (ward.available_beds === 0) {
      toast({
        variant: "destructive",
        title: "Ward Full",
        description: "This ward has no available beds at the moment.",
      });
      return;
    }
    setSelectedWard(ward);
    setShowBookingForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form data
      bookingSchema.parse({
        ...formData,
        patient_age: parseInt(formData.patient_age),
      });

      if (!user || !selectedWard) {
        throw new Error("Missing required information");
      }

      const { error } = await supabase.from("ward_bookings").insert({
        user_id: user.id,
        ward_id: selectedWard.id,
        patient_name: formData.patient_name,
        patient_age: parseInt(formData.patient_age),
        patient_phone: formData.patient_phone,
        admission_date: formData.admission_date,
        medical_condition: formData.medical_condition || null,
        doctor_name: formData.doctor_name || null,
        special_requirements: formData.special_requirements || null,
        status: "pending",
      });

      if (error) throw error;

      toast({
        title: "Booking Successful!",
        description: "Your ward reservation has been submitted for confirmation.",
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

  const getWardTypeColor = (type: string) => {
    switch (type) {
      case "icu":
        return "bg-red-500";
      case "private":
        return "bg-purple-500";
      case "semi_private":
        return "bg-blue-500";
      default:
        return "bg-green-500";
    }
  };

  if (showBookingForm && selectedWard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto p-6 max-w-3xl">
          <Button variant="ghost" onClick={() => setShowBookingForm(false)} className="mb-6">
            ← Back to Wards
          </Button>

          <Card>
            <CardHeader>
              <CardTitle>Complete Ward Booking</CardTitle>
              <CardDescription>
                Booking: {selectedWard.ward_name} - {selectedWard.ward_type.toUpperCase()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient_name">Patient Name *</Label>
                    <Input
                      id="patient_name"
                      value={formData.patient_name}
                      onChange={(e) => setFormData({ ...formData, patient_name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="patient_age">Patient Age *</Label>
                    <Input
                      id="patient_age"
                      type="number"
                      value={formData.patient_age}
                      onChange={(e) => setFormData({ ...formData, patient_age: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient_phone">Contact Number *</Label>
                    <Input
                      id="patient_phone"
                      type="tel"
                      value={formData.patient_phone}
                      onChange={(e) => setFormData({ ...formData, patient_phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admission_date">Admission Date *</Label>
                    <Input
                      id="admission_date"
                      type="date"
                      value={formData.admission_date}
                      onChange={(e) => setFormData({ ...formData, admission_date: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="doctor_name">Preferred Doctor (Optional)</Label>
                  <Input
                    id="doctor_name"
                    value={formData.doctor_name}
                    onChange={(e) => setFormData({ ...formData, doctor_name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medical_condition">Medical Condition (Optional)</Label>
                  <Textarea
                    id="medical_condition"
                    value={formData.medical_condition}
                    onChange={(e) => setFormData({ ...formData, medical_condition: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="special_requirements">Special Requirements (Optional)</Label>
                  <Textarea
                    id="special_requirements"
                    value={formData.special_requirements}
                    onChange={(e) => setFormData({ ...formData, special_requirements: e.target.value })}
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? "Processing..." : "Confirm Booking"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary flex items-center justify-center gap-2">
            <Bed className="h-8 w-8" />
            Ward Booking
          </h1>
          <p className="text-muted-foreground">Select a ward and complete your booking</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wards.map((ward) => (
            <Card key={ward.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{ward.ward_name}</CardTitle>
                    <CardDescription className="capitalize">{ward.department}</CardDescription>
                  </div>
                  <Badge className={getWardTypeColor(ward.ward_type)}>
                    {ward.ward_type.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Bed className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {ward.available_beds}/{ward.total_beds} beds available
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Floor {ward.floor_number}</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-primary">
                    <IndianRupee className="h-4 w-4" />
                    <span>₹{ward.price_per_day}/day</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Amenities:</p>
                  <div className="flex flex-wrap gap-2">
                    {ward.amenities?.map((amenity, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => handleWardSelect(ward)}
                  className="w-full"
                  disabled={ward.available_beds === 0}
                >
                  {ward.available_beds === 0 ? "No Beds Available" : "Book Now"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WardBooking;
