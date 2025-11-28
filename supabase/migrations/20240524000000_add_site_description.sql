-- Add site_description to branding table
ALTER TABLE public.branding ADD COLUMN IF NOT EXISTS site_description TEXT DEFAULT '';

-- Ensure ai_config table exists (redundant if previous migration ran, but safe)
CREATE TABLE IF NOT EXISTS public.ai_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    providers JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create analytics_events table for tracking usage (anonymous & auth)
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL,
    tool_id INTEGER,
    tool_name TEXT,
    category TEXT,
    user_id UUID,
    meta JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create reports table for tool issues
CREATE TABLE IF NOT EXISTS public.reports (
    id SERIAL PRIMARY KEY,
    tool_id INTEGER REFERENCES public.tools(id),
    issue_type TEXT,
    severity TEXT,
    description TEXT,
    reporter_email TEXT,
    status TEXT DEFAULT 'Open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for ai_config if not already enabled
ALTER TABLE public.ai_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Create policies for ai_config if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'ai_config' AND policyname = 'Allow public read access to ai_config'
    ) THEN
        CREATE POLICY "Allow public read access to ai_config" ON public.ai_config FOR SELECT USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'ai_config' AND policyname = 'Allow admin full access to ai_config'
    ) THEN
        CREATE POLICY "Allow admin full access to ai_config" ON public.ai_config FOR ALL USING (auth.role() = 'authenticated');
    END IF;
END
$$;

-- Create policies for analytics_events
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'analytics_events' AND policyname = 'Allow public insert to analytics_events'
    ) THEN
        CREATE POLICY "Allow public insert to analytics_events" ON public.analytics_events FOR INSERT WITH CHECK (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'analytics_events' AND policyname = 'Allow admin full access to analytics_events'
    ) THEN
        CREATE POLICY "Allow admin full access to analytics_events" ON public.analytics_events FOR ALL USING (auth.role() = 'authenticated');
    END IF;
END
$$;

-- Create policies for reports
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'reports' AND policyname = 'Allow public insert to reports'
    ) THEN
        CREATE POLICY "Allow public insert to reports" ON public.reports FOR INSERT WITH CHECK (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'reports' AND policyname = 'Allow admin full access to reports'
    ) THEN
        CREATE POLICY "Allow admin full access to reports" ON public.reports FOR ALL USING (auth.role() = 'authenticated');
    END IF;
END
$$;
