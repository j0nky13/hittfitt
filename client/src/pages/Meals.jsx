export default function Meals() {
  const buy = async (form) => {
    const email = form.querySelector('input[name="email"]').value
    const optin = form.querySelector('input[name="optin"]').checked

    const btn = form.querySelector('button[type="submit"]')
    btn.disabled = true

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: 'meals_pdf', email, marketing_opt_in: optin })
      })
      const data = await res.json()
      if (data?.url) window.location = data.url
      else alert('Checkout not configured yet.')
    } catch {
      alert('Network error. Please try again.')
    } finally {
      btn.disabled = false
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    buy(e.currentTarget)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      {/* Hero / cover placeholder */}
      <section className="grid grid-cols-1 gap-6 md:gap-10 md:grid-cols-2 items-start">
        <div className="order-1 md:order-1 text-center md:text-left w-full">
          <h1 className="text-3xl leading-tight md:text-4xl md:leading-tight font-bold">Meals with Morgan — Starter PDF</h1>
          <p className="mt-3 text-zinc-700 text-base md:text-[1rem]">
            A simple, budget-friendly starter: a few go-to meals, a grocery list, and basic macros so you can start today.
          </p>

          {/* Price & checkout */}
          <div className="mt-5 w-full rounded-2xl border border-zinc-300 bg-white p-4 sm:p-6 text-left">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl md:text-4xl font-extrabold">$5</span>
              <span className="text-sm text-zinc-600">Instant PDF download</span>
            </div>

            <ul className="mt-4 list-disc list-outside pl-6 text-[15px] leading-6 text-zinc-800 marker:text-zinc-400">
              <li>3–5 quick, repeatable meals</li>
              <li>Simple grocery list</li>
              <li>Basic macros per meal</li>
              <li>Built for busy weeks</li>
            </ul>

            <form className="mt-5 flex flex-col gap-3" onSubmit={onSubmit}>
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 md:py-2.5 outline-none focus:border-zinc-500"
              />
              <label className="flex items-start gap-2 text-xs text-zinc-700">
                <input type="checkbox" name="optin" className="mt-0.5 accent-rustic" defaultChecked />
                <span>Keep me on the email list for updates (opt-in)</span>
              </label>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex justify-center items-center rounded-xl bg-rustic text-white px-5 py-3 md:py-2.5 font-semibold disabled:opacity-60"
              >
                Buy PDF
              </button>
            </form>

            {/* Short disclaimer + details */}
            <p className="mt-3 text-[11px] leading-snug text-zinc-600">
              By purchasing, you acknowledge this is general educational content and not medical advice.
            </p>
            <details className="mt-2 text-[11px] leading-snug text-zinc-600">
              <summary className="cursor-pointer underline">Full disclaimer</summary>
              <div className="mt-2">
                The information provided in this meal plan is for educational and informational purposes only and is
                not intended as medical advice. I am not a licensed medical professional, dietitian, or physician.
                Always consult with your doctor or a qualified healthcare provider before starting any new diet,
                supplement, or exercise program, especially if you are pregnant, nursing, have food allergies, or have
                any pre-existing medical conditions. Individual nutritional needs may vary, and results are not
                guaranteed. By using this meal plan, you acknowledge that you are doing so voluntarily and at your own
                risk. HITTFITT and its creator disclaim any liability for adverse outcomes that may result from
                following this guide.
              </div>
            </details>
          </div>
        </div>

        {/* Visual placeholder */}
        <div className="order-2 md:order-2 w-full">
          <img
            src="/HittFitt_Cover.png"
            alt="Meals with Morgan PDF Cover"
            className="w-full max-w-[380px] sm:max-w-[440px] md:max-w-[520px] mx-auto mt-6 md:mt-0 rounded-2xl border border-zinc-300 shadow object-contain"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12 grid gap-4">
        <h2 className="text-2xl font-bold">Meal Plan FAQ</h2>
        <details className="rounded-xl border border-zinc-300 bg-white p-4">
          <summary className="cursor-pointer font-medium">What’s inside the $5 PDF?</summary>
          <p className="mt-2 text-sm text-zinc-700">
            A handful of go-to meals, a simple grocery list, and basic macros to help you start right away.
          </p>
        </details>
        <details className="rounded-xl border border-zinc-300 bg-white p-4">
          <summary className="cursor-pointer font-medium">Are there substitutions?</summary>
          <p className="mt-2 text-sm text-zinc-700">
            Yes — simple swaps are suggested so you can adapt to preferences, allergies, or what’s in your kitchen.
          </p>
        </details>
        <details className="rounded-xl border border-zinc-300 bg-white p-4">
          <summary className="cursor-pointer font-medium">Do I get calories/macros?</summary>
          <p className="mt-2 text-sm text-zinc-700">
            Basic macros per meal are included. If you need deeper personalization, check the $19 custom plan.
          </p>
        </details>
      </section>

      {/* Upsell to custom plan */}
      <section className="mt-12 text-center md:text-left">
        <div className="rounded-2xl border border-zinc-300 bg-white p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Want meals + workouts tailored to you?</h3>
            <p className="text-sm text-zinc-700 mt-1">
              Upgrade to the $19 custom plan (Meals + Move). Weekly plan, minimal gear, fits your schedule.
            </p>
          </div>
          <a
            href="/move"
            className="w-full md:w-auto inline-flex items-center justify-center rounded-xl border border-zinc-300 px-5 py-3 font-semibold"
          >
            Learn about the custom plan
          </a>
        </div>
      </section>
    </div>
  )
}