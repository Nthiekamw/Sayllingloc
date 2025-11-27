/*
  # Add Storage Bucket for Boat Images

  1. Storage
    - Create a public bucket called 'boat-images' for storing boat photos
    - Enable RLS on the bucket
    - Add policies for authenticated users to upload images
    - Add policies for everyone to view images

  2. Security
    - Only authenticated users can upload images
    - Only boat owners can delete their boat images
    - All users can view images (public read)
*/

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'boat-images',
  'boat-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Authenticated users can upload boat images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'boat-images');

CREATE POLICY "Users can update their own boat images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'boat-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own boat images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'boat-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Anyone can view boat images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'boat-images');
