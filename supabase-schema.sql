-- Run this in Supabase SQL Editor (supabase.com → your project → SQL Editor → New query)

create table posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  preview_image text,
  preview_video text,
  prompt_text text default '',
  tags text[] default '{}',
  tools text[] default '{}',
  is_premium boolean default false,
  sections integer,
  creator text default 'PromptStore',
  created_at timestamptz default now()
);

alter table posts enable row level security;

create policy "Anyone can read posts"
  on posts for select
  to anon
  using (true);

-- Sample data
insert into posts (title, slug, description, preview_image, preview_video, prompt_text, tags, tools, is_premium, sections, creator)
values
(
  'Synex — SaaS Landing Page',
  'synex-full-landing-page',
  'A complete SaaS landing page with scroll animations, glassmorphism hero, pricing table, and testimonials.',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
  null,
  'Build a modern SaaS landing page called "Synex" with the following specifications:

**Theme:** Dark mode with glassmorphism effects
**Sections:**
1. Hero section with animated gradient background, glassmorphism card overlay, headline "Ship faster with AI", subtext, and two CTAs
2. Logos/trust bar with 6 company logos in grayscale
3. Feature grid (3 columns) with icon, title, description for each feature
4. Pricing table with 3 tiers (Free, Pro $29/mo, Enterprise custom) with feature comparison
5. Testimonials carousel with 3 cards showing avatar, quote, name, role
6. CTA section with gradient background
7. Footer with 4 columns of links

**Tech:** React + Tailwind CSS + Framer Motion for scroll animations
**Responsive:** Mobile-first, works on all screen sizes
**Animations:** Fade-in on scroll, smooth hover effects, gradient animation on hero',
  ARRAY['landing page', 'saas', 'animation'],
  ARRAY['claude', 'lovable'],
  false,
  7,
  'Prompt Studio'
),
(
  'Lumio — Fintech Dashboard',
  'lumio-fintech-website',
  'Fintech landing page with data visualization, animated charts, and trust section.',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  null,
  'Create a fintech website called "Lumio" — a personal finance dashboard landing page.

**Color Scheme:** Dark navy (#0f172a) with blue (#3b82f6) and green (#22c55e) accents
**Sections:**
1. Hero with animated line chart visualization, headline "Your money, visualized", email signup form
2. Features section — 3 columns: Smart Budgeting, Investment Tracking, Bill Reminders
3. Trust section with bank/partner logos and "Bank-level security" badge
4. CTA section with gradient blue background

**Tech:** React + Tailwind CSS
**Charts:** Use simple CSS/SVG animations for chart previews',
  ARRAY['fintech', 'dashboard', 'landing page'],
  ARRAY['claude', 'v0'],
  false,
  4,
  'Prompt Studio'
),
(
  'Brilliant — Creative Portfolio',
  'brilliant-portfolio',
  'Developer portfolio with particle background, project grid, and contact form.',
  'https://images.unsplash.com/photo-1545670723-196ed0954986?w=800&q=80',
  null,
  'Build a creative developer portfolio called "Brilliant" with these specs:

**Design:** Dark background (#0a0a0a) with electric blue (#3b82f6) accent
**Sections:**
1. Full-screen hero with particle.js background, large name text, subtitle "Creative Developer"
2. About section with photo, bio text, and skill tags
3. Work/Projects grid (2x2) with hover overlay showing project title and tech stack
4. Contact section with simple form and social links
5. Minimal footer

**Tech:** React + Tailwind CSS + CSS animations
**Font:** Monospace for code feel, sans-serif for body',
  ARRAY['portfolio', 'website', 'animation'],
  ARRAY['claude', 'lovable'],
  false,
  5,
  'Bogdan Falin'
),
(
  'Shyen — Luxury Product Page',
  'shyen-product-landing',
  '9-section premium product page for ecommerce with scroll-triggered animations and elegant layout.',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
  null,
  '',
  ARRAY['ecommerce', 'landing page', 'animation'],
  ARRAY['claude', 'lovable', 'antigravity'],
  true,
  9,
  'Prompt Studio'
),
(
  'Nixole — Hero Section',
  'nixole-hero-page',
  'Stunning hero section with 3D floating elements and gradient mesh background.',
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
  null,
  'Design a hero section called "Nixole" with these specifications:

**Layout:** Full viewport height, centered content
**Background:** Animated gradient mesh (purple to blue to teal), subtle floating 3D shapes
**Content:**
- Eyebrow text: "Introducing Nixole 2.0"
- Headline: "Design without limits" (large, bold, white)
- Two buttons: "Get Started" (filled) and "Watch Demo" (outline)
- Trust line: "Trusted by 10,000+ designers"

**Animations:** Background gradient slowly shifts, shapes float with parallax
**Tech:** React + Tailwind + CSS animations',
  ARRAY['hero section', 'animation', 'website'],
  ARRAY['lovable'],
  false,
  2,
  'uixamjad'
),
(
  'Apex — Full SaaS Dashboard',
  'apex-saas-dashboard',
  'Complete dashboard UI with sidebar nav, analytics cards, data tables, and charts.',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  null,
  '',
  ARRAY['dashboard', 'saas', 'website'],
  ARRAY['claude', 'v0', 'cursor'],
  true,
  6,
  'Prompt Studio'
),
(
  'Velora — App Landing Page',
  'velora-mobile-landing',
  'Mobile app landing page with phone mockups, feature highlights, and app store badges.',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
  null,
  'Create a mobile app landing page called "Velora" — a fitness tracking app.

**Design:** Clean dark theme with vibrant green (#22c55e) accent
**Sections:**
1. Hero with iPhone mockup centered, tagline "Your fitness journey starts here", App Store + Play Store badges
2. Features — 3 rows alternating: phone mockup left/right with feature description
3. Social proof — "1M+ downloads", "4.9 rating", "Featured by Apple"
4. Pricing: Free vs Pro comparison
5. Download CTA with both store badges
6. Footer

**Tech:** React + Tailwind CSS',
  ARRAY['mobile app', 'landing page', 'animation'],
  ARRAY['claude', 'antigravity'],
  false,
  6,
  'Bogdan Falin'
),
(
  'Orion — Agency Website',
  'orion-agency-website',
  'Full agency website with case studies, team section, process timeline, and contact.',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  null,
  '',
  ARRAY['website', 'landing page'],
  ARRAY['claude', 'lovable'],
  true,
  8,
  'uixamjad'
);
