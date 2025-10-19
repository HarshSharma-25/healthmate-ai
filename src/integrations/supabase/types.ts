export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ambulance_bookings: {
        Row: {
          ambulance_id: string | null
          created_at: string
          destination_address: string
          destination_latitude: number | null
          destination_longitude: number | null
          emergency_type: string
          estimated_arrival: string | null
          id: string
          patient_name: string
          patient_phone: string
          pickup_address: string
          pickup_latitude: number | null
          pickup_longitude: number | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          ambulance_id?: string | null
          created_at?: string
          destination_address: string
          destination_latitude?: number | null
          destination_longitude?: number | null
          emergency_type: string
          estimated_arrival?: string | null
          id?: string
          patient_name: string
          patient_phone: string
          pickup_address: string
          pickup_latitude?: number | null
          pickup_longitude?: number | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          ambulance_id?: string | null
          created_at?: string
          destination_address?: string
          destination_latitude?: number | null
          destination_longitude?: number | null
          emergency_type?: string
          estimated_arrival?: string | null
          id?: string
          patient_name?: string
          patient_phone?: string
          pickup_address?: string
          pickup_latitude?: number | null
          pickup_longitude?: number | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ambulance_bookings_ambulance_id_fkey"
            columns: ["ambulance_id"]
            isOneToOne: false
            referencedRelation: "ambulances"
            referencedColumns: ["id"]
          },
        ]
      }
      ambulances: {
        Row: {
          ambulance_type: string
          created_at: string
          current_latitude: number | null
          current_longitude: number | null
          driver_name: string
          driver_phone: string
          id: string
          last_location_update: string | null
          status: string
          updated_at: string
          vehicle_number: string
        }
        Insert: {
          ambulance_type: string
          created_at?: string
          current_latitude?: number | null
          current_longitude?: number | null
          driver_name: string
          driver_phone: string
          id?: string
          last_location_update?: string | null
          status?: string
          updated_at?: string
          vehicle_number: string
        }
        Update: {
          ambulance_type?: string
          created_at?: string
          current_latitude?: number | null
          current_longitude?: number | null
          driver_name?: string
          driver_phone?: string
          id?: string
          last_location_update?: string | null
          status?: string
          updated_at?: string
          vehicle_number?: string
        }
        Relationships: []
      }
      hospital_wards: {
        Row: {
          amenities: string[] | null
          available_beds: number
          created_at: string
          department: string
          floor_number: number | null
          id: string
          price_per_day: number
          total_beds: number
          updated_at: string
          ward_name: string
          ward_type: string
        }
        Insert: {
          amenities?: string[] | null
          available_beds: number
          created_at?: string
          department: string
          floor_number?: number | null
          id?: string
          price_per_day: number
          total_beds: number
          updated_at?: string
          ward_name: string
          ward_type: string
        }
        Update: {
          amenities?: string[] | null
          available_beds?: number
          created_at?: string
          department?: string
          floor_number?: number | null
          id?: string
          price_per_day?: number
          total_beds?: number
          updated_at?: string
          ward_name?: string
          ward_type?: string
        }
        Relationships: []
      }
      ward_bookings: {
        Row: {
          admission_date: string
          created_at: string
          discharge_date: string | null
          doctor_name: string | null
          id: string
          medical_condition: string | null
          patient_age: number
          patient_name: string
          patient_phone: string
          special_requirements: string | null
          status: string
          updated_at: string
          user_id: string
          ward_id: string
        }
        Insert: {
          admission_date: string
          created_at?: string
          discharge_date?: string | null
          doctor_name?: string | null
          id?: string
          medical_condition?: string | null
          patient_age: number
          patient_name: string
          patient_phone: string
          special_requirements?: string | null
          status?: string
          updated_at?: string
          user_id: string
          ward_id: string
        }
        Update: {
          admission_date?: string
          created_at?: string
          discharge_date?: string | null
          doctor_name?: string | null
          id?: string
          medical_condition?: string | null
          patient_age?: number
          patient_name?: string
          patient_phone?: string
          special_requirements?: string | null
          status?: string
          updated_at?: string
          user_id?: string
          ward_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ward_bookings_ward_id_fkey"
            columns: ["ward_id"]
            isOneToOne: false
            referencedRelation: "hospital_wards"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
