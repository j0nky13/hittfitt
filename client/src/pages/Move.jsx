import { useState } from 'react'

export default function Move() {
  const [status, setStatus] = useState({ state: 'idle', msg: '' })

  const submit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'submitting', msg: '' })

    const form = e.currentTarget
    const fd = new FormData(form)
    const email = fd.get('email')
    const name = fd.get('name')
    const goals = fd.get('goals')
    const optin = fd.get('optin') === 'on'

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, list: 'move-custom', name, goals, marketing_opt_in: optin })
      })
      if (!res.ok) throw new Error('subscribe_failed')
      setStatus({ state: 'ok', msg: 'Got it! You’re on the list.' })
      form.reset()
    } catch {
      setStatus({ state: 'err', msg: 'Something went wrong. Please try again.' })
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-8 py-14">
      {/* Hero / visual placeholder */}
      <section className="grid gap-8 md:grid-cols-2 items-start">
        {/* Visual placeholder */}
        <div className="w-full">
          <picture>
            {/* Desktop (≥768px) */}
            <source srcSet="/workout.jpg" media="(min-width: 768px)" />
            {/* Mobile fallback */}
            <img
              src="/workoutbell.jpg"
              alt="Workout teaser"
              className="aspect-[16/9] md:aspect-[9/16] w-full rounded-2xl border border-zinc-300 object-cover"
            />
          </picture>
        </div>
        <div className="">
          <h1 className="text-3xl md:text-4xl font-bold">Move with Morgan — Custom Plan</h1>
          <p className="mt-3 text-zinc-700">
            Weekly workouts + meal guidance tailored to your schedule, gear, and goals. Minimal equipment, maximum consistency.
          </p>

          {/* Price + request form */}
          <div className="mt-5 rounded-2xl border border-zinc-300 bg-white p-4 sm:p-6">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl md:text-4xl font-extrabold">$19</span>
              <span className="text-sm text-zinc-600">per custom weekly plan (email delivery)</span>
            </div>

            <ul className="mt-4 list-disc pl-5 text-sm text-zinc-700 space-y-1">
              <li>3–4 day strength + conditioning split</li>
              <li>Meal guidance aligned to training days</li>
              <li>Minimal gear or bodyweight variations</li>
              <li>Adapted to time windows &amp; preferences</li>
            </ul>

            <form className="mt-5 grid gap-3" onSubmit={submit}>
              <input
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="w-full rounded-xl border border-zinc-300 px-4 py-2 outline-none focus:border-zinc-500"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-zinc-300 px-4 py-2 outline-none focus:border-zinc-500"
              />
              <textarea
                name="goals"
                placeholder="Your goals, available days, and equipment (optional)"
                rows={5}
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-500 resize-none"
              />
              <label className="flex items-start gap-2 text-xs text-zinc-700">
                <input type="checkbox" name="optin" className="mt-0.5 accent-rustic" defaultChecked />
                <span>Keep me on the email list for updates (opt-in)</span>
              </label>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex justify-center items-center rounded-xl bg-rustic text-white px-5 py-2.5 font-semibold disabled:opacity-60"
                disabled={status.state === 'submitting'}
              >
                {status.state === 'submitting' ? 'Submitting…' : 'Request my plan'}
              </button>
              {status.msg && (
                <p className={`text-sm ${status.state === 'ok' ? 'text-green-700' : 'text-red-700'}`}>{status.msg}</p>
              )}
            </form>
            <details className="mt-3 text-[11px] leading-snug text-zinc-600">
              <summary className="cursor-pointer font-medium">Disclaimer</summary>
              <p className="mt-2">
                The information provided in this meal plan is for educational and informational purposes only and is not intended as medical advice. I am not a licensed medical professional, dietitian, or physician. Always consult with your doctor or a qualified healthcare provider before starting any new diet, supplement, or exercise program, especially if you are pregnant, nursing, have food allergies, or have any pre-existing medical conditions. Individual nutritional needs may vary, and results are not guaranteed. By using this meal plan, you acknowledge that you are doing so voluntarily and at your own risk. HITTFITT and its creator disclaim any liability for adverse outcomes that may result from following this guide.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="mt-12 grid gap-4 md:grid-cols-3">
        {[
          { t: 'Fits your week', d: 'You choose days & time; we adapt volume and intensity.' },
          { t: 'Minimal gear', d: 'Dumbbells and a mat are plenty. Bodyweight alternatives included.' },
          { t: 'Simple meals', d: 'Meals to match training days, no complicated tracking required.' }
        ].map(item => (
          <div key={item.t} className="rounded-2xl border border-zinc-300 bg-white p-5">
            <h3 className="font-semibold">{item.t}</h3>
            <p className="mt-1 text-sm text-zinc-700">{item.d}</p>
          </div>
        ))}
      </section>

      {/* FAQ */}
      <section className="mt-12 grid gap-3">
        <h2 className="text-2xl font-bold">Custom Plan FAQ</h2>
        <details className="rounded-xl border border-zinc-300 bg-white p-4">
          <summary className="cursor-pointer font-medium">What equipment do I need?</summary>
          <p className="mt-2 text-sm text-zinc-700">
            A pair of dumbbells and a mat is enough to start. We provide bodyweight options if you have no equipment.
          </p>
        </details>
        <details className="rounded-xl border border-zinc-300 bg-white p-4">
          <summary className="cursor-pointer font-medium">How is the plan delivered?</summary>
          <p className="mt-2 text-sm text-zinc-700">
            You’ll receive your weekly plan by email. We’ll tailor it based on your availability and goals.
          </p>
        </details>
        <details className="rounded-xl border border-zinc-300 bg-white p-4">
          <summary className="cursor-pointer font-medium">Can beginners do this?</summary>
          <p className="mt-2 text-sm text-zinc-700">
            Absolutely. We scale volume and intensity to your level, with form cues and substitutions.
          </p>
        </details>
      </section>

      {/* Nudge back to $5 PDF */}
      <section className="mt-12">
        <div className="rounded-2xl border border-zinc-300 bg-white p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Just want easy meals to start?</h3>
            <p className="text-sm text-zinc-700 mt-1">
              Grab the $5 quick-meals PDF to get moving today—then upgrade to custom later.
            </p>
          </div>
          <a
            href="/meals"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-300 px-5 py-2.5 font-semibold"
          >
            See the $5 PDF
          </a>
        </div>
      </section>
    </div>
  )
}