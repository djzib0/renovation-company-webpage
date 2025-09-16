'use client'

import * as React from 'react'
import Link from 'next/link'
import ActiveLink from './ActiveLink'
import Image from 'next/image'

const NAV_LINKS = [
  { href: '/', label: 'HOME' },
  { href: '/projects', label: 'PROJEKTY' },
  { href: '/about', label: 'O FIRMIE' },
  { href: '/contact', label: 'KONTAKT' },
]


type NavbarProps = { topOffset?: number }

const Navbar = ({ topOffset = 0 }: NavbarProps) => {
  const [open, setOpen] = React.useState(false)

  // Close on route change (best-effort)
  React.useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('hashchange', close)
    return () => window.removeEventListener('hashchange', close)
  }, [])

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/80"
      style={{ top: topOffset }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              src={"/img/logo.png"}
              alt="Renovated interior background"
              width={100}
              height={100}
              className="object-cover"
            />
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
            className="inline-flex items-center justify-center rounded-xl p-2 hover:bg-gray-100 active:scale-95"
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
          <div className="mx-4 mb-3 rounded-2xl bg-white shadow-lg ring-1 ring-black/5">
            <div className="p-2">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-gray-800 hover:bg-gray-50"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 border-t border-gray-100 p-2">
                <Link
                  href="/quote"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
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

export default Navbar
