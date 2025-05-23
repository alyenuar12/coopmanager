-- Add active status column to users table if it doesn't exist
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Add role column to users table if it doesn't exist
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'member';

-- Create admin user if it doesn't exist
INSERT INTO public.users (
  id, 
  user_id, 
  email, 
  name, 
  full_name, 
  token_identifier, 
  created_at,
  is_active,
  role
) 
VALUES (
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000000',
  'admin@cooperative.com',
  'Admin User',
  'Administrator',
  '00000000-0000-0000-0000-000000000000',
  NOW(),
  true,
  'admin'
)
ON CONFLICT (user_id) DO NOTHING;
