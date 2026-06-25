export type Post = {
  id: string
  title: string
  slug: string
  description: string
  preview_image: string
  preview_video?: string
  prompt_text: string
  tags: string[]
  tools: string[]
  is_premium: boolean
  sections?: number
  creator: string
  created_at: string
}

export const TOOL_CSS_VARS: Record<string, { bg: string; text: string }> = {
  claude:      { bg: 'var(--tool-claude-bg)', text: 'var(--tool-claude-text)' },
  lovable:     { bg: 'var(--tool-lovable-bg)', text: 'var(--tool-lovable-text)' },
  v0:          { bg: 'var(--tool-v0-bg)', text: 'var(--tool-v0-text)' },
  antigravity: { bg: 'var(--tool-antigravity-bg)', text: 'var(--tool-antigravity-text)' },
  cursor:      { bg: 'var(--tool-cursor-bg)', text: 'var(--tool-cursor-text)' },
}

import { supabase } from './supabase'

export async function fetchPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error || !data || data.length === 0) {
    return DEMO_POSTS
  }
  return data as Post[]
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return DEMO_POSTS.find(p => p.slug === slug) || null
  }
  return data as Post
}

export function searchPosts(posts: Post[], query: string): Post[] {
  const q = query.toLowerCase().trim()
  if (!q) return posts
  return posts.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tags?.some(t => t.includes(q)) ||
    p.tools?.some(t => t.includes(q)) ||
    p.creator.toLowerCase().includes(q)
  )
}

export const ALL_TAGS = [
  'landing page', 'portfolio', 'fintech', 'saas', 'ecommerce',
  'hero section', 'website', 'animation', 'dashboard', 'mobile app',
]

