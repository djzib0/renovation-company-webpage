'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react';

const images = ["/img/hero1.jpg", "/img/hero2.jpg", "/img/hero3.jpg", "/img/hero4.jpg", ] 
// keep the same number of titles and texts as the number of images
const headers = ["Tytuł 1", "Tytuł 2", "Tytuł 3", "Tytuł 4", "Tytuł 5", ]
const texts = [
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates fugit, soluta incidunt ut eum et asperiores voluptatum explicabo nulla accusantium.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque tempore minus quos consectetur?",
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus deleniti autem ad repellat ratione.",
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    "Omnis obcaecati laborum officiis numquam inventore quasi tempora, fugiat vitae quisquam voluptate?"
  ]


const INTERVAL_MS = 5000 // time each image stays visible
const FADE_MS = 900 // crossfade duration

const HeroSection = () => {

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return
    const id = setInterval(() => {
      setCurrent((i) => (i + 1) % images.length)
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, []);
  
  return (
    <section
      className="relative isolate w-full min-h-[40vh] overflow-hidden bg-black text-white py-20"
      aria-label="Renovation company hero"
      style={{fontFamily: "var(--font-roboto)", contain: "paint"}}
    >
      <div className="absolute inset-0 -z-10">
        {images.map((src, idx) => (
          <span
            key={src}
            className="absolute inset-0 will-change-transform"
            style={{
              transition: `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`,
              opacity: idx === current ? 1 : 0,
              transform: idx === current ? 'scale(1.04)' : 'scale(1.0)', // subtle zoom on active
            }}
          >
            <Image
              src={src}
              alt="Renovated interior background"
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover"
            />
            {/* Readability gradient */}
            <span className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/45" aria-hidden />
          </span>
        ))}
      </div>

      {/* Centered content panel */}
      <div 
        className="hidden absolute bottom-10 left-10 sm:flex flex-col md:w-[600px] max-w-xl"
        style={{ opacity: 1, transitionDuration: `${FADE_MS}ms` }}
      >
        <div className="w-full bg-black/70 p-6 border-b-[1px] border-b-white/30 shadow-2xl backdrop-blur-xs sm:p-8">
          <h1 className="text-3xl leading-tight tracking-tight text-white drop-shadow sm:text-5xl">
            {headers[current]}
          </h1>
        </div>
        <div className="flex items-center justify-start w-full bg-gray-900/50 p-6 h-32 shadow-2xl backdrop-blur-xs sm:p-8">
          <p 
            className="text-sm leading-6 text-white/90 drop-shadow sm:text-base">
              {texts[current]}
          </p>
        </div>
      </div>

    </section>
  )
}

export default HeroSection

