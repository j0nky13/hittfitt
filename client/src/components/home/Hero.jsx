import React from 'react'

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] overflow-hidden">
      <video
        src="/hero-vid.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onError={(e) => console.error('Hero video failed to load', e.currentTarget.error)}
        onLoadedData={() => console.log('Hero video loaded')}
        className="absolute inset-0 h-full w-full object-cover object-center z-0 pointer-events-none"
      />
      <div className="absolute inset-0 z-10 bg-black/35 pointer-events-none" />
      <div className="relative z-20 mx-auto flex h-full max-w-6xl items-center px-6 py-40">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold leading-snug tracking-tight max-w-3xl text-white">
            Fuel Your Body. Build Your Results. <span className="block italic text-seafoam">Live HittFitt.</span>
          </h1>
          <p className="mt-2 text-lg text-white">
            Simple food + simple fitness. Get a <span className="text-seafoam font-semibold">custom workout and meal plan</span> built to fit your lifestyle.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/move"
              className="inline-flex items-center rounded-xl border border-zinc-300 px-5 py-3 font-semibold bg-white hover:bg-zinc-50 hover:border-zinc-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rustic"
            >Explore Custom Plans</a>
          </div>
        </div>
      </div>
    </section>
  )
}