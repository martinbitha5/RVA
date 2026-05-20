// ============================================================
// Types générés manuellement depuis schema CLAUDE.md §4.1
// Aéroport International de N'djili (FIH) — RVA, RDC
// ============================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          phone: string | null;
          full_name: string | null;
          preferred_language: 'fr' | 'en' | 'ln';
          notification_sms: boolean;
          notification_email: boolean;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          phone?: string | null;
          full_name?: string | null;
          preferred_language?: 'fr' | 'en' | 'ln';
          notification_sms?: boolean;
          notification_email?: boolean;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      airlines: {
        Row: {
          id: string;
          iata_code: string;
          icao_code: string | null;
          name: string;
          slug: string;
          logo_url: string | null;
          website: string | null;
          description_fr: string | null;
          description_en: string | null;
          hub_at_fih: boolean;
          alliance: string | null;
          checkin_counter: string | null;
          lounge_name: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          iata_code: string;
          icao_code?: string | null;
          name: string;
          slug: string;
          logo_url?: string | null;
          website?: string | null;
          description_fr?: string | null;
          description_en?: string | null;
          hub_at_fih?: boolean;
          alliance?: string | null;
          checkin_counter?: string | null;
          lounge_name?: string | null;
          active?: boolean;
        };
        Update: Partial<Database['public']['Tables']['airlines']['Insert']>;
      };
      destinations: {
        Row: {
          id: string;
          iata_code: string;
          icao_code: string | null;
          city_fr: string;
          city_en: string;
          country_fr: string;
          country_en: string;
          country_code: string;
          continent: string | null;
          timezone: string | null;
          is_domestic: boolean;
          province_rdc: string | null;
          active: boolean;
        };
        Insert: {
          id?: string;
          iata_code: string;
          icao_code?: string | null;
          city_fr: string;
          city_en: string;
          country_fr: string;
          country_en: string;
          country_code: string;
          continent?: string | null;
          timezone?: string | null;
          is_domestic?: boolean;
          province_rdc?: string | null;
          active?: boolean;
        };
        Update: Partial<Database['public']['Tables']['destinations']['Insert']>;
      };
      flights: {
        Row: {
          id: string;
          flight_number: string;
          airline_id: string;
          type: 'departure' | 'arrival';
          origin_iata: string;
          destination_iata: string;
          scheduled_time: string;
          estimated_time: string | null;
          actual_time: string | null;
          status:
            | 'scheduled'
            | 'boarding'
            | 'departed'
            | 'arrived'
            | 'delayed'
            | 'cancelled'
            | 'diverted'
            | 'on_time';
          terminal: 'international' | 'domestic' | null;
          gate: string | null;
          baggage_claim: string | null;
          aircraft_type: string | null;
          codeshare: boolean;
          remarks_fr: string | null;
          remarks_en: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          flight_number: string;
          airline_id: string;
          type: 'departure' | 'arrival';
          origin_iata: string;
          destination_iata: string;
          scheduled_time: string;
          estimated_time?: string | null;
          actual_time?: string | null;
          status?: Database['public']['Tables']['flights']['Row']['status'];
          terminal?: 'international' | 'domestic' | null;
          gate?: string | null;
          baggage_claim?: string | null;
          aircraft_type?: string | null;
          codeshare?: boolean;
          remarks_fr?: string | null;
          remarks_en?: string | null;
        };
        Update: Partial<Database['public']['Tables']['flights']['Insert']>;
      };
      concessions: {
        Row: {
          id: string;
          name: string;
          slug: string;
          category:
            | 'restaurant'
            | 'boutique'
            | 'bar'
            | 'cafe'
            | 'duty_free'
            | 'lounge'
            | 'exchange'
            | 'bank'
            | 'medical'
            | 'pharmacy'
            | 'telecom'
            | 'hotel'
            | 'transport'
            | 'other';
          terminal: 'international' | 'domestic' | 'both' | null;
          zone:
            | 'before_security'
            | 'after_security'
            | 'arrivals'
            | 'both'
            | null;
          level: string | null;
          description_fr: string | null;
          description_en: string | null;
          hours: Json | null;
          phone: string | null;
          email: string | null;
          logo_url: string | null;
          cover_image_url: string | null;
          gallery: Json | null;
          tags: string[] | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          category: Database['public']['Tables']['concessions']['Row']['category'];
          terminal?: 'international' | 'domestic' | 'both' | null;
          zone?: 'before_security' | 'after_security' | 'arrivals' | 'both' | null;
          level?: string | null;
          description_fr?: string | null;
          description_en?: string | null;
          hours?: Json | null;
          phone?: string | null;
          email?: string | null;
          logo_url?: string | null;
          cover_image_url?: string | null;
          gallery?: Json | null;
          tags?: string[] | null;
          active?: boolean;
        };
        Update: Partial<Database['public']['Tables']['concessions']['Insert']>;
      };
      lounges: {
        Row: {
          id: string;
          name: string;
          slug: string;
          operator: string | null;
          airline_id: string | null;
          location: string | null;
          terminal: 'international' | 'domestic' | null;
          level: string | null;
          description_fr: string | null;
          description_en: string | null;
          access_conditions: string | null;
          access_fee_usd: number | null;
          amenities: Json | null;
          hours: Json | null;
          capacity: number | null;
          image_url: string | null;
          gallery: Json | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          operator?: string | null;
          airline_id?: string | null;
          location?: string | null;
          terminal?: 'international' | 'domestic' | null;
          level?: string | null;
          description_fr?: string | null;
          description_en?: string | null;
          access_conditions?: string | null;
          access_fee_usd?: number | null;
          amenities?: Json | null;
          hours?: Json | null;
          capacity?: number | null;
          image_url?: string | null;
          gallery?: Json | null;
          active?: boolean;
        };
        Update: Partial<Database['public']['Tables']['lounges']['Insert']>;
      };
      parking_lots: {
        Row: {
          id: string;
          code: string;
          name: string;
          description_fr: string | null;
          description_en: string | null;
          total_spots: number;
          available_spots: number | null;
          hourly_rate_usd: number | null;
          daily_rate_usd: number | null;
          weekly_rate_usd: number | null;
          monthly_rate_usd: number | null;
          distance_terminal: string | null;
          shuttle_available: boolean;
          ev_charging: boolean;
          covered: boolean;
          pmr_spots: number;
          security_level: 'standard' | 'premium' | 'cctv_24h' | null;
          latitude: number | null;
          longitude: number | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          name: string;
          description_fr?: string | null;
          description_en?: string | null;
          total_spots: number;
          available_spots?: number | null;
          hourly_rate_usd?: number | null;
          daily_rate_usd?: number | null;
          weekly_rate_usd?: number | null;
          monthly_rate_usd?: number | null;
          distance_terminal?: string | null;
          shuttle_available?: boolean;
          ev_charging?: boolean;
          covered?: boolean;
          pmr_spots?: number;
          security_level?: 'standard' | 'premium' | 'cctv_24h' | null;
          latitude?: number | null;
          longitude?: number | null;
          active?: boolean;
        };
        Update: Partial<Database['public']['Tables']['parking_lots']['Insert']>;
      };
      parking_reservations: {
        Row: {
          id: string;
          user_id: string;
          parking_lot_id: string;
          vehicle_plate: string;
          vehicle_type: 'car' | 'motorcycle' | 'truck' | 'minibus' | null;
          start_at: string;
          end_at: string;
          duration_hours: number;
          total_amount_usd: number;
          total_amount_cdf: number | null;
          payment_method:
            | 'airtel_money'
            | 'mpesa'
            | 'orange_money'
            | 'card'
            | 'cash'
            | null;
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
          payment_reference: string | null;
          reservation_code: string;
          qr_code_url: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          parking_lot_id: string;
          vehicle_plate: string;
          vehicle_type?: 'car' | 'motorcycle' | 'truck' | 'minibus' | null;
          start_at: string;
          end_at: string;
          total_amount_usd: number;
          total_amount_cdf?: number | null;
          payment_method?: Database['public']['Tables']['parking_reservations']['Row']['payment_method'];
          payment_status?: Database['public']['Tables']['parking_reservations']['Row']['payment_status'];
          payment_reference?: string | null;
          reservation_code: string;
          qr_code_url?: string | null;
          notes?: string | null;
        };
        Update: Partial<
          Database['public']['Tables']['parking_reservations']['Insert']
        >;
      };
      news_articles: {
        Row: {
          id: string;
          slug: string;
          title_fr: string;
          title_en: string | null;
          excerpt_fr: string | null;
          excerpt_en: string | null;
          body_fr: string | null;
          body_en: string | null;
          cover_image_url: string | null;
          category:
            | 'corporate'
            | 'community'
            | 'operations'
            | 'environment'
            | 'careers'
            | 'partnership'
            | 'safety';
          author: string | null;
          tags: string[] | null;
          published_at: string | null;
          status: 'draft' | 'published' | 'archived';
          views_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title_fr: string;
          title_en?: string | null;
          excerpt_fr?: string | null;
          excerpt_en?: string | null;
          body_fr?: string | null;
          body_en?: string | null;
          cover_image_url?: string | null;
          category: Database['public']['Tables']['news_articles']['Row']['category'];
          author?: string | null;
          tags?: string[] | null;
          published_at?: string | null;
          status?: 'draft' | 'published' | 'archived';
          views_count?: number;
        };
        Update: Partial<Database['public']['Tables']['news_articles']['Insert']>;
      };
      job_postings: {
        Row: {
          id: string;
          title: string;
          department: string;
          location: string;
          contract_type: 'CDI' | 'CDD' | 'stage' | 'freelance' | 'consultant';
          experience_level:
            | 'junior'
            | 'mid'
            | 'senior'
            | 'manager'
            | 'executive'
            | null;
          description_fr: string | null;
          requirements_fr: string | null;
          benefits_fr: string | null;
          salary_range: string | null;
          application_deadline: string | null;
          apply_url: string | null;
          active: boolean;
          posted_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          department: string;
          location?: string;
          contract_type: Database['public']['Tables']['job_postings']['Row']['contract_type'];
          experience_level?: Database['public']['Tables']['job_postings']['Row']['experience_level'];
          description_fr?: string | null;
          requirements_fr?: string | null;
          benefits_fr?: string | null;
          salary_range?: string | null;
          application_deadline?: string | null;
          apply_url?: string | null;
          active?: boolean;
          posted_at?: string;
        };
        Update: Partial<Database['public']['Tables']['job_postings']['Insert']>;
      };
      job_applications: {
        Row: {
          id: string;
          job_posting_id: string;
          full_name: string;
          email: string;
          phone: string | null;
          nationality: string | null;
          cv_url: string | null;
          cover_letter: string | null;
          linkedin_url: string | null;
          status:
            | 'received'
            | 'reviewing'
            | 'shortlisted'
            | 'interview'
            | 'rejected'
            | 'hired';
          reviewer_notes: string | null;
          submitted_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          job_posting_id: string;
          full_name: string;
          email: string;
          phone?: string | null;
          nationality?: string | null;
          cv_url?: string | null;
          cover_letter?: string | null;
          linkedin_url?: string | null;
          status?: Database['public']['Tables']['job_applications']['Row']['status'];
          reviewer_notes?: string | null;
        };
        Update: Partial<Database['public']['Tables']['job_applications']['Insert']>;
      };
      noise_complaints: {
        Row: {
          id: string;
          user_id: string | null;
          full_name: string;
          email: string | null;
          phone: string | null;
          address: string | null;
          commune:
            | 'Nsele'
            | 'Masina'
            | 'Kimbanseke'
            | 'N_djili'
            | 'Limete'
            | 'Makala'
            | 'Ngaliema'
            | 'other';
          latitude: number | null;
          longitude: number | null;
          incident_date: string;
          time_of_day: 'morning' | 'afternoon' | 'evening' | 'night' | null;
          frequency: 'once' | 'occasional' | 'regular' | 'daily' | null;
          description: string;
          status: 'received' | 'in_review' | 'responded' | 'closed';
          response: string | null;
          responded_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          full_name: string;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          commune: Database['public']['Tables']['noise_complaints']['Row']['commune'];
          latitude?: number | null;
          longitude?: number | null;
          incident_date: string;
          time_of_day?: Database['public']['Tables']['noise_complaints']['Row']['time_of_day'];
          frequency?: Database['public']['Tables']['noise_complaints']['Row']['frequency'];
          description: string;
          status?: Database['public']['Tables']['noise_complaints']['Row']['status'];
        };
        Update: Partial<Database['public']['Tables']['noise_complaints']['Insert']>;
      };
      flight_alerts: {
        Row: {
          id: string;
          user_id: string;
          flight_id: string | null;
          flight_number: string | null;
          alert_date: string | null;
          alert_types: string[];
          phone_override: string | null;
          active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          flight_id?: string | null;
          flight_number?: string | null;
          alert_date?: string | null;
          alert_types?: string[];
          phone_override?: string | null;
          active?: boolean;
        };
        Update: Partial<Database['public']['Tables']['flight_alerts']['Insert']>;
      };
      pages: {
        Row: {
          id: string;
          slug: string;
          title_fr: string;
          title_en: string | null;
          body_fr: string | null;
          body_en: string | null;
          meta_description_fr: string | null;
          meta_description_en: string | null;
          og_image_url: string | null;
          is_published: boolean;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          id?: string;
          slug: string;
          title_fr: string;
          title_en?: string | null;
          body_fr?: string | null;
          body_en?: string | null;
          meta_description_fr?: string | null;
          meta_description_en?: string | null;
          og_image_url?: string | null;
          is_published?: boolean;
          updated_by?: string | null;
        };
        Update: Partial<Database['public']['Tables']['pages']['Insert']>;
      };
      wait_times: {
        Row: {
          id: string;
          checkpoint_type:
            | 'security_intl'
            | 'security_dom'
            | 'immigration_arrival'
            | 'immigration_departure'
            | 'customs'
            | 'pcr_test'
            | 'vaccination_check';
          terminal: 'international' | 'domestic' | null;
          estimated_minutes: number;
          status: 'closed' | 'light' | 'normal' | 'moderate' | 'busy' | 'very_busy';
          updated_at: string;
        };
        Insert: {
          id?: string;
          checkpoint_type: Database['public']['Tables']['wait_times']['Row']['checkpoint_type'];
          terminal?: 'international' | 'domestic' | null;
          estimated_minutes: number;
          status?: Database['public']['Tables']['wait_times']['Row']['status'];
        };
        Update: Partial<Database['public']['Tables']['wait_times']['Insert']>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};

// ===================================================
// Helper types pour usage courant dans les composants
// ===================================================
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export type Inserts<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];

export type Updates<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

// Raccourcis fréquents
export type Profile = Tables<'profiles'>;
export type Airline = Tables<'airlines'>;
export type Destination = Tables<'destinations'>;
export type Flight = Tables<'flights'>;
export type Concession = Tables<'concessions'>;
export type Lounge = Tables<'lounges'>;
export type ParkingLot = Tables<'parking_lots'>;
export type ParkingReservation = Tables<'parking_reservations'>;
export type NewsArticle = Tables<'news_articles'>;
export type JobPosting = Tables<'job_postings'>;
export type JobApplication = Tables<'job_applications'>;
export type NoiseComplaint = Tables<'noise_complaints'>;
export type FlightAlert = Tables<'flight_alerts'>;
export type Page = Tables<'pages'>;
export type WaitTime = Tables<'wait_times'>;

// Type enrichi pour l'affichage des vols (avec airline jointé)
export type FlightWithAirline = Flight & {
  airlines: Pick<Airline, 'iata_code' | 'name' | 'logo_url' | 'slug'>;
};

export type FlightStatus = Flight['status'];
export type FlightType = Flight['type'];
export type ConcessionCategory = Concession['category'];
