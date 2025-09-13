import HeroSection from "./components/heroSection/HeroSection";
import Navbar from "./components/navbar/SiteHeader";

export default function Page() {
  return (
    <>
      <HeroSection />

      <div className="font-sans grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          {/* content here */}
        </main>
      </div>
    </>
  )
}

