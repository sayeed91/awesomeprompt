'use client'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function HirePage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
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
          marginBottom: '24px',
          maxWidth: '900px',
        }}>
          We turn prompts<br />into products
        </h1>
        <p style={{
          fontSize: 'clamp(15px, 1.3vw, 18px)',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          maxWidth: '480px',
          marginBottom: '32px',
        }}>
          Custom prompts, full websites, design systems —
          built and delivered by the team behind PromptStore.
        </p>
        <a href="#contact" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '14px 28px', fontSize: '15px', fontWeight: 500,
          color: 'var(--bg)', background: 'var(--text)',
        }}>
          Start a project <ArrowRight size={16} strokeWidth={1.5} />
        </a>
      </div>

      {/* Services — large pricing cards */}
      <div style={{
        paddingTop: 'clamp(48px, 6vw, 72px)',
        paddingBottom: 'clamp(48px, 6vw, 72px)',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(16px, 2vw, 24px)',
        }}>
          {[
            {
              title: 'Custom Prompt',
              price: '$99',
              from: true,
              desc: 'Multi-section prompts built for your exact use case. Tested across Claude, Lovable, v0, and Cursor.',
              time: '2–3 days',
              popular: false,
            },
            {
              title: 'Prompt → Website',
              price: '$299',
              from: true,
              desc: 'We write the prompt, generate the site, refine every section, and deploy it live on your domain.',
              time: '3–5 days',
              popular: true,
            },
            {
              title: 'Design System',
              price: '$999',
              from: true,
              desc: 'Full component library with design tokens, built AI-first. Your team ships 10x faster.',
              time: '1–2 weeks',
              popular: false,
            },
            {
              title: 'Consulting',
              price: '$150',
              from: false,
              desc: 'Hands-on sessions to integrate AI tools into your design and development workflow.',
              time: 'Per hour',
              popular: false,
            },
          ].map(item => (
            <div key={item.title} style={{
              padding: 'clamp(24px, 3vw, 36px)',
              border: item.popular ? '2px solid var(--text)' : '1px solid var(--border)',
              background: item.popular ? 'var(--bg-warm)' : 'var(--bg)',
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                marginBottom: '20px',
              }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text)', marginBottom: '4px' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
                    Delivery: {item.time}
                  </div>
                </div>
                {item.popular && (
                  <span style={{
                    fontSize: '11px', fontWeight: 500,
                    padding: '3px 10px',
                    background: 'var(--text)', color: 'var(--bg)',
                  }}>Popular</span>
                )}
              </div>

              <div style={{ marginBottom: '20px' }}>
                {item.from && (
                  <span style={{ fontSize: '13px', color: 'var(--muted)', marginRight: '4px' }}>from</span>
                )}
                <span style={{
                  fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 400,
                  letterSpacing: '-0.03em', color: 'var(--text)',
                }}>{item.price}</span>
                {!item.from && (
                  <span style={{ fontSize: '14px', color: 'var(--muted)', marginLeft: '2px' }}>/hr</span>
                )}
              </div>

              <p style={{
                fontSize: '14px', color: 'var(--text-secondary)',
                lineHeight: 1.6, flex: 1, marginBottom: '24px',
              }}>{item.desc}</p>

              <a href="#contact" style={{
                display: 'block', textAlign: 'center',
                padding: '12px', fontSize: '14px', fontWeight: 500,
                color: item.popular ? 'var(--bg)' : 'var(--text)',
                background: item.popular ? 'var(--text)' : 'transparent',
                border: item.popular ? 'none' : '1px solid var(--border)',
              }}>
                Get started <span style={{ marginLeft: '4px' }}>→</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Stats + Process — side by side */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 2fr',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}>
        {/* Stats */}
        <div style={{
          borderRight: '1px solid var(--border)',
          padding: 'clamp(28px, 3vw, 40px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '28px',
        }}>
          {[
            { n: '50+', label: 'Projects shipped' },
            { n: '24h', label: 'First response' },
            { n: '5', label: 'AI tools tested' },
          ].map(item => (
            <div key={item.label}>
              <div style={{
                fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400,
                letterSpacing: '-0.03em', color: 'var(--text)',
              }}>{item.n}</div>
              <div style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '2px' }}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* Process */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        }}>
          {[
            { n: '01', title: 'Brief', desc: 'You tell us what you need. We scope it and reply within 24 hours.' },
            { n: '02', title: 'Build', desc: 'We craft, test, and refine. Progress updates at each stage.' },
            { n: '03', title: 'Ship', desc: 'Final delivery — prompt, code, or live site. Revisions included.' },
          ].map((item, i) => (
            <div key={item.n} style={{
              padding: 'clamp(28px, 3vw, 40px)',
              borderLeft: i > 0 ? '1px solid var(--border)' : 'none',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              <div style={{
                fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400,
                color: 'var(--border)', letterSpacing: '-0.02em',
                marginBottom: '14px',
              }}>{item.n}</div>
              <div style={{
                fontSize: '15px', fontWeight: 500, color: 'var(--text)',
                marginBottom: '6px',
              }}>{item.title}</div>
              <div style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6 }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact form */}
      <div id="contact" style={{
        paddingTop: 'clamp(64px, 8vw, 100px)',
        paddingBottom: 'clamp(64px, 8vw, 100px)',
      }}>
        <div className="grid-2col" style={{ alignItems: 'start' }}>
          {/* Left */}
          <div>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}>
              Start a project
            </h2>
            <p style={{
              fontSize: '15px', color: 'var(--text-secondary)',
              lineHeight: 1.7, maxWidth: '360px',
            }}>
              Tell us what you need. We reply within 24 hours with a scope, timeline, and quote. No commitment.
            </p>
          </div>

          {/* Right — form */}
          <div>
            {submitted ? (
              <div style={{
                padding: 'clamp(48px, 6vw, 72px) clamp(24px, 3vw, 36px)',
                background: 'var(--bg-warm)',
                border: '1px solid var(--border)',
              }}>
                <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--green)', marginBottom: '10px' }}>
                  Brief received
                </div>
                <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6 }}>
                  We'll review your project and get back within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{
                border: '1px solid var(--border)',
              }}>
                {[
                  { label: 'Name', name: 'name', type: 'text', placeholder: 'Your name' },
                  { label: 'Email', name: 'email', type: 'email', placeholder: 'you@company.com' },
                ].map(field => (
                  <div key={field.name} style={{
                    padding: '14px 20px',
                    borderBottom: '1px solid var(--border)',
                  }}>
                    <label style={{
                      display: 'block', fontSize: '12px', fontWeight: 500,
                      color: 'var(--muted)', marginBottom: '4px',
                      letterSpacing: '0.04em', textTransform: 'uppercase',
                    }}>{field.label}</label>
                    <input
                      type={field.type} name={field.name} required
                      placeholder={field.placeholder}
                      style={{
                        width: '100%', padding: 0, fontSize: '14px',
                        color: 'var(--text)', background: 'transparent',
                        border: 'none', outline: 'none', fontFamily: 'inherit',
                      }}
                    />
                  </div>
                ))}

                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr',
                  borderBottom: '1px solid var(--border)',
                }}>
                  <div style={{ padding: '14px 20px', borderRight: '1px solid var(--border)' }}>
                    <label style={{
                      display: 'block', fontSize: '12px', fontWeight: 500,
                      color: 'var(--muted)', marginBottom: '4px',
                      letterSpacing: '0.04em', textTransform: 'uppercase',
                    }}>Service</label>
                    <select name="project_type" required defaultValue="" style={{
                      width: '100%', padding: 0, fontSize: '14px',
                      color: 'var(--text)', background: 'transparent',
                      border: 'none', outline: 'none', fontFamily: 'inherit',
                      cursor: 'pointer',
                    }}>
                      <option value="" disabled>Select</option>
                      <option>Custom Prompt</option>
                      <option>Prompt → Website</option>
                      <option>Design System</option>
                      <option>Consulting</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div style={{ padding: '14px 20px' }}>
                    <label style={{
                      display: 'block', fontSize: '12px', fontWeight: 500,
                      color: 'var(--muted)', marginBottom: '4px',
                      letterSpacing: '0.04em', textTransform: 'uppercase',
                    }}>Budget</label>
                    <select name="budget" defaultValue="" style={{
                      width: '100%', padding: 0, fontSize: '14px',
                      color: 'var(--text)', background: 'transparent',
                      border: 'none', outline: 'none', fontFamily: 'inherit',
                      cursor: 'pointer',
                    }}>
                      <option value="" disabled>Select</option>
                      <option>Under $500</option>
                      <option>$500 – $2,000</option>
                      <option>$2,000 – $5,000</option>
                      <option>$5,000+</option>
                    </select>
                  </div>
                </div>

                <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
                  <label style={{
                    display: 'block', fontSize: '12px', fontWeight: 500,
                    color: 'var(--muted)', marginBottom: '4px',
                    letterSpacing: '0.04em', textTransform: 'uppercase',
                  }}>Project details</label>
                  <textarea
                    name="message" required rows={4}
                    placeholder="What do you need built?"
                    style={{
                      width: '100%', padding: 0, fontSize: '14px',
                      color: 'var(--text)', background: 'transparent',
                      border: 'none', outline: 'none', fontFamily: 'inherit',
                      resize: 'vertical', minHeight: '80px',
                    }}
                  />
                </div>

                <div style={{ padding: '14px 20px' }}>
                  <button type="submit" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '8px', width: '100%', padding: '12px',
                    background: 'var(--text)', color: 'var(--bg)',
                    border: 'none', fontSize: '14px', fontWeight: 500,
                    cursor: 'pointer',
                  }}>
                    Send brief <ArrowRight size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
