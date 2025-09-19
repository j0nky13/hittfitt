import Hero from '../components/home/Hero'
import OfferGrid from '../components/home/OfferGrid'
import FeatureStrip from '../components/home/FeatureStrip'
import SocialProof from '../components/home/SocialProof'
import EmailCapture from '../components/home/EmailCapture'
import FAQ from '../components/home/FAQ'

export default function Home() {
  return (
    <>
      <Hero />
      <OfferGrid />
      <FeatureStrip />
      <SocialProof />
      <FAQ />
      <EmailCapture />
    </>
  )
}