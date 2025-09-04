import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Meals from './pages/Meals.jsx'
import Move from './pages/Move.jsx'
import About from './pages/About.jsx'
import Success from './pages/Success.jsx'
import Cancel from './pages/Cancel.jsx'

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