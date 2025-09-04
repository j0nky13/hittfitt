export default function Cancel() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Order canceled</h1>
      <p className="mt-3 text-zinc-700">
        No worries—your card was not charged.
      </p>
      <a
        href="/meals"
        className="mt-6 inline-flex items-center rounded-xl border border-zinc-300 px-4 py-2 font-semibold"
      >
        Back to meals
      </a>
    </div>
  )
}