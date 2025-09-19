export default function OfferGrid() {
  const buy = async (form) => {
    const email = form.querySelector('input[name="email"]').value
    const optin = form.querySelector('input[name="optin"]').checked
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product: 'meals_pdf', email, marketing_opt_in: optin })
    })
    const data = await res.json()
    if (data.url) window.location = data.url
    else alert('Checkout not configured yet.')
  }

  const onSubmit = (e) => { e.preventDefault(); buy(e.currentTarget) }

  return (
    <section id="buy" className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="text-2xl md:text-3xl font-bold">Start here</h2>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5 items-stretch">
        {/* $5 Starter PDF */}
        <div className="min-w-0 h-full rounded-2xl border border-zinc-300 bg-white p-4 sm:p-6 flex flex-col">
          <img
            src="/HittFitt_Cover.png"
            alt="Meals with Morgan — Starter PDF cover"
            className="mb-4 aspect-[3/4] w-full max-w-[260px] mx-auto rounded-xl border border-zinc-300 object-cover"
          />
          <h3 className="text-lg sm:text-xl font-semibold">Meals with Morgan — Starter PDF</h3>
          <p className="text-2xl sm:text-3xl font-extrabold mt-1">$5</p>
          <ul className="mt-2 text-sm text-zinc-700 list-disc pl-5 space-y-1">
            <li>3–5 quick meals</li>
            <li>Simple grocery list</li>
            <li>Basic macros</li>
          </ul>

          <form className="mt-4 mt-auto flex flex-col gap-3" onSubmit={onSubmit}>
            <input
              name="email" type="email" required placeholder="you@example.com"
              className="w-full rounded-xl border border-zinc-300 px-4 py-2 outline-none focus:border-zinc-500"
            />
            <label className="flex items-start gap-2 text-xs text-zinc-700">
              <input type="checkbox" name="optin" className="mt-0.5 accent-rustic" defaultChecked />
              <span>Keep me on the list (opt-in)</span>
            </label>
            <button type="submit" className="w-full sm:w-auto inline-flex justify-center items-center rounded-xl bg-rustic text-white px-4 py-2 font-semibold">
              Buy PDF
            </button>
          </form>
        </div>

        {/* $19 Custom Plan: Meals + Move */}
        <div className="min-w-0 h-full rounded-2xl border border-zinc-300 bg-white p-4 sm:p-6 flex flex-col">
          <img
            src="/working-eating.jpg"
            alt="Custom plan preview — meals and workouts"
            className="mb-4 aspect-[4/3] w-full rounded-xl border border-zinc-300 object-cover"
          />
          <h3 className="text-lg sm:text-xl font-semibold">Custom Plan — Meals + Move</h3>
          <p className="text-2xl sm:text-3xl font-extrabold mt-1">$19</p>
          <ul className="mt-2 text-sm text-zinc-700 list-disc pl-5 space-y-1">
            <li>Weekly meals + workouts</li>
            <li>Tailored to your schedule</li>
            <li>Minimal gear options</li>
          </ul>
          <a
            href="/move"
            className="mt-auto inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-zinc-300 px-4 py-2 font-semibold"
          >
            Learn more
          </a>
        </div>
      </div>
    </section>
  )
}