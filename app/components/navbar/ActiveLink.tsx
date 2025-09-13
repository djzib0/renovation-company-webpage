'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ActiveLink = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname() || '/'
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
  return (
    <Link
      href={href}
      className={[
        'relative inline-flex items-center px-2 py-1 text-sm font-medium transition-colors',
        isActive
          ? 'text-gray-900 dark:text-white'
          : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white',
      ].join(' ')}
    >
      <span>{label}</span>
      {isActive && (
        <span className="absolute -bottom-1 left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-gray-900 dark:bg-white" />
      )}
    </Link>
  )
}

export default ActiveLink


