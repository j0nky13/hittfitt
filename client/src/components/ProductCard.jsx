import { Link } from 'react-router-dom'

export default function ProductCard({ title, price, description, cta, to, badge }) {
  const Button = to?.startsWith('http') ? 'a' : Link
  const props = to?.startsWith('http') ? { href: to } : { to: to || '#' }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 hover:border-zinc-700 transition">
      {badge && <span className="mb-3 inline-block rounded-full bg-lime-300/20 px-3 py-1 text-xs font-medium text-lime-300">{badge}</span>}
      <h3 className="text-xl font-semibold">{title}</h3>
      {price && <p className="mt-1 text-3xl font-extrabold tracking-tight">{price}</p>}
      <p className="mt-3 text-zinc-300 text-sm leading-relaxed">{description}</p>
      <div className="mt-6">
        <Button {...props} className="inline-flex items-center rounded-xl bg-lime-400 px-4 py-2 font-semibold text-zinc-900 hover:brightness-110">
          {cta}
        </Button>
      </div>
    </div>
  )
}