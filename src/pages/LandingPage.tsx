import { ChevronRight } from 'lucide-react';

export default function LandingPage() {
  return (
    // relative: allows absolute-positioned children to be placed relative to this page
    // overflow-hidden: hides parts of the blobs that go outside the screen
    <div className="min-h-screen relative isolate overflow-hidden bg-white" font-sans>
      <BackgroundGlow />

      {/* Centered content container */}
      <div className="mx-auto max-w-350 px-6">
        <Navbar />
        <Hero />
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <header className="flex items-center justify-between py-8">
      {/* Left: brand */}
      <div className="text-2xl text-black font-semibold">SkillCatch</div>

      {/* Right: actions */}
      <div className="flex items-center gap-6">
        <a href="#" className="text-m text-black font-medium hover:text-gray-500 transition-colors duration-200 ease-in-out">
           Sign In 
        </a>
        <button className="cursor-pointer rounded-2xl bg-gray-900 text-white px-5 py-2.5 text-m font-medium hover:-translate-y-0.5 transition-transform duration-200 ease-in-out inline-block group">
          Get started <ChevronRight className="h-4 w-4 inline-flex -translate-y-0.5 group-hover:translate-x-1 transition-transform duration-200 ease-in-out" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    // grid = layout system with columns
    // grid-cols-1 = 1 column by default (mobile)
    // lg:grid-cols-2 = 2 columns on large screens (desktop)
    // gap-10 = space between columns
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-16">
      {/* LEFT COLUMN */}
      <div>
        <h1 className="font-serif font-medium text-5xl md:text-6xl lg:text-6xl leading-[1.13] tracking-tight text-gray-900 ">
          See your strengths.
          <br />
          Shape your direction.
        </h1>
      </div>

      {/* RIGHT COLUMN */}
      <div>
        <p className="text-gray-700 max-w-md">
          A personal skill map, portfolio, and mentoring in one place.
          Unlock your potential and take the next step.
        </p>

        <div className="w-55 mt-6 bg-linear-to-r from-[#688DE0] to-[#D2608C] p-1 rounded-2xl inline-block">
          <button className="cursor-pointer w-full rounded-2xl bg-gray-900 text-white px-5 py-2.5 text-m font-medium 
                              hover:-translate-y-px transition-transform duration-200 ease-in-out inline-block group">
          Get started for free <ChevronRight className="h-4 w-4 inline-flex -translate-y-0.5 group-hover:translate-x-1 transition-transform duration-200 ease-in-out" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

function BackgroundGlow() {
  return (
    // absolute inset-0: covers the whole page area
    // -z-10: places it BEHIND the normal content
    <div className="absolute inset-0 -z-10">
      {/* Blob 1 (blue, top-left) */}
      <div
        className="
          absolute top-20 left-100
          h-200 w-200
          rounded-full
          bg-blue-300/60
          blur-3xl
        "
      />
      <div
        className="
          absolute top-120 left-120
          h-160 w-160
          rounded-full
          bg-blue-300/60
          blur-3xl
        "
      />

      {/* Blob 2 (pink, right side) */}
      <div
        className="
          absolute top-60 right-130
          h-130 w-130
          rounded-full
          bg-pink-300/60
          blur-3xl
        "
      />
      <div
        className="
          absolute top-130 right-130
          h-130 w-130
          rounded-full
          bg-pink-300/60
          blur-3xl
        "
      />
    </div>
  );
}