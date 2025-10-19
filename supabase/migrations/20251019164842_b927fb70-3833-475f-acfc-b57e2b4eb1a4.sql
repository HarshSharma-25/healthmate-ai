-- Create ambulances table
CREATE TABLE public.ambulances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_number TEXT NOT NULL UNIQUE,
  driver_name TEXT NOT NULL,
  driver_phone TEXT NOT NULL,
  ambulance_type TEXT NOT NULL CHECK (ambulance_type IN ('basic', 'advanced', 'air')),
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'on_duty', 'maintenance')),
  current_latitude DECIMAL(10, 8),
  current_longitude DECIMAL(11, 8),
  last_location_update TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create ambulance bookings table
CREATE TABLE public.ambulance_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  ambulance_id UUID REFERENCES public.ambulances(id) ON DELETE SET NULL,
  patient_name TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  pickup_address TEXT NOT NULL,
  pickup_latitude DECIMAL(10, 8),
  pickup_longitude DECIMAL(11, 8),
  destination_address TEXT NOT NULL,
  destination_latitude DECIMAL(10, 8),
  destination_longitude DECIMAL(11, 8),
  emergency_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'en_route', 'arrived', 'completed', 'cancelled')),
  estimated_arrival TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create hospital wards table
CREATE TABLE public.hospital_wards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ward_name TEXT NOT NULL,
  ward_type TEXT NOT NULL CHECK (ward_type IN ('general', 'icu', 'private', 'semi_private', 'emergency')),
  total_beds INTEGER NOT NULL,
  available_beds INTEGER NOT NULL,
  floor_number INTEGER,
  department TEXT NOT NULL,
  amenities TEXT[],
  price_per_day DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create ward bookings table
CREATE TABLE public.ward_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  ward_id UUID NOT NULL REFERENCES public.hospital_wards(id) ON DELETE CASCADE,
  patient_name TEXT NOT NULL,
  patient_age INTEGER NOT NULL,
  patient_phone TEXT NOT NULL,
  admission_date DATE NOT NULL,
  discharge_date DATE,
  medical_condition TEXT,
  doctor_name TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'admitted', 'discharged', 'cancelled')),
  special_requirements TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.ambulances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ambulance_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hospital_wards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ward_bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ambulances (public read, admin write)
CREATE POLICY "Anyone can view ambulances"
  ON public.ambulances FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can update ambulance location"
  ON public.ambulances FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- RLS Policies for ambulance bookings
CREATE POLICY "Users can view their own ambulance bookings"
  ON public.ambulance_bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own ambulance bookings"
  ON public.ambulance_bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ambulance bookings"
  ON public.ambulance_bookings FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for hospital wards (public read)
CREATE POLICY "Anyone can view hospital wards"
  ON public.hospital_wards FOR SELECT
  USING (true);

-- RLS Policies for ward bookings
CREATE POLICY "Users can view their own ward bookings"
  ON public.ward_bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own ward bookings"
  ON public.ward_bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ward bookings"
  ON public.ward_bookings FOR UPDATE
  USING (auth.uid() = user_id);

-- Add triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_ambulances_updated_at
  BEFORE UPDATE ON public.ambulances
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ambulance_bookings_updated_at
  BEFORE UPDATE ON public.ambulance_bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hospital_wards_updated_at
  BEFORE UPDATE ON public.hospital_wards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ward_bookings_updated_at
  BEFORE UPDATE ON public.ward_bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable realtime for ambulance tracking
ALTER PUBLICATION supabase_realtime ADD TABLE public.ambulances;
ALTER PUBLICATION supabase_realtime ADD TABLE public.ambulance_bookings;

-- Insert sample ambulances
INSERT INTO public.ambulances (vehicle_number, driver_name, driver_phone, ambulance_type, status, current_latitude, current_longitude) VALUES
('AMB-001', 'Raj Kumar', '+91-9876543210', 'basic', 'available', 28.6139, 77.2090),
('AMB-002', 'Priya Sharma', '+91-9876543211', 'advanced', 'available', 28.6289, 77.2195),
('AMB-003', 'Amit Singh', '+91-9876543212', 'basic', 'on_duty', 28.5355, 77.3910),
('AMB-004', 'Neha Gupta', '+91-9876543213', 'advanced', 'available', 28.7041, 77.1025);

-- Insert sample hospital wards
INSERT INTO public.hospital_wards (ward_name, ward_type, total_beds, available_beds, floor_number, department, amenities, price_per_day) VALUES
('General Ward A', 'general', 20, 8, 1, 'General Medicine', ARRAY['AC', 'TV', 'WiFi'], 1500.00),
('ICU Ward', 'icu', 10, 3, 2, 'Critical Care', ARRAY['24/7 Monitoring', 'Ventilator', 'Emergency Equipment'], 5000.00),
('Private Suite', 'private', 5, 2, 3, 'General', ARRAY['AC', 'TV', 'WiFi', 'Attached Bathroom', 'Refrigerator'], 3500.00),
('Cardiac Care', 'icu', 8, 4, 2, 'Cardiology', ARRAY['ECG Monitor', '24/7 Monitoring', 'Specialized Equipment'], 4500.00),
('Maternity Ward', 'semi_private', 15, 6, 1, 'Obstetrics', ARRAY['AC', 'TV', 'WiFi', 'Baby Care'], 2500.00);