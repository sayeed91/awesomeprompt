'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { Lock, Copy, Check } from 'lucide-react'
import type { Post } from '@/lib/data'
import { TOOL_CSS_VARS } from '@/lib/data'

export default function PostCard({ post }: { post: Post }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [copied, setCopied] = useState(false)

  const handleMouseEnter = () => {
    if (videoRef.current && post.preview_video) {
      videoRef.current.play().catch(() => {})
    }
  }

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (post.is_premium || !post.prompt_text) return
    try {
      await navigator.clipboard.writeText(post.prompt_text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = post.prompt_text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Link href={`/posts/${post.slug}`} style={{ display: 'block' }}>
      <div
        className="card"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div style={{
          position: 'relative',
          aspectRatio: '3/2',
          overflow: 'hidden',
          background: 'var(--surface)',
        }}>
          <img
            src={post.preview_image}
            alt={post.title}
            className="thumb card-img"
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              position: 'absolute', top: 0, left: 0,
              transition: 'opacity 0.4s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
          {post.preview_video && (
            <video
              ref={videoRef}
              src={post.preview_video}
              muted loop playsInline preload="none"
              className="vid card-img"
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                position: 'absolute', top: 0, left: 0,
                opacity: 0,
                transition: 'opacity 0.4s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)',
              }}
            />
          )}
        </div>

        <div style={{
          padding: '14px 0 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '12px',
        }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h3 style={{
              fontSize: '16px', fontWeight: 500, color: 'var(--text)',
              lineHeight: 1.4, marginBottom: '6px',
              letterSpacing: '-0.01em',
            }}>{post.title}</h3>

            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              flexWrap: 'wrap',
            }}>
              {post.tools?.map(tool => {
                const c = TOOL_CSS_VARS[tool.toLowerCase()] || { bg: 'var(--surface)', text: 'var(--text-secondary)' }
                return (
                  <span key={tool} style={{
                    fontSize: '13px', fontWeight: 400,
                    padding: '2px 7px',
                    background: c.bg, color: c.text,
                    textTransform: 'capitalize',
                  }}>{tool}</span>
                )
              })}
              {post.sections && (
                <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
                  {post.sections} sections
                </span>
              )}
            </div>
          </div>

          <div style={{
            flexShrink: 0, display: 'flex', alignItems: 'center', gap: '4px',
            paddingTop: '3px',
          }}>
            {post.is_premium ? (
              <span style={{
                fontSize: '13px', fontWeight: 500, color: 'var(--gold)',
                display: 'flex', alignItems: 'center', gap: '3px',
              }}>
                <Lock size={12} strokeWidth={1.5} /> Pro
              </span>
            ) : (
              <button
                onClick={handleCopy}
                style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  fontSize: '13px', fontWeight: 500,
                  color: copied ? 'var(--green)' : 'var(--text-secondary)',
                  background: 'none', border: 'none', padding: 0,
                  cursor: 'pointer', transition: 'color 0.2s',
                }}
              >
                {copied ? (
                  <><Check size={13} strokeWidth={1.5} /> Copied</>
                ) : (
                  <><Copy size={13} strokeWidth={1.5} /> Copy</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
