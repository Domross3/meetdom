import HeroSection from '@/components/landing/HeroSection'
import AboutSearch from '@/components/landing/AboutSearch'
import DisciplineGrid from '@/components/landing/DisciplineGrid'
import SongRec from '@/components/landing/SongRec'

export default function Landing() {
  return (
    <main id="main-content">
      <HeroSection />
      <AboutSearch />
      <DisciplineGrid />
      <SongRec />
    </main>
  )
}
