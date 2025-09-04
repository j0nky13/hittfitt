import ProductCard from './ProductCard'

export default function ProductGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16" id="buy">
      <h2 className="text-2xl md:text-3xl font-bold">Start here</h2>
      <p className="mt-2 text-zinc-300">Grab the PDF now; workouts unlock soon.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <ProductCard
          title="Meals with Morgan — Starter PDF"
          price="$5"
          description="A clean, simple 7‑day plan with grocery list, macros, and swap suggestions."
          cta="Buy PDF"
          to="https://buy.stripe.com/test_12345" // TODO: replace with real link
          badge="Available now"
        />
        <ProductCard
          title="Move with Morgan — Training"
          description="Guided strength + conditioning. Beginner friendly, progressive overload, minimal gear."
          cta="Join waitlist"
          to="/move"
          badge="Coming soon"
        />
      </div>
    </section>
  )
}