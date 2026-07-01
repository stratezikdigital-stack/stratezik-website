import { Link } from 'react-router-dom'

const SITE = 'https://www.stratezik.com'
const LAST_UPDATED = 'June 30, 2026'

const sectionClass = 'mt-12 pt-10 border-t border-ink/10 first:mt-0 first:pt-0 first:border-t-0'
const h2Class = 'font-display text-2xl text-ink tracking-tight'
const pClass = 'mt-4 text-ink-700 leading-relaxed'
const ulClass = 'mt-4 space-y-2 text-ink-700 leading-relaxed list-disc pl-6'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream pb-24">
      <div className="container-custom px-6 md:px-12 pt-8 md:pt-12 max-w-3xl">
        <nav className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500 mb-10">
          <Link to="/" className="hover:text-ink transition-colors">
            Home
          </Link>
          <span className="mx-2 text-ink-300">&middot;</span>
          <span className="text-ink" aria-current="page">
            Privacy Notice
          </span>
        </nav>

        <header>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">Legal</p>
          <h1 className="mt-4 font-display text-display-3 md:text-[3rem] text-ink leading-[1.05] tracking-[-0.035em]">
            Privacy Notice
          </h1>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
            Last updated: {LAST_UPDATED}
          </p>
          <p className={`lead ${pClass}`}>
            Stratezik Digital Inc. (&ldquo;Stratezik,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;)
            operates the website{' '}
            <a href={SITE} className="text-oxblood underline underline-offset-2">
              {SITE}
            </a>{' '}
            (the &ldquo;Site&rdquo;). We are a Toronto-based digital marketing agency, and we take the privacy of our
            visitors, prospects, and clients seriously.
          </p>
          <p className={pClass}>
            This Privacy Notice explains how we collect, use, and protect your personal information when you visit our
            Site, use our tools and lead-generation features, apply for a job with us, or receive marketing
            communications from us. It is built to comply with Canada&apos;s federal{' '}
            <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA),{' '}
            <em>Canada&apos;s Anti-Spam Legislation</em> (CASL), and Quebec&apos;s <em>Law 25</em>. For international
            visitors, it also reflects the EU/UK <em>General Data Protection Regulation</em> (GDPR) and California&apos;s{' '}
            <em>CCPA/CPRA</em>.
          </p>
        </header>

        <section id="information-we-collect" className={sectionClass}>
          <h2 className={h2Class}>1. Information We Collect</h2>
          <p className={pClass}>
            We collect personal information that you give us directly, along with some technical data we gather
            automatically.
          </p>
          <ul className={ulClass}>
            <li>
              <strong className="text-ink">Contact Data:</strong> Your name, business email address, phone number, and
              company name.
            </li>
            <li>
              <strong className="text-ink">Communication Preferences:</strong> Your choices about the marketing and
              operational messages you receive from us.
            </li>
            <li>
              <strong className="text-ink">Tool and Form Inputs:</strong> Information you enter into our tools, such as
              a website URL submitted to our AEO Readiness Checker, or details you provide when claiming a Growth Credit
              or requesting an audit.
            </li>
            <li>
              <strong className="text-ink">Recruitment Data:</strong> If you apply for a role through our Careers page,
              we collect your resume, cover letter, contact details, work history, and anything else you choose to
              share.
            </li>
            <li>
              <strong className="text-ink">Technical and Usage Data:</strong> When you visit the Site, we and our
              analytics tools may automatically collect your IP address, device and browser type, referring URLs,
              campaign parameters (UTM tags), pages you view, and time spent on the Site.
            </li>
          </ul>
        </section>

        <section id="how-we-collect" className={sectionClass}>
          <h2 className={h2Class}>2. How We Collect Your Information</h2>
          <ul className={ulClass}>
            <li>
              <strong className="text-ink">Direct Interaction:</strong> You provide information when you fill out a
              contact or consultation form, access a gated resource like a guide, audit, or template, subscribe to our
              newsletter, use one of our tools, or apply for a job.
            </li>
            <li>
              <strong className="text-ink">Lead-Generation and Diagnostic Tools:</strong> We run tools on our Site,
              such as our AEO Readiness Checker, that let you engage with us, request information, or run a diagnostic
              check.
            </li>
            <li>
              <strong className="text-ink">Cookies and Tracking Technologies:</strong> We use cookies, web beacons, and
              similar technologies to understand traffic and improve your experience. Section 8 covers this in detail,
              along with your choices.
            </li>
          </ul>
        </section>

        <section id="how-we-use" className={sectionClass}>
          <h2 className={h2Class}>3. How We Use Your Information</h2>
          <ul className={ulClass}>
            <li>
              <strong className="text-ink">To Provide Services:</strong> To deliver the resources, reports,
              consultations, or tool outputs you asked for.
            </li>
            <li>
              <strong className="text-ink">Marketing Communications:</strong> To send newsletters, promotional emails,
              educational content, and updates about our services, following the consent rules in Section 4. You can opt
              out at any time.
            </li>
            <li>
              <strong className="text-ink">Recruitment:</strong> To review your application, talk with you about
              opportunities, and manage our hiring process.
            </li>
            <li>
              <strong className="text-ink">To Improve Our Site:</strong> To learn how visitors use the Site and our tools
              so we can improve performance, usability, and accuracy.
            </li>
            <li>
              <strong className="text-ink">Customer Support:</strong> To respond to your questions, requests, and
              feedback.
            </li>
            <li>
              <strong className="text-ink">Legal and Security Purposes:</strong> To protect the Site, prevent fraud or
              abuse, and meet our legal and regulatory obligations.
            </li>
          </ul>
        </section>

        <section id="casl" className={sectionClass}>
          <h2 className={h2Class}>4. Your Consent and Commercial Electronic Messages (CASL)</h2>
          <p className={pClass}>
            Email marketing is a core part of what we do, so we follow Canada&apos;s Anti-Spam Legislation (CASL) for
            every commercial electronic message (CEM) we send.
          </p>
          <ul className={ulClass}>
            <li>
              <strong className="text-ink">Express Consent:</strong> When you opt in through a form, newsletter sign-up,
              or gated-content request, you give us express consent to send you marketing emails until you withdraw it.
            </li>
            <li>
              <strong className="text-ink">Implied Consent:</strong> In the limited cases CASL allows, we may contact you
              based on an existing business relationship, such as a recent inquiry or engagement, within the timeframes
              set out in the law.
            </li>
            <li>
              <strong className="text-ink">Identification:</strong> Every message we send clearly identifies Stratezik
              and includes valid contact information.
            </li>
            <li>
              <strong className="text-ink">Unsubscribe:</strong> Every marketing email includes a working unsubscribe
              link. You can withdraw consent at any time, and we will action your request within 10 business days at no
              cost to you.
            </li>
          </ul>
          <p className={pClass}>
            Withdrawing marketing consent does not affect operational or transactional messages that are needed to
            provide a service you have requested.
          </p>
        </section>

        <section id="legal-basis" className={sectionClass}>
          <h2 className={h2Class}>5. Legal Basis for Processing (EEA/UK Visitors)</h2>
          <p className={pClass}>
            If you are in the European Economic Area (EEA) or the United Kingdom, our legal basis for processing your
            personal data depends on the situation:
          </p>
          <ul className={ulClass}>
            <li>
              <strong className="text-ink">Consent:</strong> You have given clear consent for a specific purpose, such
              as subscribing to a marketing list.
            </li>
            <li>
              <strong className="text-ink">Legitimate Interests:</strong> Processing is necessary for our legitimate
              business interests, as long as those interests do not override your fundamental rights. This covers things
              like securing our Site, analyzing traffic, and B2B outreach.
            </li>
            <li>
              <strong className="text-ink">Contract or Legal Obligation:</strong> Processing is necessary to provide a
              service you requested or to meet a legal requirement.
            </li>
          </ul>
        </section>

        <section id="sharing" className={sectionClass}>
          <h2 className={h2Class}>6. Sharing and Disclosure of Your Information</h2>
          <p className={pClass}>
            We do not sell, rent, or trade your personal information. We share it only in these situations:
          </p>
          <ul className={ulClass}>
            <li>
              <strong className="text-ink">Service Providers:</strong> We share data with trusted vendors who help us
              run the Site and our business. These include website hosting providers, analytics tools such as Google
              Analytics, email marketing and CRM platforms, advertising platforms, and form and lead-management tools.
              They are contractually required to protect your data and use it only on our instructions.
            </li>
            <li>
              <strong className="text-ink">Advertising Partners:</strong> We may share limited data with advertising
              platforms such as Meta, LinkedIn, and Google Ads to measure and improve our campaigns. Where this counts
              as &ldquo;sharing&rdquo; for cross-context behavioural advertising under CPRA, you can opt out as described
              in Section 11.
            </li>
            <li>
              <strong className="text-ink">Legal and Corporate:</strong> We may disclose information where the law
              requires it, where a valid legal process compels it, or in connection with a merger, acquisition, or sale
              of assets.
            </li>
          </ul>
        </section>

        <section id="international-transfers" className={sectionClass}>
          <h2 className={h2Class}>7. International Data Transfers</h2>
          <p className={pClass}>
            We operate in Canada, and information collected through the Site may be stored or processed in Canada, the
            United States, or other countries where our service providers keep facilities. Where required, we put
            appropriate safeguards in place, such as standard contractual clauses, to protect your data when it moves
            across borders.
          </p>
        </section>

        <section id="cookies" className={sectionClass}>
          <h2 className={h2Class}>8. Cookies and Tracking Technologies</h2>
          <p className={pClass}>We use a few categories of cookies and similar technologies:</p>
          <ul className={ulClass}>
            <li>
              <strong className="text-ink">Essential Cookies:</strong> Needed for the Site to work. These cannot be
              switched off.
            </li>
            <li>
              <strong className="text-ink">Analytics Cookies:</strong> Help us understand how visitors use the Site, for
              example through Google Analytics.
            </li>
            <li>
              <strong className="text-ink">Advertising and Retargeting Cookies:</strong> Used by advertising platforms
              such as Meta, LinkedIn, and Google Ads to deliver and measure relevant ads.
            </li>
          </ul>
          <p className={pClass}>
            For non-essential cookies, we ask for your consent through our cookie banner where the law requires it. You
            can accept, decline, or change your preferences at any time through the banner or your browser settings.
            Declining non-essential cookies will not block your access to the core content of the Site.
          </p>
        </section>

        <section id="security" className={sectionClass}>
          <h2 className={h2Class}>9. Data Security</h2>
          <p className={pClass}>
            We use reasonable technical, administrative, and physical safeguards to protect your personal information
            from unauthorized access, disclosure, alteration, or destruction. No method of transmitting or storing data
            online is completely secure, so we cannot guarantee absolute security.
          </p>
        </section>

        <section id="breach-notification" className={sectionClass}>
          <h2 className={h2Class}>10. Data Breach Notification</h2>
          <p className={pClass}>
            If we have a security incident involving personal information that creates a real risk of significant harm,
            we will notify the affected individuals and the relevant authorities as the law requires. In Canada this
            means the Office of the Privacy Commissioner of Canada under PIPEDA, and the Commission d&apos;accès à
            l&apos;information du Québec where Law 25 applies. We keep records of breaches as required.
          </p>
        </section>

        <section id="your-rights" className={sectionClass}>
          <h2 className={h2Class}>11. Your Privacy Rights and Choices</h2>
          <p className={pClass}>
            Depending on where you live, including Canada under PIPEDA and Quebec&apos;s Law 25, the EU or UK under
            GDPR, or U.S. states under CCPA/CPRA, you may have some or all of these rights:
          </p>
          <ul className={ulClass}>
            <li>
              <strong className="text-ink">Access and Correction:</strong> Ask for a copy of the personal information we
              hold about you, and ask us to correct anything that is wrong.
            </li>
            <li>
              <strong className="text-ink">Withdraw Consent:</strong> Withdraw your consent to our collection, use, or
              disclosure of your personal information at any time, subject to legal or contractual limits.
            </li>
            <li>
              <strong className="text-ink">Erasure (&ldquo;Right to be Forgotten&rdquo;):</strong> Ask us to delete your
              personal information from our active databases.
            </li>
            <li>
              <strong className="text-ink">Data Portability:</strong> Ask for a copy of certain information in a
              structured, commonly used format.
            </li>
            <li>
              <strong className="text-ink">Opt Out of Marketing:</strong> Unsubscribe from marketing emails using the
              link in any message.
            </li>
            <li>
              <strong className="text-ink">Opt Out of Sale or Sharing (CPRA):</strong> California residents can opt out
              of any sale or sharing of personal information for cross-context behavioural advertising.
            </li>
          </ul>
          <p className={pClass}>
            To use any of these rights, contact us with the details in Section 14. We will respond within the timeframes
            the law requires, and we may need to verify your identity first.
          </p>
        </section>

        <section id="quebec" className={sectionClass}>
          <h2 className={h2Class}>12. Quebec Residents (Law 25)</h2>
          <p className={pClass}>If you live in Quebec, Law 25 gives you extra protections:</p>
          <ul className={ulClass}>
            <li>Stratezik is responsible for the personal information in its possession or control.</li>
            <li>
              We collect, use, and disclose your personal information only with valid consent or as the law otherwise
              permits, and only for the purposes we identify when we collect it.
            </li>
            <li>
              You have the rights of access, correction, withdrawal of consent, portability, and de-indexing, and the
              right to be told about automated decision-making, which is covered in Section 13.
            </li>
            <li>
              We will report confidentiality incidents to the Commission d&apos;accès à l&apos;information and to affected
              individuals where the incident presents a risk of serious injury.
            </li>
          </ul>
        </section>

        <section id="automated-decisions" className={sectionClass}>
          <h2 className={h2Class}>13. Automated Decision-Making and AI</h2>
          <p className={pClass}>
            We use analytics, and we may use automated tools to support marketing, lead scoring, and Site optimization.
            If we ever make a decision about you based only on automated processing of your personal information, and you
            are entitled under applicable law such as Quebec&apos;s Law 25 or the GDPR, you can ask us for information
            about that processing and ask to have it reviewed by a person. Contact us using the details in Section 14.
          </p>
        </section>

        <section id="contact" className={sectionClass}>
          <h2 className={h2Class}>14. How to Contact Us</h2>
          <p className={pClass}>
            If you have questions about this Notice or how we handle your information, or you want to make a privacy
            request or complaint, please reach us at:
          </p>
          <div className={`${pClass} space-y-1`}>
            <p>
              <strong className="text-ink">Stratezik Digital Inc.</strong>
            </p>
            <p>
              <strong className="text-ink">Email:</strong>{' '}
              <a href="mailto:dave@stratezik.com" className="text-oxblood underline underline-offset-2">
                dave@stratezik.com
              </a>
            </p>
            <p>
              <strong className="text-ink">Phone:</strong> +1 (437) 525-4772
            </p>
            <p>
              <strong className="text-ink">Mail:</strong> 2466 Eglinton Ave E, Toronto, ON, Canada
            </p>
            <p>
              <strong className="text-ink">Website:</strong>{' '}
              <a href={SITE} className="text-oxblood underline underline-offset-2">
                {SITE}
              </a>
            </p>
          </div>
          <p className={pClass}>
            If you are not satisfied with how we handle your request, you can contact the Office of the Privacy
            Commissioner of Canada. Quebec residents can also contact the Commission d&apos;accès à l&apos;information
            du Québec.
          </p>
        </section>

        <section id="retention" className={sectionClass}>
          <h2 className={h2Class}>15. Retention of Data</h2>
          <p className={pClass}>
            We keep personal information only as long as we need it for the purposes set out in this Notice, or as long
            as the law requires for accounting, reporting, or other obligations. As a general guide, we keep marketing
            contact data until you unsubscribe or ask us to delete it, and we keep recruitment data for a reasonable
            period after a hiring decision unless you ask us to remove it sooner. When we no longer need information, we
            securely delete or anonymize it.
          </p>
        </section>

        <section id="children" className={sectionClass}>
          <h2 className={h2Class}>16. Children&apos;s Privacy</h2>
          <p className={pClass}>
            Our Site and services are meant for businesses and professionals, not children. We do not knowingly collect
            personal information from anyone under the age of majority. If you think a child has given us personal
            information, please contact us so we can delete it.
          </p>
        </section>

        <section id="paid-reports" className={sectionClass}>
          <h2 className={h2Class}>17. Paid Reports — Payments, Refunds &amp; Credits</h2>
          <p className={pClass}>
            Some of our tools produce <strong className="text-ink">paid reports</strong> — currently the AEO Checker
            page and full-site audits, and the Google Business Profile (GBP) Growth Roadmap. These are{' '}
            <strong className="text-ink">custom digital services generated on demand</strong> at the time of purchase,
            using data and AI analysis available at that moment, and delivered to you on-screen and/or by email.
          </p>
          <p className={pClass}>
            When you pay for a report, you tick a box confirming you have read and agree to the terms in this section.
            We record that consent (and its timestamp) with your order.
          </p>
          <ul className={ulClass}>
            <li>
              <strong className="text-ink">Successful delivery is a final sale.</strong> Because each report is
              generated specifically for you and made available immediately, a purchase is{' '}
              <strong className="text-ink">non-refundable once the report has been successfully generated</strong> and
              delivered to you.
            </li>
            <li>
              <strong className="text-ink">If generation fails on our side.</strong> In the rare case that we take
              payment but cannot deliver your report due to a technical failure, we detect it automatically. We will,
              at our discretion: (a) retry and deliver it, (b) prepare and deliver it manually, or (c) if it still
              cannot be delivered, provide a <strong className="text-ink">free re-run credit or a full refund</strong>{' '}
              of that purchase.
            </li>
            <li>
              <strong className="text-ink">How to reach us.</strong> If you paid and did not receive your report,
              email{' '}
              <a href="mailto:dave@stratezik.com" className="text-oxblood underline underline-offset-2">
                dave@stratezik.com
              </a>{' '}
              within <strong className="text-ink">30 days</strong> with your payment confirmation. We monitor failed
              deliveries automatically, but contacting us ensures we resolve yours quickly.
            </li>
            <li>
              <strong className="text-ink">No refunds for change of mind or results.</strong> Reports are
              informational and reflect the data and AI analysis available at generation time. Scores, findings, and
              recommendations are not guarantees of rankings, traffic, revenue, or other outcomes, and are not grounds
              for a refund once delivered.
            </li>
            <li>
              <strong className="text-ink">Payment processing.</strong> Payments are handled by Stripe. We do not
              receive or store your full card details. Stripe processes your payment information under its own terms
              and privacy policy.
            </li>
          </ul>
          <p className={pClass}>
            Nothing in this section limits any non-waivable rights you may have under applicable consumer protection
            law.
          </p>
        </section>

        <section id="changes" className={sectionClass}>
          <h2 className={h2Class}>18. Changes to This Notice</h2>
          <p className={pClass}>
            We may update this Privacy Notice from time to time to reflect changes in our practices or the law. We will
            post the new version here and update the &ldquo;Last Updated&rdquo; date at the top. Where the law requires
            it, we will let you know about material changes.
          </p>
        </section>

        <footer className="mt-16 pt-10 border-t border-ink/10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood hover:text-ink"
          >
            &larr; Back to home
          </Link>
        </footer>
      </div>
    </div>
  )
}
