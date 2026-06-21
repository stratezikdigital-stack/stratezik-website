import HeroSection from './HeroSection'
import ServicesSection from './ServicesSection'
import { NotationMarquee } from './NotationMarquee'
import { GrowthCreditHomeBanner } from './GrowthCreditHomeBanner'
import { LazyWhenVisible } from './LazyWhenVisible'
import { useLocation } from 'react-router-dom'

const HomeBelowFoldSections = () =>
  import('./HomeBelowFoldSections').then((mod) => ({ default: mod.default }))

/** Above-fold homepage — below-fold sections load on scroll. */
export default function HomePage() {
  const { hash } = useLocation()
  const contactHash = hash === '#contact' || hash === '#contact-form'

  return (
    <>
      <HeroSection />
      <NotationMarquee
        variant="dark"
        lines={[
          'Toronto digital marketing & growth',
          'SEO · PPC · social · conversion · analytics',
          'Integrated plans · fewer silos · clearer KPIs',
          'SMB & startup budgets · enterprise discipline',
          'Stratezik · measurable demand',
        ]}
      />
      <ServicesSection />
      <GrowthCreditHomeBanner />
      <LazyWhenVisible
        loader={HomeBelowFoldSections}
        minHeight="480px"
        rootMargin="520px 0px"
        eager={contactHash}
      />
    </>
  )
}
