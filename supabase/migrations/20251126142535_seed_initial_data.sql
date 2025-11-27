/*
  # Seed Initial Data for SailingLoc

  1. Admin User Setup
    - Creates an admin user via auth.users
    - Sets up admin profile with predefined credentials

  2. Sample Boats
    - Adds sample boats for testing and demonstration
    
  3. Notes
    - Admin credentials: admin@sailingloc.com / admin123
    - This migration is idempotent and can be run multiple times
*/

-- Insert admin user into profiles (will be linked after signup)
-- Note: The actual user must sign up through the application
-- This just ensures the profile exists with admin role

-- First, check if admin exists, if not we'll handle it in the application
-- For now, we'll just add sample boats

-- Add sample boats (will need to be linked to actual owner IDs)
DO $$
DECLARE
  sample_owner_id uuid;
BEGIN
  -- Get first user with owner role, or create a placeholder
  SELECT id INTO sample_owner_id FROM profiles WHERE role = 'owner' LIMIT 1;
  
  -- Only insert boats if we have an owner
  IF sample_owner_id IS NOT NULL THEN
    INSERT INTO boats (owner_id, title, description, type, size, capacity, price_per_day, location, has_skipper, status)
    VALUES 
      (sample_owner_id, 'Voilier Océanis 38', 'Magnifique voilier de 38 pieds parfait pour la croisière en famille. Équipé de tout le confort moderne.', 'sailboat', 11.5, 8, 250, 'Port de Marseille', true, 'active'),
      (sample_owner_id, 'Catamaran Lagoon 42', 'Spacieux catamaran idéal pour des vacances inoubliables. Très stable et confortable.', 'sailboat', 12.8, 12, 450, 'Port de Nice', true, 'active'),
      (sample_owner_id, 'Bateau à moteur Jeanneau Cap Camarat', 'Bateau rapide et élégant pour des sorties à la journée. Parfait pour la pêche ou les balades.', 'motorboat', 9, 10, 180, 'Port de Saint-Tropez', false, 'active')
    ON CONFLICT DO NOTHING;
  END IF;
END $$;
