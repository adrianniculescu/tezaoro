
-- Create a table to store 2FA verification codes
CREATE TABLE public.two_factor_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on the 2FA codes table
ALTER TABLE public.two_factor_codes ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to view their own codes
CREATE POLICY "Users can view their own 2FA codes" 
  ON public.two_factor_codes 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to insert their own codes
CREATE POLICY "Users can create their own 2FA codes" 
  ON public.two_factor_codes 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to update their own codes
CREATE POLICY "Users can update their own 2FA codes" 
  ON public.two_factor_codes 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create function to clean up expired codes
CREATE OR REPLACE FUNCTION public.cleanup_expired_2fa_codes()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.two_factor_codes 
  WHERE expires_at < now();
END;
$$;

-- Create a function to generate 2FA codes
CREATE OR REPLACE FUNCTION public.generate_2fa_code(user_email TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  code TEXT;
  user_record RECORD;
BEGIN
  -- Generate a 6-digit code
  code := LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
  
  -- Get user ID from email
  SELECT id INTO user_record FROM auth.users WHERE email = user_email;
  
  IF user_record.id IS NULL THEN
    RAISE EXCEPTION 'User not found';
  END IF;
  
  -- Clean up any existing codes for this user
  DELETE FROM public.two_factor_codes WHERE user_id = user_record.id;
  
  -- Insert new code (expires in 10 minutes)
  INSERT INTO public.two_factor_codes (user_id, code, expires_at)
  VALUES (user_record.id, code, now() + INTERVAL '10 minutes');
  
  RETURN code;
END;
$$;

-- Create a function to verify 2FA codes
CREATE OR REPLACE FUNCTION public.verify_2fa_code(user_email TEXT, input_code TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_record RECORD;
  code_record RECORD;
BEGIN
  -- Get user ID from email
  SELECT id INTO user_record FROM auth.users WHERE email = user_email;
  
  IF user_record.id IS NULL THEN
    RETURN false;
  END IF;
  
  -- Check for valid, unexpired code
  SELECT * INTO code_record 
  FROM public.two_factor_codes 
  WHERE user_id = user_record.id 
    AND code = input_code 
    AND expires_at > now() 
    AND verified = false;
  
  IF code_record.id IS NOT NULL THEN
    -- Mark code as verified
    UPDATE public.two_factor_codes 
    SET verified = true 
    WHERE id = code_record.id;
    
    RETURN true;
  END IF;
  
  RETURN false;
END;
$$;
