/*
  # Fix Boats Insert Policy

  1. Problem
    - Current policy blocks authenticated users from inserting boats unless they have 'owner' or 'admin' role
    - Users are created as 'renter' by default
    - Users should be able to become owners by adding their first boat

  2. Solution
    - Allow authenticated users to insert boats
    - Automatically update their role to 'owner' when they add their first boat
    - Keep the owner_id check for security

  3. Changes
    - Drop the restrictive INSERT policy
    - Create a new permissive INSERT policy
    - Add a trigger to auto-upgrade users to 'owner' role when they add a boat
*/

-- Drop the old restrictive policy
DROP POLICY IF EXISTS "Owners can insert their boats" ON boats;

-- Create a new permissive policy: any authenticated user can add a boat
CREATE POLICY "Authenticated users can insert boats"
  ON boats
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

-- Create a function to auto-upgrade user to 'owner' role
CREATE OR REPLACE FUNCTION public.handle_new_boat()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Auto-upgrade user to 'owner' role if they're not already owner or admin
  UPDATE profiles
  SET role = 'owner'
  WHERE id = NEW.owner_id
    AND role = 'renter';
  
  RETURN NEW;
END;
$$;

-- Create trigger to auto-upgrade users when they add a boat
DROP TRIGGER IF EXISTS on_boat_created ON boats;

CREATE TRIGGER on_boat_created
  AFTER INSERT ON boats
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_boat();
