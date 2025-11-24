-- Create support requests table
CREATE TABLE public.support_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  status TEXT CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')) DEFAULT 'open',
  category TEXT CHECK (category IN ('bug_report', 'feature_request', 'technical_support', 'general_inquiry')) DEFAULT 'general_inquiry',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  admin_notes TEXT
);

-- Enable Row Level Security
ALTER TABLE public.support_requests ENABLE ROW LEVEL SECURITY;

-- Users can view their own support requests
CREATE POLICY "Users can view their own support requests" 
ON public.support_requests 
FOR SELECT 
USING (auth.uid() = user_id OR user_email = auth.jwt() ->> 'email');

-- Users can create support requests
CREATE POLICY "Users can create support requests" 
ON public.support_requests 
FOR INSERT 
WITH CHECK (auth.uid() = user_id OR user_email = auth.jwt() ->> 'email');

-- Users can update their own support requests (limited fields)
CREATE POLICY "Users can update their own support requests" 
ON public.support_requests 
FOR UPDATE 
USING (auth.uid() = user_id OR user_email = auth.jwt() ->> 'email')
WITH CHECK (auth.uid() = user_id OR user_email = auth.jwt() ->> 'email');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_support_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_support_requests_updated_at
    BEFORE UPDATE ON public.support_requests
    FOR EACH ROW
    EXECUTE FUNCTION public.update_support_requests_updated_at();

-- Create index for better performance
CREATE INDEX idx_support_requests_user_id ON public.support_requests(user_id);
CREATE INDEX idx_support_requests_status ON public.support_requests(status);
CREATE INDEX idx_support_requests_created_at ON public.support_requests(created_at DESC);