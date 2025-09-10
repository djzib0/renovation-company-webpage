'use client'

import * as React from 'react'
import Link from 'next/link'
import ActiveLink from './ActiveLink'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]


type NavbarProps = { topOffset?: number }

export function Navbar({ topOffset = 0 }: NavbarProps) {
  const [open, setOpen] = React.useState(false)

  // Close on route change (best-effort)
  React.useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('hashchange', close)
    return () => window.removeEventListener('hashchange', close)
  }, [])

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-neutral-950/60 py-6"
      style={{ top: topOffset }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="grid size-8 place-items-center rounded-xl bg-gradient-to-br from-amber-500 to-rose-500 text-white shadow-md">
              <span className="text-xs">RC</span>
            </div>
            <span className="text-base tracking-tight">Renovation Co.</span>
          </Link>
        </div>

        {/* Center: Desktop nav */}
        <div className="hidden items-center gap-2 md:flex">
          {NAV_LINKS.map((l) => (
            <ActiveLink key={l.href} href={l.href} label={l.label} />
          ))}
        </div>

        {/* Mobile hamburger (no border, simplified) */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            className="inline-flex items-center justify-center rounded-xl p-2 hover:bg-gray-100 active:scale-95 dark:hover:bg-gray-900"
          >
            <span className="sr-only">Toggle menu</span>
            {open ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown (simple, no borders) */}
      {open && (
        <div id="mobile-menu" className="md:hidden">
          <div className="mx-4 mb-3 rounded-2xl bg-white shadow-lg ring-1 ring-black/5 dark:bg-neutral-950 dark:ring-white/10">
            <div className="p-2">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-gray-800 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-900"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 border-t border-gray-100 p-2 dark:border-white/10">
                <Link
                  href="/quote"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 dark:bg-white dark:text-black"
                >
                  Get a quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
