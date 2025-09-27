
import { useState, useEffect, useRef } from 'react'

const STRIPE_LINK = 'https://buy.stripe.com/test_placeholder' // TODO: replace with live Checkout link

export default function Move() {
  const [status, setStatus] = useState({ state: 'idle', msg: '' })
  const [modalOpen, setModalOpen] = useState(false)
  const heroImgRef = useRef(null)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  // Save contact details (both modal + bottom contact form use this)
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

  // Reveal-on-scroll (direction + optional delay, blur, scale, distance, duration, container stagger)
  useEffect(() => {
    const parseTokens = (el) => {
      const raw = (el.getAttribute('data-reveal') || 'up').split(/\s+/)
      const has = (t) => raw.includes(t)
      const dir = raw.find((t) => ['left', 'right', 'up'].includes(t)) || 'up'
      return { dir, blur: has('blur'), scale: has('scale') }
    }
    const distance = (el) => parseInt(el.getAttribute('data-distance') || '20', 10)
    const duration = (el) => parseInt(el.getAttribute('data-duration') || '700', 10)

    const els = Array.from(document.querySelectorAll('.reveal'))
    els.forEach((el) => {
      const { dir, blur, scale } = parseTokens(el)
      const dist = distance(el)
      el.style.opacity = '0'
      const tx = dir === 'left' ? -dist : dir === 'right' ? dist : 0
      const ty = dir === 'up' ? dist : 0
      const sc = scale ? 0.98 : 1
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${sc})`
      el.style.filter = blur ? 'blur(8px)' : 'none'
      el.style.transitionProperty = 'opacity, transform, filter'
      el.style.transitionDuration = `${duration(el)}ms`
      el.style.transitionTimingFunction = 'cubic-bezier(0.22, 1, 0.36, 1)'
      const delay = el.getAttribute('data-delay')
      if (delay) el.style.transitionDelay = `${parseInt(delay, 10)}ms`
      el.style.willChange = 'opacity, transform'
    })

    // Auto-stagger children in any container with data-stagger
    const groups = Array.from(document.querySelectorAll('[data-stagger]'))
    groups.forEach((g) => {
      const step = parseInt(g.getAttribute('data-stagger') || '80', 10)
      const items = Array.from(g.querySelectorAll('.reveal'))
      items.forEach((el, i) => {
        if (!el.getAttribute('data-delay')) el.style.transitionDelay = `${i * step}ms`
      })
    })

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = '1'
            e.target.style.transform = 'translate3d(0,0,0) scale(1)'
            e.target.style.filter = 'blur(0)'
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Subtle parallax for the desktop image in "How it works"
  useEffect(() => {
    const el = heroImgRef.current
    if (!el) return
    let rafId = 0
    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const mid = window.innerHeight / 2
        const offset = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - mid) / mid))
        const ty = offset * 10 // px
        el.style.transform = `translate3d(0, ${ty}px, 0)`
        rafId = 0
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // Lock scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => document.body.classList.remove('overflow-hidden')
  }, [modalOpen])

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <header className="text-center mb-12 md:mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-700">
          Consults start at <span className="text-rustic font-semibold">$19</span>
        </div>
        <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">HittFitt Program</h1>
        <p className="mt-2 text-base sm:text-lg md:text-xl text-zinc-700">
          Custom plan consults for workouts + meals, built around your life.
        </p>

        {/* Centered CTAs */}
        <div className="mt-6 grid w-full max-w-md grid-cols-1 gap-3 mx-auto sm:flex sm:flex-wrap sm:justify-center">
          <a
            href={STRIPE_LINK}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-rustic px-6 py-3 font-semibold text-white shadow hover:bg-rustic/90 transition-colors"
          >
            Start my consult
          </a>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto inline-flex items-center rounded-xl border border-zinc-300 bg-white px-6 py-3 font-semibold hover:border-zinc-400 transition-colors"
          >
            How it works
          </a>
        </div>
        <button onClick={openModal} className="mt-2 text-sm text-zinc-600 underline">
          Questions?
        </button>
      </header>

      {/* subtle divider */}
      <div className="mx-auto mt-6 h-px w-full max-w-3xl bg-black/10" />

      {/* Intro content */}
      <section className="mt-8 sm:mt-12 mb-14 sm:mb-20">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-[3fr_2fr] items-start">
          <div className="reveal" data-reveal="up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">Built around your life</h2>
            <p className="mt-4 text-base sm:text-lg text-zinc-700 max-w-prose">
              We focus on simple structure, real food, and workouts you can actually do. Your week is designed around your
              schedule, gear, and goals. No bloat, no gimmicks.
            </p>
            <ul className="mt-5 list-disc pl-5 text-zinc-700 space-y-1">
              <li>Weekly workouts matched to your schedule</li>
              <li>Meal guidance aligned to training days</li>
              <li>Adjustments as you progress</li>
            </ul>
          </div>

          {/* optional supporting image (hidden on xs) */}
          <div className="hidden sm:block reveal" data-reveal="right" data-delay="150">
            <picture>
              <source srcSet="/workout.jpg" media="(min-width: 768px)" />
              <img
                src="/workoutbell.jpg"
                alt="Program preview"
                loading="lazy"
                className="w-full rounded-xl sm:rounded-2xl border border-zinc-300 object-cover"
              />
            </picture>
          </div>
        </div>
      </section>

      {/* How it works (list + image) */}
      <section id="how-it-works" className="mt-12 sm:mt-16 relative">
        {/* subtle background wash on mobile */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-zinc-50/60 to-transparent sm:hidden" />

        <div className="relative grid gap-8 md:grid-cols-2 md:items-start">
          {/* Left: ordered list */}
          <div className="reveal" data-reveal="up">
            <div className="mx-auto max-w-3xl text-center md:text-left">
              <h2 className="text-3xl font-extrabold">How it works</h2>
              <p className="mt-2 text-zinc-700">A simple 3-step loop with examples of how meals and training fit together.</p>
            </div>

            <ol className="mt-6 space-y-6">
              {/* Step 1 */}
              <li className="rounded-2xl border border-zinc-300 bg-white shadow-sm p-5 flex gap-4 reveal" data-reveal="up blur scale">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rustic text-white font-bold">1</div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">Quick consult</h3>
                  <p className="mt-1 text-sm sm:text-[15px] text-zinc-700">
                    Tell us your goals, schedule, gear, and constraints. We keep it simple and actionable.
                  </p>
                </div>
              </li>

              {/* Step 2 */}
              <li
                className="rounded-2xl border border-zinc-300 bg-white shadow-sm p-5 flex gap-4 reveal"
                data-reveal="up blur scale"
                data-delay="75"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rustic text-white font-bold">2</div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">Your weekly plan</h3>
                  <p className="mt-1 text-sm sm:text-[15px] text-zinc-700">
                    A balanced week of workouts and meals aligned to training days—delivered by email.
                  </p>
                  {/* Compact bullets for mobile-first clarity */}
                  <ul className="mt-3 list-disc pl-5 text-sm text-zinc-700 space-y-1">
                    <li>
                      <span className="font-medium">Training days:</span> protein + carbs (e.g., chicken &amp; rice, yogurt + fruit)
                    </li>
                    <li>
                      <span className="font-medium">Rest days:</span> protein + fats (e.g., eggs + avocado, salmon + salad)
                    </li>
                  </ul>
                </div>
              </li>

              {/* Step 3 */}
              <li
                className="rounded-2xl border border-zinc-300 bg-white shadow-sm p-5 flex gap-4 reveal"
                data-reveal="up blur scale"
                data-delay="150"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rustic text-white font-bold">3</div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">Adjust & repeat</h3>
                  <p className="mt-1 text-sm sm:text-[15px] text-zinc-700">
                    We iterate as you progress. Swap movements, tweak meals, keep momentum.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* Right: supporting image on desktop; hidden on mobile */}
          <div ref={heroImgRef} className="hidden md:block reveal" data-reveal="right blur" data-delay="150">
            <div className="sticky top-24">
              <picture>
                <source srcSet="/workout.jpg" media="(min-width: 768px)" />
                <img
                  src="/workoutbell.jpg"
                  alt="How it works"
                  loading="lazy"
                  className="w-full rounded-2xl border border-zinc-300 object-cover shadow-sm"
                />
              </picture>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly flow (example) */}
      <section className="mt-12 sm:mt-16">
        <div className="mx-auto max-w-3xl text-center reveal" data-reveal="up blur">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Weekly flow (example)</h2>
          <p className="mt-2 text-zinc-700">A simple rhythm: lift, condition, recover — with meals matched to the day.</p>
        </div>

        <div
          className="mt-6 grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7"
          data-stagger="80"
        >
          {[
            { d: 'Mon', w: 'Lower/Full', m: 'Higher carbs' },
            { d: 'Tue', w: 'Conditioning', m: 'Balanced' },
            { d: 'Wed', w: 'Upper', m: 'Higher carbs' },
            { d: 'Thu', w: 'Mobility/Walk', m: 'Balanced' },
            { d: 'Fri', w: 'Full Body', m: 'Higher carbs' },
            { d: 'Sat', w: 'Cardio (opt.)', m: 'Balanced' },
            { d: 'Sun', w: 'Rest', m: 'Protein + fats' },
          ].map((row, i) => (
            <div
              key={row.d}
              className="reveal rounded-2xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-3 sm:p-4 shadow-sm min-h-[126px] flex flex-col justify-between transition-shadow duration-300 hover:shadow-md"
              data-reveal="up blur scale"
              data-delay={`${i * 60}`}
            >
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-rustic/10 flex items-center justify-center">
                  <span className="text-[11px] font-semibold text-rustic">{i + 1}</span>
                </div>
                <span className="font-semibold text-sm sm:text-base">{row.d}</span>
              </div>
              <div className="mt-1">
                <span className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-2 py-0.5 text-[11px] sm:text-xs text-zinc-700">
                  {row.w}
                </span>
              </div>
              <div className="mt-1 text-xs sm:text-[13px] text-zinc-600">Meals: {row.m}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Stripe CTA (focused) */}
      <section className="mt-20 text-center">
        <h2 className="text-2xl font-bold">Ready to start?</h2>
        <p className="mt-2 text-zinc-700">
          Consults start at <span className="font-semibold text-rustic">$19</span>. Checkout takes less than a minute.
        </p>
        <a
          href={STRIPE_LINK}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex w-full max-w-xs sm:max-w-none sm:w-auto items-center justify-center rounded-xl bg-rustic px-6 py-3 font-semibold text-white shadow hover:bg-rustic/90 transition-colors"
        >
          Start my consult
        </a>
      </section>

      {/* Contact section (no payment language) */}
      <section id="consult" className="mt-14 sm:mt-16 scroll-mt-24">
        <div className="rounded-2xl border border-zinc-300 bg-white p-6 md:p-8 md:grid md:grid-cols-2 md:gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold">Questions?</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Use this form to get in touch. We’ll reply with guidance and next steps.
            </p>
          </div>
          <form className="mt-6 md:mt-0 grid gap-4" onSubmit={submit}>
            <input
              name="name"
              type="text"
              required
              placeholder="Your name"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-500"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-500"
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
              {status.state === 'submitting' ? 'Submitting…' : 'Send message'}
            </button>
            {status.msg && (
              <p className={`text-sm ${status.state === 'ok' ? 'text-green-700' : 'text-red-700'}`}>{status.msg}</p>
            )}
            <details className="mt-2 text-[11px] leading-snug text-zinc-600">
              <summary className="cursor-pointer font-medium">Disclaimer</summary>
              <p className="mt-2">
                The information provided in this meal plan is for educational and informational purposes only and is not
                intended as medical advice. I am not a licensed medical professional, dietitian, or physician. Always consult
                with your doctor or a qualified healthcare provider before starting any new diet, supplement, or exercise
                program, especially if you are pregnant, nursing, have food allergies, or have any pre-existing medical
                conditions. Individual nutritional needs may vary, and results are not guaranteed. By using this meal plan,
                you acknowledge that you are doing so voluntarily and at your own risk. HITTFITT and its creator disclaim any
                liability for adverse outcomes that may result from following this guide.
              </p>
            </details>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12 grid gap-3 sm:gap-4">
        <h2 className="text-2xl font-bold">Custom Plan FAQ</h2>
        <details className="rounded-lg sm:rounded-xl border border-zinc-300 bg-white p-3 sm:p-4">
          <summary className="cursor-pointer font-medium">What equipment do I need?</summary>
          <p className="mt-2 text-sm text-zinc-700">
            A pair of dumbbells and a mat is enough to start. We provide bodyweight options if you have no equipment.
          </p>
        </details>
        <details className="rounded-lg sm:rounded-xl border border-zinc-300 bg-white p-3 sm:p-4">
          <summary className="cursor-pointer font-medium">How is the plan delivered?</summary>
          <p className="mt-2 text-sm text-zinc-700">
            You’ll receive your weekly plan by email. We’ll tailor it based on your availability and goals.
          </p>
        </details>
        <details className="rounded-lg sm:rounded-xl border border-zinc-300 bg-white p-3 sm:p-4">
          <summary className="cursor-pointer font-medium">Can beginners do this?</summary>
          <p className="mt-2 text-sm text-zinc-700">
            Absolutely. We scale volume and intensity to your level, with form cues and substitutions.
          </p>
        </details>
      </section>

      {/* Contact modal (contact-only; opened from header “Questions?”) */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="consultModalTitle"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          onKeyDown={(e) => {
            if (e.key === 'Escape') closeModal()
          }}
        >
          {/* overlay */}
          <div className="absolute inset-0 bg-black/50" onClick={closeModal} />
          {/* dialog */}
          <div className="relative z-10 w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl bg-white shadow-xl p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="consultModalTitle" className="text-xl sm:text-2xl font-extrabold">
                  Have questions?
                </h2>
                <p className="mt-1 text-sm text-zinc-600">
                  Leave your info and we’ll reach out. You can purchase any time from the CTA on this page.
                </p>
              </div>
              <button aria-label="Close" onClick={closeModal} className="rounded-full p-2 hover:bg-zinc-100">
                <span className="block h-4 w-4">✕</span>
              </button>
            </div>

            <form className="mt-4 grid gap-3" onSubmit={submit}>
              <input
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-500"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-500"
              />
              <textarea
                name="goals"
                placeholder="Your goals, available days, and equipment (optional)"
                rows={4}
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-500 resize-none"
              />
              <label className="flex items-start gap-2 text-xs text-zinc-700">
                <input type="checkbox" name="optin" className="mt-0.5 accent-rustic" defaultChecked />
                <span>Keep me on the email list for updates (opt-in)</span>
              </label>
              <div className="mt-1">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex justify-center items-center rounded-xl border border-zinc-300 bg-white px-5 py-2.5 font-semibold hover:border-zinc-400"
                  disabled={status.state === 'submitting'}
                >
                  {status.state === 'submitting' ? 'Saving…' : 'Save my info'}
                </button>
              </div>
              {status.msg && (
                <p className={`text-sm ${status.state === 'ok' ? 'text-green-700' : 'text-red-700'}`}>{status.msg}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  )
}