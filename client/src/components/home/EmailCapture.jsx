export default function EmailCapture() {
  const submit = async (e) => {
    e.preventDefault()
    const email = new FormData(e.currentTarget).get('email')
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, list: 'general' })
    })
    alert(res.ok ? 'Thanks! You’re on the list.' : 'Something went wrong.')
    e.currentTarget.reset()
  }

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16">
      <div className="rounded-2xl border border-zinc-300 bg-white p-6">
        <h3 className="text-lg font-semibold">Get launch updates</h3>
        <form className="mt-3 flex flex-col sm:flex-row gap-2" onSubmit={submit}>
          <input name="email" type="email" required placeholder="you@example.com"
                 className="flex-1 rounded-xl border border-zinc-300 px-4 py-2 outline-none focus:border-zinc-500" />
          <button className="rounded-xl bg-seafoam px-4 py-2 font-semibold">Notify me</button>
        </form>
      </div>
    </section>
  )
}