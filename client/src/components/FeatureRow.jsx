export default function FeatureRow() {
  const items = [
    { title: 'No fluff', text: 'Exactly what to eat and do. No 40‑page ebook bloat.' },
    { title: 'Realistic', text: 'Plans built for busy schedules and normal kitchens.' },
    { title: 'Results', text: 'Habit‑first approach with progressive changes that stick.' },
  ]
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 grid gap-6 md:grid-cols-3">
      {items.map((it) => (
        <div key={it.title} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h3 className="text-lg font-semibold">{it.title}</h3>
          <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{it.text}</p>
        </div>
      ))}
    </section>
  )
}