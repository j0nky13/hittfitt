export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-300 bg-champagne">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-zinc-700 flex flex-col md:flex-row gap-3 items-center justify-center text-center md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} HITTFITT</p>
        <a href="https://marsh.monster" className="text-sm underline text-zinc-700">Powered by Marsh Monster</a>
      </div>
    </footer>
  )
}