import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Meals from './pages/Meals.jsx'
import Move from './pages/Move.jsx'
import About from './pages/About.jsx'
import CheckoutSuccess from './pages/CheckoutSuccess.jsx'
import CheckoutCancel from './pages/CheckoutCancel.jsx'

export default function RoutesIndex() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/meals" element={<Meals />} />
      <Route path="/move" element={<Move />} />
      <Route path="/about" element={<About />} />
      <Route path="/success" element={<CheckoutSuccess />} />
      <Route path="/cancel" element={<CheckoutCancel />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}