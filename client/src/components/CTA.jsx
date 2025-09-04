import { Link } from 'react-router-dom'

export default function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="rounded-2xl border border-lime-500/30 bg-gradient-to-b from-lime-400/10 to-transparent p-8 text-center">
        <h3 className="text-2xl font-bold">Ready to keep it simple?</h3>
        <p className="mt-2 text-zinc-300">Grab the $5 PDF today and get early‑bird pricing when workouts launch.</p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <a href="#buy" className="inline-flex items-center rounded-xl bg-lime-400 px-5 py-3 font-semibold text-zinc-900 hover:brightness-110">Get the $5 Meal Plan</a>
          <Link to="/move" className="inline-flex items-center rounded-xl border border-zinc-700 px-5 py-3 font-semibold hover:border-zinc-500">See workouts</Link>
        </div>
      </div>
    </section>
  )
}