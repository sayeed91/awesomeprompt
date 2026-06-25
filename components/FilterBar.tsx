'use client'
import { useState, useRef, useEffect } from 'react'
import { SlidersHorizontal, ChevronDown } from 'lucide-react'

type Tab = 'latest' | 'free' | 'premium' | 'animations'
type Sort = 'popular' | 'new'

const AI_TOOLS = ['Claude', 'Lovable', 'v0', 'Antigravity', 'Cursor']
const TAGS = ['Landing page', 'Portfolio', 'Fintech', 'SaaS', 'Ecommerce', 'Hero section', 'Dashboard', 'Animation', 'Mobile app', 'Website']

export default function FilterBar({
  activeTab,
  onTabChange,
  sort,
  onSortChange,
  selectedTools,
  onToolsChange,
  selectedTags,
  onTagsChange,
  resultCount,
  totalCount,
}: {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  sort: Sort
  onSortChange: (sort: Sort) => void
  selectedTools: string[]
  onToolsChange: (tools: string[]) => void
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
  resultCount: number
  totalCount: number
}) {
  const [sortOpen, setSortOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [filterTab, setFilterTab] = useState<'tools' | 'tags'>('tools')
  const sortRef = useRef<HTMLDivElement>(null)
  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false)
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setFilterOpen(false)
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setSortOpen(false); setFilterOpen(false) }
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [])

  const toggleTool = (tool: string) => {
    const lower = tool.toLowerCase()
    onToolsChange(
      selectedTools.includes(lower)
        ? selectedTools.filter(t => t !== lower)
        : [...selectedTools, lower]
    )
  }

  const toggleTag = (tag: string) => {
    const lower = tag.toLowerCase()
    onTagsChange(
      selectedTags.includes(lower)
        ? selectedTags.filter(t => t !== lower)
        : [...selectedTags, lower]
    )
  }

  const activeFilterCount = selectedTools.length + selectedTags.length

  const tabs: { id: Tab; label: string }[] = [
    { id: 'latest', label: 'Latest' },
    { id: 'free', label: 'Free prompts' },
    { id: 'premium', label: 'Premium' },
    { id: 'animations', label: 'Animations' },
  ]

  const chipStyle = (active: boolean): React.CSSProperties => ({
    padding: '6px 14px',
    fontSize: '13px',
    fontWeight: 400,
    border: active ? '1px solid var(--text)' : '1px solid var(--border)',
    background: active ? 'var(--text)' : 'var(--bg)',
    color: active ? 'var(--bg)' : 'var(--text-secondary)',
    cursor: 'pointer',
    transition: 'all 0.15s',
  })

  return (
    <div style={{
      borderBottom: '1px solid var(--border)',
      marginBottom: '16px',
    }}>
      <div className="filter-bar-inner">
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={{
                padding: '16px 14px',
                fontSize: '14px',
                fontWeight: activeTab === tab.id ? 500 : 400,
                color: activeTab === tab.id ? 'var(--text)' : 'var(--muted)',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid var(--text)' : '2px solid transparent',
                marginBottom: '-1px',
                transition: 'color 0.15s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Result count */}
          {resultCount !== totalCount && (
            <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
              {resultCount} of {totalCount}
            </span>
          )}

          {/* Sort dropdown */}
          <div ref={sortRef} style={{ position: 'relative' }}>
            <button
              onClick={() => { setSortOpen(!sortOpen); setFilterOpen(false) }}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '6px 14px',
                fontSize: '14px', fontWeight: 400,
                color: 'var(--text-secondary)',
                background: 'none',
                border: '1px solid var(--border)',
              }}
            >
              {sort === 'popular' ? 'Popular' : 'New'}
              <ChevronDown size={14} strokeWidth={1.5} style={{
                transform: sortOpen ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s',
              }} />
            </button>

            {sortOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 6px)', right: 0,
                background: 'var(--bg)', border: '1px solid var(--border)',
                boxShadow: '0 8px 24px var(--shadow)',
                minWidth: '160px', zIndex: 50,
                padding: '6px 0',
              }}>
                {(['popular', 'new'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => { onSortChange(s); setSortOpen(false) }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      width: '100%', padding: '10px 16px',
                      fontSize: '14px', fontWeight: sort === s ? 500 : 400,
                      color: sort === s ? 'var(--text)' : 'var(--text-secondary)',
                      background: 'none', border: 'none',
                      textAlign: 'left',
                    }}
                  >
                    {s === 'popular' ? 'Popular' : 'New'}
                    {sort === s && <span>&#10003;</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filter panel */}
          <div ref={filterRef} style={{ position: 'relative' }}>
            <button
              onClick={() => { setFilterOpen(!filterOpen); setSortOpen(false) }}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '6px 14px',
                fontSize: '14px', fontWeight: 400,
                color: 'var(--text-secondary)',
                background: 'none',
                border: '1px solid var(--border)',
              }}
            >
              <SlidersHorizontal size={14} strokeWidth={1.5} />
              Filters
              {activeFilterCount > 0 && (
                <span style={{
                  fontSize: '11px', fontWeight: 500,
                  background: 'var(--text)', color: 'var(--bg)',
                  width: '18px', height: '18px',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '50%',
                }}>{activeFilterCount}</span>
              )}
            </button>

            {filterOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 6px)', right: 0,
                background: 'var(--bg)', border: '1px solid var(--border)',
                boxShadow: '0 8px 24px var(--shadow)',
                width: '340px', zIndex: 50,
              }}>
                <div style={{
                  display: 'flex',
                  borderBottom: '1px solid var(--border)',
                }}>
                  {(['tools', 'tags'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setFilterTab(t)}
                      style={{
                        flex: 1, padding: '12px',
                        fontSize: '14px', fontWeight: filterTab === t ? 500 : 400,
                        color: filterTab === t ? 'var(--text)' : 'var(--muted)',
                        background: 'none', border: 'none',
                        borderBottom: filterTab === t ? '2px solid var(--text)' : '2px solid transparent',
                        marginBottom: '-1px',
                      }}
                    >
                      {t === 'tools' ? 'AI Tools' : 'Tags'}
                    </button>
                  ))}
                </div>

                <div style={{
                  padding: '16px',
                  display: 'flex', gap: '8px', flexWrap: 'wrap',
                  minHeight: '80px',
                }}>
                  {filterTab === 'tools'
                    ? AI_TOOLS.map(tool => (
                      <button key={tool} onClick={() => toggleTool(tool)}
                        style={chipStyle(selectedTools.includes(tool.toLowerCase()))}>
                        {tool}
                      </button>
                    ))
                    : TAGS.map(tag => (
                      <button key={tag} onClick={() => toggleTag(tag)}
                        style={chipStyle(selectedTags.includes(tag.toLowerCase()))}>
                        {tag}
                      </button>
                    ))
                  }
                </div>

                {activeFilterCount > 0 && (
                  <div style={{
                    padding: '12px 16px',
                    borderTop: '1px solid var(--border)',
                    display: 'flex', justifyContent: 'flex-end',
                  }}>
                    <button
                      onClick={() => { onToolsChange([]); onTagsChange([]) }}
                      style={{
                        padding: '8px 16px', fontSize: '13px',
                        color: 'var(--text-secondary)',
                        background: 'none', border: '1px solid var(--border)',
                      }}
                    >Clear all</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
