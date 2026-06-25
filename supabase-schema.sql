-- Run this in your Supabase SQL Editor

create table posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  preview_url text,
  preview_type text default 'image' check (preview_type in ('image', 'video')),
  prompt_text text,
  tags text[] default '{}',
  tools text[] default '{}',
  is_premium boolean default false,
  created_at timestamptz default now()
);

-- Enable public read access (RLS)
alter table posts enable row level security;

create policy "Public can read all posts"
  on posts for select
  to anon
  using (true);

-- Insert sample data
insert into posts (title, slug, description, preview_url, preview_type, prompt_text, tags, tools, is_premium)
values
(
  'Synex — Full Landing Page',
  'synex-full-landing-page',
  'A complete SaaS landing page with scroll animations and glassmorphism.',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
  'image',
  'Build a modern SaaS landing page called Synex with a dark theme, glassmorphism hero section, animated gradient background, feature grid with icons, pricing table with 3 tiers, and smooth scroll animations. Use React with Tailwind CSS.',
  ARRAY['landing page', 'saas', 'scroll animation'],
  ARRAY['claude', 'lovable'],
  false
),
(
  'Lumio — Fintech Website',
  'lumio-fintech-website',
  '4-section fintech landing page with data visualization.',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  'image',
  'Create a fintech website for Lumio — a personal finance app. Dark navy theme, hero with animated chart, features section with 3 columns, trust section with logos, and CTA. Clean and professional.',
  ARRAY['fintech', 'landing page', 'website'],
  ARRAY['claude', 'v0'],
  false
);
