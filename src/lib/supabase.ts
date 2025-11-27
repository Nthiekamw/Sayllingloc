import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserRole = 'admin' | 'owner' | 'renter';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Boat {
  id: string;
  owner_id: string;
  title: string;
  description: string | null;
  type: 'sailboat' | 'motorboat';
  size: number;
  capacity: number;
  price_per_day: number;
  location: string;
  has_skipper: boolean;
  image_url: string | null;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
  owner?: Profile;
}

export interface Reservation {
  id: string;
  boat_id: string;
  renter_id: string;
  owner_id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  updated_at: string;
  boat?: Boat;
  renter?: Profile;
  owner?: Profile;
}

export interface Review {
  id: string;
  reservation_id: string;
  reviewer_id: string;
  boat_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  reviewer?: Profile;
}

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  boat_id: string | null;
  reservation_id: string | null;
  content: string;
  is_read: boolean;
  created_at: string;
  sender?: Profile;
  recipient?: Profile;
}
