export default function SocialProof() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="rounded-xl border border-zinc-300 bg-white p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm text-zinc-700">
          Seen on TikTok — videos hitting <span className="font-medium">40k+ views</span> with thousands of comments.
        </p>
        <div className="flex gap-4 text-sm">
          <a href="https://tiktok.com/" target="_blank" className="underline">TikTok</a>
          <a href="https://instagram.com/" target="_blank" className="underline">Instagram</a>
        </div>
      </div>
    </section>
  )
}