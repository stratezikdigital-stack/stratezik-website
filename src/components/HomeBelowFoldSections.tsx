import { NotationMarquee } from './NotationMarquee'
import StrategyFlow from './StrategyFlow'
import PortfolioSection from './PortfolioSection'
import TestimonialSection from './TestimonialSection'
import LatestInsightsSection from './LatestInsightsSection'
import { HomeFaqSection } from './HomeFaqSection'
import ContactSection from './ContactSection'

/** Below-fold homepage sections — loaded on scroll via LazyWhenVisible. */
export default function HomeBelowFoldSections() {
  return (
    <>
      <NotationMarquee
        variant="light"
        lines={[
          'Audience insight before media spend',
          'Creative & landing pages built to convert',
          'Attribution you can defend in the boardroom',
          'Weekly rhythm · monthly reviews · quarterly bets',
          'Stratezik',
        ]}
      />
      <StrategyFlow />
      <PortfolioSection />
      <TestimonialSection />
      <LatestInsightsSection />
      <HomeFaqSection />
      <ContactSection />
    </>
  )
}
