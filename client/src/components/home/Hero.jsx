export default function Hero() {
  return (
    <section className="relative">
      {/* placeholder visual */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-seafoam/50 via-champagne to-white" />
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">HITTFITT</h1>
        <p className="mt-2 text-lg text-zinc-700">Simple fitness + simple food. Morgan’s quick-start approach.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#buy" className="inline-flex items-center rounded-xl bg-rustic text-white px-5 py-3 font-semibold">Get the $5 Meals PDF</a>
          <a href="/move" className="inline-flex items-center rounded-xl border border-zinc-300 px-5 py-3 font-semibold">Learn about Move</a>
        </div>
      </div>
    </section>
  )
}