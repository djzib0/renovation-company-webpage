"use client"

import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"

// Types for props
export type RevealDirection = "left" | "right" | "center"
export type MediaSide = "image-left" | "image-right"

export type RevealSectionProps = {
  title: string
  body?: React.ReactNode
  imageSrc: string
  imageAlt?: string
  /** Fade direction when revealing on scroll */
  mediaSide?: MediaSide
  /** Optional CTA node under the body */
  cta?: React.ReactNode
  /** Tailwind class overrides */
  className?: string
  /** Whether this section has an alternate background */
  altBg?: boolean
}

// IntersectionObserver based in-view hook (fires once)
const useInViewOnce = (threshold = 0.2) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current || inView) return
    const el = ref.current

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true)
            obs.disconnect()
          }
        })
      },
      { threshold }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [inView, threshold])

  return { ref, inView }
}


export const RevealSection: React.FC<RevealSectionProps> = ({
  title,
  body,
  imageSrc,
  imageAlt = "",
  mediaSide = "image-left",
  cta,
  className = "",
  altBg = false,
}) => {
  const { ref, inView } = useInViewOnce(0.2)


  // Layout ordering: on mobile it's stacked with image first; on md+ follow mediaSide
  const imageOrderMd = mediaSide === "image-left" ? "md:order-1" : "md:order-2"
  const textOrderMd = mediaSide === "image-left" ? "md:order-2" : "md:order-1"

  return (
    <section
      ref={ref}
      className={`w-full ${altBg ? "bg-orange-300 dark:bg-neutral-900" : "bg-transparent"} ${className}`}
    >
      <div
        className={[
          "mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-12 sm:px-6 lg:px-8 md:grid-cols-2",
        ].join(" ")}
      >
        {/* Image */}
        <div className={[`order-1 ${imageOrderMd}`].join(" ")}> 
          <div className="relative aspect-[4/3] w-full overflow-hidden shadow-xl ring-1 ring-black/5 dark:ring-white/10">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority={false}
            />
          </div>
        </div>

        {/* Text */}
        <div
          className={[
            `order-2 opacity-100 ${textOrderMd}`,
          ].join(" ")}
        >
          <h2 className="text-2xl uppercase font-semibold tracking-tight text-slate-700 dark:text-white sm:text-3xl">
            {title}
          </h2>
          {/* underline */}
          <div className={`mt-3 h-[3px] w-16 rounded-full bg-orange-500 dark:bg-white/80 ${altBg ? "bg-white dark:bg-neutral-900" : "bg-orange-500 dark:bg-white/80"}`}/>

          {body && (
            <div className="prose prose-slate mt-4 max-w-none text-slate-700 dark:prose-invert dark:text-neutral-300">
              {body}
            </div>
          )}

          {cta && <div className="mt-6">{cta}</div>}
        </div>
      </div>
    </section>
  )
}

export default RevealSection

// --- Example usage ---
// <RevealSection
//   title="Solid craft. Modern finish."
//   body={<p>From demolition to finishing touches — we manage your renovation end‑to‑end with clear timelines and clean sites.</p>}
//   imageSrc="/project-kitchen.jpg"
//   imageAlt="Finished kitchen"
//   fadeFrom="left"
//   mediaSide="image-right"
//   altBg={true}
//   cta={<a href="#contact" className="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:opacity-95 dark:bg-white dark:text-black">Get a quote</a>}
// />