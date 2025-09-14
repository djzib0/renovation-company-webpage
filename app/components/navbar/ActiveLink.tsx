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
        'relative inline-flex items-center px-2 py-1 text-lg font-medium transition-colors',
        isActive
          ? 'text-orange-500 dark:text-white'
          : 'text-gray-700 hover:text-orange-500 dark:text-gray-300 dark:hover:text-white',
      ].join(' ')}
    >
      <span>{label}</span>
       {isActive && (
          <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-orange-500 dark:bg-white" />
        )}
    </Link>
  )
}

export default ActiveLink


