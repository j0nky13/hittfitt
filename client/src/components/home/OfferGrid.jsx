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
      <div className="mt-10 flex flex-col items-center text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-zinc-900">Custom Plan Consults</h3>
        <p className="mt-3 text-lg md:text-xl text-zinc-800 max-w-2xl">
          Work 1-on-1 with Morgan to build a <span className="font-semibold text-rustic">personalized meal and workout plan</span> that fits your lifestyle. Consults start at just <span className="text-rustic font-bold">$19</span>.
        </p>
        <a
          href="/move"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-rustic text-white px-6 py-3 font-semibold text-lg shadow hover:bg-rustic/90 transition-colors"
        >
          Explore Custom Plans
        </a>
      </div>
    </section>
  )
}