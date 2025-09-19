import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'

const NavItem = ({ to, children, onClick }) => (
  <NavLink to={to} onClick={onClick} className={({isActive}) =>
    `block px-4 py-3 rounded-xl ${isActive ? 'bg-seafoam/60 text-zinc-900' : 'hover:bg-seafoam/30'}`
  }>{children}</NavLink>
)

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      {/* top bar with burger */}
      <header className="sticky top-0 z-40 border-b border-zinc-300 bg-champagne/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <button onClick={() => setOpen(true)} className="px-3 py-2 rounded-lg bg-seafoam/40">
            <span className="sr-only">Open menu</span>
            {/* burger icon */}
            <div className="w-5 h-[2px] bg-zinc-900 mb-1" />
            <div className="w-4 h-[2px] bg-zinc-900 mb-1" />
            <div className="w-6 h-[2px] bg-zinc-900" />
          </button>
          <NavLink to="/" className="flex items-center">
            <img
              src="/hittfitt-logo.png"
              alt="HittFitt logo"
              className="h-32 w-auto"
            />
          </NavLink>
          <div />
        </div>
      </header>

      {/* overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40"
          aria-hidden="true"
        />
      )}

      {/* drawer */}
      <aside
        ref={panelRef}
        className={`fixed z-50 top-0 left-0 h-full w-80 max-w-[85%] bg-champagne border-r border-zinc-300 shadow-xl transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 pt-2 pb-1 flex flex-col items-center text-center">
          <img
            src="/hittfitt-logo.png"
            alt="HittFitt logo"
            className="max-h-28 w-auto mx-auto"
          />
          <p className="mt-1 text-[13px] font-medium tracking-wide text-zinc-800">Health + Fitness</p>
          <p className="mt-0.5 text-[12px] leading-snug text-zinc-600">
            Fuel Your Body. Build Your Results. <span className="italic">Live HittFitt.</span>
          </p>
          <div className="mt-2 border-t border-zinc-300/80" />
        </div>
        <nav className="px-2 py-2 space-y-1">
          <NavItem to="/" onClick={() => setOpen(false)}>Home</NavItem>
          <NavItem to="/meals" onClick={() => setOpen(false)}>Meals with Morgan</NavItem>
          <NavItem to="/move" onClick={() => setOpen(false)}>Move with Morgan</NavItem>
          <NavItem to="/about" onClick={() => setOpen(false)}>About</NavItem>
        </nav>

        <div className="mt-4 border-t border-zinc-300" />
        <div className="p-4 space-y-2">
          <a href="https://tiktok.com/" target="_blank" className="block text-sm underline">TikTok</a>
          <a href="https://instagram.com/" target="_blank" className="block text-sm underline">Instagram</a>
        </div>

        <div className="mt-auto p-4">
          <a href="#buy" onClick={()=>setOpen(false)}
             className="w-full inline-flex justify-center items-center rounded-xl bg-rustic text-white px-4 py-3 font-semibold">
            Get the $5 PDF
          </a>
        </div>
      </aside>
    </>
  )
}