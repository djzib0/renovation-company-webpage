'use client'

import * as React from 'react';
import { Navbar } from './Navbar';
import TopInfoBar from './TopInfoBar';


/**
 * Combined header that renders the top contact bar and the sticky navbar.
 * The navbar sticks to the very top when the contact bar hides, otherwise
 * it sits just below the contact bar.
 */
export default function SiteHeader() {
  const [offset, setOffset] = React.useState(0)

  return (
    <>
      <TopInfoBar onHeightChange={setOffset} />
      {/* Spacer so the fixed contact bar doesn't overlap page content */}
      <div style={{ height: offset }} aria-hidden />
      <Navbar topOffset={0} />
    </>
  )
}
