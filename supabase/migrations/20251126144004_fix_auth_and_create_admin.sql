/*
  # Fix Authentication and Create Admin User
  
  1. Updates
    - Modify the handle_new_user function to handle email confirmation properly
    - Add better error handling
  
  2. Admin Creation
    - Note: The admin user must be created via Supabase dashboard first
    - This migration will set up the profile structure
*/

-- Améliorer la fonction handle_new_user pour mieux gérer les profils
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, role, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    'renter',
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  )
  ON CONFLICT (id) DO UPDATE
  SET 
    email = EXCLUDED.email,
    updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour créer un admin (à appeler manuellement après la création du user)
CREATE OR REPLACE FUNCTION make_user_admin(user_email text)
RETURNS void AS $$
BEGIN
  UPDATE profiles 
  SET role = 'admin', full_name = 'Admin SailingLoc'
  WHERE email = user_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
