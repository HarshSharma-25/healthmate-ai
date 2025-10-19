import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Ambulance, MapPin, Phone, User } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface AmbulanceData {
  id: string;
  vehicle_number: string;
  driver_name: string;
  driver_phone: string;
  ambulance_type: string;
  status: string;
  current_latitude: number;
  current_longitude: number;
}

const AmbulanceTracking = () => {
  const [ambulances, setAmbulances] = useState<AmbulanceData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAmbulances();

    // Set up realtime subscription
    const channel = supabase
      .channel("ambulances-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "ambulances",
        },
        () => {
          fetchAmbulances();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchAmbulances = async () => {
    try {
      const { data, error } = await supabase.from("ambulances").select("*");

      if (error) throw error;
      setAmbulances(data || []);
    } catch (error) {
      console.error("Error fetching ambulances:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "on_duty":
        return "bg-yellow-500";
      case "maintenance":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const center: [number, number] = [28.6139, 77.209];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-primary flex items-center gap-2">
              <Ambulance className="h-8 w-8" />
              Ambulance Tracking
            </h1>
            <p className="text-muted-foreground mt-2">Real-time ambulance locations and availability</p>
          </div>
          <Button onClick={() => navigate("/ambulance-booking")}>
            Book Ambulance
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Live Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] rounded-lg overflow-hidden">
                  {/* @ts-ignore - react-leaflet type definitions issue */}
                  <MapContainer
                    center={center}
                    zoom={11}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {ambulances
                      .filter((amb) => amb.current_latitude && amb.current_longitude)
                      .map((ambulance) => (
                        <Marker
                          key={ambulance.id}
                          position={[ambulance.current_latitude, ambulance.current_longitude]}
                        >
                          <Popup>
                            <div className="space-y-1">
                              <p className="font-bold">{ambulance.vehicle_number}</p>
                              <p className="text-sm">Type: {ambulance.ambulance_type}</p>
                              <p className="text-sm">Status: {ambulance.status}</p>
                              <p className="text-sm">Driver: {ambulance.driver_name}</p>
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                  </MapContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Ambulances</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {ambulances.map((ambulance) => (
                  <Card key={ambulance.id} className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg">{ambulance.vehicle_number}</h3>
                        <Badge className={getStatusColor(ambulance.status)}>
                          {ambulance.status}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span className="capitalize">{ambulance.ambulance_type} Ambulance</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span>{ambulance.driver_name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          <span>{ambulance.driver_phone}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceTracking;
