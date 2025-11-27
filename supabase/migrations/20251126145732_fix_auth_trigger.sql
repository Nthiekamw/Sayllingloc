/*
  # Fix Authentication Trigger

  1. Problem
    - Users can sign up in auth.users but their profile is not created automatically
    - This causes "Database error saving new user"

  2. Solution
    - Drop and recreate the trigger that automatically creates a profile when a user signs up
    - Ensure the trigger is AFTER INSERT and calls handle_new_user()

  3. Security
    - No changes to RLS policies needed
*/

-- Drop the trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Recreate the trigger to automatically create profiles
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
