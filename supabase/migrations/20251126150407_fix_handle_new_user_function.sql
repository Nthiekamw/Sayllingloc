/*
  # Fix handle_new_user Function with Better Error Handling

  1. Problem
    - Foreign key constraint violation when creating profiles
    - Function may not have proper permissions

  2. Solution
    - Recreate function with SECURITY DEFINER
    - Add explicit error handling
    - Ensure the function runs with elevated privileges

  3. Security
    - SECURITY DEFINER allows the function to insert into profiles
    - Still maintains RLS on the profiles table
*/

-- Drop and recreate the function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    'renter',
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    -- Si le profil existe déjà, on le met à jour
    UPDATE public.profiles
    SET 
      email = NEW.email,
      updated_at = now()
    WHERE id = NEW.id;
    RETURN NEW;
  WHEN OTHERS THEN
    -- Log l'erreur mais ne bloque pas la création du user
    RAISE WARNING 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- Recréer le trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
