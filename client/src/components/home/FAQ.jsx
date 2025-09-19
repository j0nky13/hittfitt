const QA = ({ q, a }) => (
  <details className="rounded-lg border border-zinc-300 bg-white p-4">
    <summary className="cursor-pointer font-medium">{q}</summary>
    <p className="mt-2 text-sm text-zinc-700">{a}</p>
  </details>
)

export default function FAQ() {
  const faqs = [
    { q: 'What’s inside the $5 PDF?', a: 'A few go-to meals with a simple grocery list and basic macros so you can start today.' },
    { q: 'What do I get for $19?', a: 'A weekly custom plan (meals + workouts) tailored to your schedule and gear, delivered by email.' },
    { q: 'Do I need equipment?', a: 'Minimal gear is fine. Bodyweight options included; we’ll adapt to what you have.' },
    { q: 'Refunds?', a: 'If the plan isn’t a fit in the first 7 days, reply to the email for help.' }
  ]
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 grid gap-3">
      <h2 className="text-2xl font-bold">FAQ</h2>
      {faqs.map(f => <QA key={f.q} {...f} />)}
    </section>
  )
}