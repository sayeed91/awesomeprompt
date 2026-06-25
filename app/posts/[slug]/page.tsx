'use client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Copy, Check, Lock } from 'lucide-react'
import { useState, useEffect } from 'react'
import { DEMO_POSTS, TOOL_CSS_VARS, fetchPostBySlug, fetchPosts } from '@/lib/data'
import type { Post } from '@/lib/data'
import PostCard from '@/components/PostCard'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button onClick={handleCopy} style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      padding: '8px 16px',
      border: '1px solid var(--border)',
      background: copied ? 'var(--green-bg)' : 'var(--bg)',
      color: copied ? 'var(--green)' : 'var(--text-secondary)',
      fontSize: '14px', fontWeight: 500,
      cursor: 'pointer', transition: 'all 0.2s',
    }}>
      {copied ? <Check size={14} strokeWidth={1.5} /> : <Copy size={14} strokeWidth={1.5} />}
      {copied ? 'Copied' : 'Copy prompt'}
    </button>
  )
}

export default function PostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<Post | null>(null)
  const [related, setRelated] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const p = await fetchPostBySlug(slug)
      setPost(p)
      if (p) {
        const all = await fetchPosts()
        setRelated(
          all.filter(r => r.id !== p.id && r.tags?.some(t => p.tags?.includes(t))).slice(0, 3)
        )
      }
      setLoading(false)
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <div className="wrapper" style={{ paddingTop: '100px', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', color: 'var(--muted)' }}>Loading...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="wrapper" style={{ paddingTop: '100px', textAlign: 'center' }}>
        <p style={{ fontSize: '15px', color: 'var(--muted)', marginBottom: '12px' }}>Prompt not found</p>
        <Link href="/" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Back to library</Link>
      </div>
    )
  }

  return (
    <main className="wrapper">
      <div style={{ paddingTop: '24px', paddingBottom: '24px' }}>
        <Link href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          color: 'var(--muted)', fontSize: '14px',
        }}>
          <ArrowLeft size={14} strokeWidth={1.5} /> Back
        </Link>
      </div>

      <div className="grid-detail" style={{
        paddingBottom: 'clamp(48px, 6vw, 80px)',
      }}>
        {/* Left — info */}
        <div style={{ position: 'sticky', top: '80px' }}>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {post.tools?.map(tool => {
              const c = TOOL_CSS_VARS[tool.toLowerCase()] || { bg: 'var(--surface)', text: 'var(--text-secondary)' }
              return (
                <span key={tool} style={{
                  fontSize: '13px', fontWeight: 400,
                  padding: '3px 8px',
                  background: c.bg, color: c.text,
                  textTransform: 'capitalize',
                }}>{tool}</span>
              )
            })}
            {post.is_premium && (
              <span style={{
                fontSize: '13px', fontWeight: 500,
                padding: '3px 8px', background: 'var(--gold-bg)', color: 'var(--gold)',
                display: 'flex', alignItems: 'center', gap: '4px',
              }}><Lock size={12} strokeWidth={1.5} /> Pro</span>
            )}
          </div>

          <h1 style={{
            fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 400,
            letterSpacing: '-0.02em', lineHeight: 1.3,
            marginBottom: '14px',
          }}>{post.title}</h1>

          <p style={{
            fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7,
            marginBottom: '20px',
          }}>{post.description}</p>

          <div style={{
            fontSize: '14px', color: 'var(--muted)',
            display: 'flex', gap: '16px', marginBottom: '24px',
          }}>
            <span>{post.creator}</span>
            {post.sections && <span>{post.sections} sections</span>}
          </div>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '28px' }}>
            {post.tags?.map(tag => (
              <span key={tag} style={{
                fontSize: '13px', color: 'var(--muted)',
                background: 'var(--bg-warm)', padding: '3px 8px',
                border: '1px solid var(--border)',
              }}>{tag}</span>
            ))}
          </div>

          {post.is_premium ? (
            <div>
              <Link href="/pricing" style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '9px 18px',
                border: '1px solid var(--text)', background: 'var(--text)',
                color: 'var(--bg)', fontSize: '14px', fontWeight: 500,
              }}>
                Get Pro — $9/mo
              </Link>
              <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '10px' }}>
                Unlock all premium prompts
              </p>
            </div>
          ) : (
            <CopyButton text={post.prompt_text} />
          )}
        </div>

        {/* Right — preview + prompt */}
        <div>
          <div style={{
            overflow: 'hidden', background: 'var(--surface)',
            marginBottom: '32px',
          }}>
            {post.preview_video ? (
              <video src={post.preview_video} autoPlay muted loop playsInline
                style={{ width: '100%', display: 'block' }} />
            ) : (
              <img src={post.preview_image} alt={post.title}
                style={{ width: '100%', display: 'block' }} />
            )}
          </div>

          {post.is_premium ? (
            <div style={{
              padding: 'clamp(40px, 5vw, 64px) clamp(20px, 3vw, 40px)',
              background: 'var(--bg-warm)', border: '1px solid var(--border)',
              textAlign: 'center',
            }}>
              <Lock size={20} strokeWidth={1.2} style={{ color: 'var(--gold)', margin: '0 auto 14px' }} />
              <p style={{ fontSize: '16px', color: 'var(--text)', marginBottom: '8px' }}>
                Premium prompt
              </p>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                {post.sections} sections of production-ready prompt. Unlock with Pro.
              </p>
              <Link href="/pricing" style={{
                fontSize: '14px', fontWeight: 500, color: 'var(--bg)',
                background: 'var(--text)', padding: '9px 18px',
              }}>See pricing</Link>
            </div>
          ) : (
            <div>
              <div style={{
                fontSize: '13px', fontWeight: 500, color: 'var(--muted)',
                letterSpacing: '0.04em', textTransform: 'uppercase',
                marginBottom: '12px',
              }}>Prompt</div>
              <pre style={{
                fontSize: '14px', lineHeight: 1.8, color: 'var(--text)',
                fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
                whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                padding: 'clamp(20px, 3vw, 32px)',
                background: 'var(--bg-warm)', border: '1px solid var(--border)',
              }}>{post.prompt_text}</pre>
            </div>
          )}
        </div>
      </div>

      {/* Related prompts */}
      {related.length > 0 && (
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: 'clamp(32px, 4vw, 48px)',
          paddingBottom: 'clamp(48px, 6vw, 80px)',
        }}>
          <h2 style={{
            fontSize: '16px', fontWeight: 500, color: 'var(--text)',
            marginBottom: '24px',
          }}>Related prompts</h2>
          <div className="grid-prompts">
            {related.map(p => <PostCard key={p.id} post={p} />)}
          </div>
        </div>
      )}
    </main>
  )
}
