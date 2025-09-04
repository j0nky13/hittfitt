import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import RoutesIndex from './routes'

export default function App() {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      <main className="flex-1">
        <RoutesIndex />
      </main>
      <Footer /> {/* sticks to bottom via flex + mt-auto on small pages */}
    </div>
  )
}