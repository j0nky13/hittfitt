import { Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import Meals from './pages/meals.jsx'
import Move from './pages/move.jsx'
import About from './pages/about.jsx'
import Success from './pages/success.jsx'
import Cancel from './pages/cancel.jsx'

export default function RoutesIndex() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/meals" element={<Meals />} />
      <Route path="/move" element={<Move />} />
      <Route path="/about" element={<About />} />
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}