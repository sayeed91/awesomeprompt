'use client'
import { useState } from 'react'
import { Search } from 'lucide-react'
import PostCard from '@/components/PostCard'
import FilterBar from '@/components/FilterBar'
import { DEMO_POSTS, searchPosts } from '@/lib/data'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'latest' | 'free' | 'premium' | 'animations'>('latest')
  const [sort, setSort] = useState<'popular' | 'new'>('new')
  const [selectedTools, setSelectedTools] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [query, setQuery] = useState('')

  let filtered = DEMO_POSTS

  if (query) filtered = searchPosts(filtered, query)

  if (activeTab === 'free') filtered = filtered.filter(p => !p.is_premium)
  if (activeTab === 'premium') filtered = filtered.filter(p => p.is_premium)
  if (activeTab === 'animations') filtered = filtered.filter(p => p.tags?.some(t => t.includes('animation')))

  if (selectedTools.length > 0) {
    filtered = filtered.filter(p => p.tools?.some(t => selectedTools.includes(t.toLowerCase())))
  }
  if (selectedTags.length > 0) {
    filtered = filtered.filter(p => p.tags?.some(t => selectedTags.includes(t.toLowerCase())))
  }

  if (sort === 'new') {
    filtered = [...filtered].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }

  return (
    <main className="wrapper">

      {/* Hero */}
      <div style={{
        paddingTop: 'clamp(32px, 4vw, 56px)',
        paddingBottom: 'clamp(24px, 3vw, 36px)',
      }}>
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 400,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          marginBottom: '14px',
          color: 'var(--text)',
        }}>
          AI Design Prompts
        </h1>
        <p style={{
          fontSize: '15px',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          maxWidth: '420px',
          marginBottom: '24px',
        }}>
          Curated prompts for Claude, Lovable, v0 and more.
          Copy free or unlock premium.
        </p>

        {/* Search */}
        <div style={{ position: 'relative', maxWidth: '400px' }}>
          <Search size={15} strokeWidth={1.5} style={{
            position: 'absolute', left: '12px', top: '50%',
            transform: 'translateY(-50%)', color: 'var(--muted)',
          }} />
          <input
            type="text"
            placeholder="Search prompts..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              width: '100%', height: '38px',
              padding: '0 12px 0 36px',
              border: '1px solid var(--border)',
              background: 'var(--bg-warm)',
              fontSize: '14px', color: 'var(--text)',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Filter bar */}
      <FilterBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        sort={sort}
        onSortChange={setSort}
        selectedTools={selectedTools}
        onToolsChange={setSelectedTools}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
        resultCount={filtered.length}
        totalCount={DEMO_POSTS.length}
      />

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid-prompts" style={{
          paddingBottom: 'clamp(48px, 6vw, 80px)',
        }}>
          {filtered.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center', padding: '80px 0',
          color: 'var(--muted)', fontSize: '14px',
        }}>
          No prompts found{query ? ` for "${query}"` : ''}.
        </div>
      )}
    </main>
  )
}