export const DEMO_POSTS: Post[] = [
  {
    id: '1',
    title: 'Synex — SaaS Landing Page',
    slug: 'synex-full-landing-page',
    description: 'A complete SaaS landing page with scroll animations, glassmorphism hero, pricing table, and testimonials.',
    preview_image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    preview_video: 'https://cdn.pixabay.com/video/2024/03/18/204816-924816498_large.mp4',
    prompt_text: `Build a modern SaaS landing page called "Synex" with the following specifications:

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
**Animations:** Fade-in on scroll, smooth hover effects, gradient animation on hero`,
    tags: ['landing page', 'saas', 'animation'],
    tools: ['claude', 'lovable'],
    is_premium: false,
    sections: 7,
    creator: 'Prompt Studio',
    created_at: '2026-06-20T10:00:00Z',
  },
  {
    id: '2',
    title: 'Lumio — Fintech Dashboard',
    slug: 'lumio-fintech-website',
    description: 'Fintech landing page with data visualization, animated charts, and trust section.',
    preview_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    preview_video: 'https://cdn.pixabay.com/video/2021/04/06/70018-534711790_large.mp4',
    prompt_text: `Create a fintech website called "Lumio" — a personal finance dashboard landing page.

**Color Scheme:** Dark navy (#0f172a) with blue (#3b82f6) and green (#22c55e) accents
**Sections:**
1. Hero with animated line chart visualization, headline "Your money, visualized", email signup form
2. Features section — 3 columns: Smart Budgeting, Investment Tracking, Bill Reminders
3. Trust section with bank/partner logos and "Bank-level security" badge
4. CTA section with gradient blue background

**Tech:** React + Tailwind CSS
**Charts:** Use simple CSS/SVG animations for chart previews`,
    tags: ['fintech', 'dashboard', 'landing page'],
    tools: ['claude', 'v0'],
    is_premium: false,
    sections: 4,
    creator: 'Prompt Studio',
    created_at: '2026-06-19T10:00:00Z',
  },
  {
    id: '3',
    title: 'Brilliant — Creative Portfolio',
    slug: 'brilliant-portfolio',
    description: 'Developer portfolio with particle background, project grid, and contact form.',
    preview_image: 'https://images.unsplash.com/photo-1545670723-196ed0954986?w=800&q=80',
    preview_video: 'https://cdn.pixabay.com/video/2020/08/09/46562-449614853_large.mp4',
    prompt_text: `Build a creative developer portfolio called "Brilliant" with these specs:

**Design:** Dark background (#0a0a0a) with electric blue (#3b82f6) accent
**Sections:**
1. Full-screen hero with particle.js background, large name text, subtitle "Creative Developer"
2. About section with photo, bio text, and skill tags
3. Work/Projects grid (2x2) with hover overlay showing project title and tech stack
4. Contact section with simple form and social links
5. Minimal footer

**Tech:** React + Tailwind CSS + CSS animations
**Font:** Monospace for code feel, sans-serif for body`,
    tags: ['portfolio', 'website', 'animation'],
    tools: ['claude', 'lovable'],
    is_premium: false,
    sections: 5,
    creator: 'Bogdan Falin',
    created_at: '2026-06-18T10:00:00Z',
  },
  {
    id: '4',
    title: 'Shyen — Luxury Product Page',
    slug: 'shyen-product-landing',
    description: '9-section premium product page for ecommerce with scroll-triggered animations and elegant layout.',
    preview_image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    prompt_text: '',
    tags: ['ecommerce', 'landing page', 'animation'],
    tools: ['claude', 'lovable', 'antigravity'],
    is_premium: true,
    sections: 9,
    creator: 'Prompt Studio',
    created_at: '2026-06-17T10:00:00Z',
  },
  {
    id: '5',
    title: 'Nixole — Hero Section',
    slug: 'nixole-hero-page',
    description: 'Stunning hero section with 3D floating elements and gradient mesh background.',
    preview_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
    preview_video: 'https://cdn.pixabay.com/video/2021/02/11/64675-510898498_large.mp4',
    prompt_text: `Design a hero section called "Nixole" with these specifications:

**Layout:** Full viewport height, centered content
**Background:** Animated gradient mesh (purple to blue to teal), subtle floating 3D shapes
**Content:**
- Eyebrow text: "Introducing Nixole 2.0"
- Headline: "Design without limits" (large, bold, white)
- Two buttons: "Get Started" (filled) and "Watch Demo" (outline)
- Trust line: "Trusted by 10,000+ designers"

**Animations:** Background gradient slowly shifts, shapes float with parallax
**Tech:** React + Tailwind + CSS animations`,
    tags: ['hero section', 'animation', 'website'],
    tools: ['lovable'],
    is_premium: false,
    sections: 2,
    creator: 'uixamjad',
    created_at: '2026-06-16T10:00:00Z',
  },
  {
    id: '6',
    title: 'Apex — Full SaaS Dashboard',
    slug: 'apex-saas-dashboard',
    description: 'Complete dashboard UI with sidebar nav, analytics cards, data tables, and charts.',
    preview_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    prompt_text: '',
    tags: ['dashboard', 'saas', 'website'],
    tools: ['claude', 'v0', 'cursor'],
    is_premium: true,
    sections: 6,
    creator: 'Prompt Studio',
    created_at: '2026-06-15T10:00:00Z',
  },
  {
    id: '7',
    title: 'Velora — App Landing Page',
    slug: 'velora-mobile-landing',
    description: 'Mobile app landing page with phone mockups, feature highlights, and app store badges.',
    preview_image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    preview_video: 'https://cdn.pixabay.com/video/2019/11/08/29072-372627822_large.mp4',
    prompt_text: `Create a mobile app landing page called "Velora" — a fitness tracking app.

**Design:** Clean dark theme with vibrant green (#22c55e) accent
**Sections:**
1. Hero with iPhone mockup centered, tagline "Your fitness journey starts here", App Store + Play Store badges
2. Features — 3 rows alternating: phone mockup left/right with feature description
3. Social proof — "1M+ downloads", "4.9 rating", "Featured by Apple"
4. Pricing: Free vs Pro comparison
5. Download CTA with both store badges
6. Footer

**Tech:** React + Tailwind CSS`,
    tags: ['mobile app', 'landing page', 'animation'],
    tools: ['claude', 'antigravity'],
    is_premium: false,
    sections: 6,
    creator: 'Bogdan Falin',
    created_at: '2026-06-14T10:00:00Z',
  },
  {
    id: '8',
    title: 'Orion — Agency Website',
    slug: 'orion-agency-website',
    description: 'Full agency website with case studies, team section, process timeline, and contact.',
    preview_image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    prompt_text: '',
    tags: ['website', 'landing page'],
    tools: ['claude', 'lovable'],
    is_premium: true,
    sections: 8,
    creator: 'uixamjad',
    created_at: '2026-06-13T10:00:00Z',
  },
]
