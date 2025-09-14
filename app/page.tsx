import RevealSection from "./components/contentSection/ContentSection";
import HeroSection from "./components/heroSection/HeroSection";

export default function Page() {
  return (
    <>
      <HeroSection />

      <div className="font-sans flex flex-col items-center min-h-screen">
        <main className="flex flex-col row-start-2 items-center sm:items-start">
          <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            <RevealSection
              title="Solid craft. Modern finish."
              body={<p>From demolition to finishing touches — we manage your renovation end‑to‑end with clear timelines and clean sites.</p>}
              imageSrc="/img/home1.jpg"
              imageAlt="Finished kitchen"
              mediaSide="image-left"
              altBg={false}
              cta={<a href="#contact" className="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:opacity-95 dark:bg-white dark:text-black">Get a quote</a>}
            />
          </section>
          <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            <RevealSection
              title="Solid craft. Modern finish."
              body={<p>From demolition to finishing touches — we manage your renovation end‑to‑end with clear timelines and clean sites.</p>}
              imageSrc="/img/home1.jpg"
              imageAlt="Finished kitchen"
              mediaSide="image-right"
              altBg={true}
              cta={<a href="#contact" className="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:opacity-95 dark:bg-white dark:text-black">Get a quote</a>}
            />
          </section>
        </main>
      </div>
    </>
  )
}

