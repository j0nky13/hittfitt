import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Meals from './pages/meals'
import Move from './pages/move'
import About from './pages/about'
import Success from './pages/success'
import Cancel from './pages/cancel'

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