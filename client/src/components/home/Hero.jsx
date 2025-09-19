export default function Hero() {
  return (
    <section className="relative">
      {/* placeholder visual */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-seafoam/50 via-champagne to-white" />
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-3xl md:text-5xl font-bold leading-snug tracking-tight max-w-3xl">
          Fuel Your Body. Build Your Results. <span className="block italic">Live HittFitt.</span>
        </h1>
        <p className="mt-2 text-lg text-zinc-700">  Simple food + simple fitness. Start with a $5 quick-meals PDF, or get a $19 custom plan that fits your week.
</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#buy" className="inline-flex items-center rounded-xl bg-rustic text-white px-5 py-3 font-semibold">Get the $5 Meals PDF</a>
          <a
            href="/move"
            className="inline-flex items-center rounded-xl border border-zinc-300 px-5 py-3 font-semibold bg-white hover:bg-zinc-50 hover:border-zinc-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rustic"
          >Learn about Move</a>
        </div>
      </div>
    </section>
  )
}