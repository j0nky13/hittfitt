export default function FeatureStrip() {
  const items = [
    { title: 'No fluff', text: 'Exactly what to eat and do—no ebook bloat.' },
    { title: 'Real life', text: 'Built for busy weeks and normal kitchens.' },
    { title: 'Results', text: 'Small wins that stack into habits.' }
  ]
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 grid gap-4 sm:grid-cols-3">
      {items.map(it => (
        <div key={it.title} className="rounded-xl border border-zinc-300 bg-white p-5">
          <h3 className="font-semibold">{it.title}</h3>
          <p className="mt-1 text-sm text-zinc-700">{it.text}</p>
        </div>
      ))}
    </section>
  )
}