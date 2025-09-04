export default function Success() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Thanks! 🎉</h1>
      <p className="mt-3 text-zinc-700">
        Your purchase was successful. Check your email for the download link.
      </p>
      <a
        href="/"
        className="mt-6 inline-flex items-center rounded-xl border border-zinc-300 px-4 py-2 font-semibold"
      >
        Back to home
      </a>
    </div>
  )
}