-- Create branding table
CREATE TABLE IF NOT EXISTS public.branding (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_name TEXT NOT NULL DEFAULT 'ZENTRYX',
    tagline TEXT DEFAULT 'Smart Tools. Zero Effort.',
    logo TEXT,
    favicon TEXT,
    primary_color TEXT DEFAULT '#3A7AFE',
    secondary_color TEXT DEFAULT '#9333EA',
    logo_width INTEGER DEFAULT 140,
    show_site_name BOOLEAN DEFAULT true,
    site_icon TEXT,
    footer_logo TEXT,
    footer_logo_width INTEGER DEFAULT 140,
    footer_text TEXT,
    footer_bg_color1 TEXT DEFAULT '#0F172A',
    footer_bg_color2 TEXT DEFAULT '#1E293B',
    footer_links JSONB DEFAULT '{"column1Title": "Tools", "column1Links": [], "column2Title": "Company", "column2Links": [], "column3Title": "Support", "column3Links": []}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT,
    cover_image TEXT,
    author TEXT,
    date TEXT, -- Storing as text for simplicity to match current frontend, or DATE
    tags TEXT[],
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create tools table (migrating from static file)
CREATE TABLE IF NOT EXISTS public.tools (
    id SERIAL PRIMARY KEY, -- Using Serial to match existing number IDs, or change to UUID
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    url TEXT,
    icon TEXT,
    uses INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT false,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create ads_config table
CREATE TABLE IF NOT EXISTS public.ads_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enabled BOOLEAN DEFAULT true,
    provider TEXT DEFAULT 'custom',
    google_adsense_id TEXT DEFAULT '',
    slots JSONB DEFAULT '{"header": {"enabled": true, "code": ""}, "sidebar": {"enabled": true, "code": ""}, "footer": {"enabled": false, "code": ""}, "toolPage": {"enabled": true, "code": ""}}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create ai_config table
CREATE TABLE IF NOT EXISTS public.ai_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    providers JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.ai_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ads_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branding ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to ai_config" ON public.ai_config FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to ai_config" ON public.ai_config FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read access to ads_config" ON public.ads_config FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to ads_config" ON public.ads_config FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read access to branding" ON public.branding FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to branding" ON public.branding FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read access to blog_posts" ON public.blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Allow admin full access to blog_posts" ON public.blog_posts FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read access to tools" ON public.tools FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to tools" ON public.tools FOR ALL USING (auth.role() = 'authenticated');

