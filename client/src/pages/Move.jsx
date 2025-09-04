export default function Move() {
  const submit = async (e) => {
    e.preventDefault()
    const email = new FormData(e.currentTarget).get('email')
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, list: 'move-waitlist' })
    })
    alert(res.ok ? 'Added to waitlist!' : 'Something went wrong.')
    e.currentTarget.reset()
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <div className="aspect-video w-full rounded-2xl bg-champagne border border-zinc-300 grid place-items-center text-zinc-600">
        Workout teaser placeholder
      </div>
      <h1 className="mt-6 text-3xl font-bold">Move with Morgan</h1>
      <p className="mt-2 text-zinc-700">Guided strength + conditioning. Minimal equipment, maximum consistency.</p>
      <form className="mt-6 flex gap-2" onSubmit={submit}>
        <input name="email" type="email" required placeholder="you@example.com"
               className="flex-1 rounded-xl border border-zinc-300 px-4 py-2 outline-none focus:border-zinc-500" />
        <button className="rounded-xl bg-seafoam px-4 py-2 font-semibold">Join Waitlist</button>
      </form>
    </div>
  )
}