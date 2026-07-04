export type GrowthCreditTermSection = {
  title: string
  paragraphs: string[]
}

export const GROWTH_CREDIT_TERMS: GrowthCreditTermSection[] = [
  {
    title: '1. Definitions',
    paragraphs: [
      'Company refers to Stratezik Digital Inc.',
      'Client refers to the approved business entity receiving the credit.',
      'Growth Credit refers to the promotional, non-cash value applied toward eligible services.',
    ],
  },
  {
    title: '2. Eligibility & Approval Process',
    paragraphs: [
      'The Growth Credit Program is available exclusively to commercial entities legally registered and operating in Canada. Program participation is entirely subject to the sole and absolute discretion of the Company. The Company reserves the right to deny approval to any applicant for any reason.',
    ],
  },
  {
    title: '3. Credit Issuance & Usage Restrictions',
    paragraphs: [
      'Upon approval, a maximum of CAD $3,000 will be credited to the Client’s account. The Growth Credit has zero cash value, is non-transferable, non-refundable, and cannot be sold. Growth Credits may only be utilized to offset up to forty percent (40%) of the Client’s eligible monthly recurring service retainer.',
    ],
  },
  {
    title: '4. Excluded Services',
    paragraphs: [
      'Growth Credits cannot be applied toward third-party advertising media spend (e.g., Google Ads, Meta Ads network spend), software licenses, domain registration, one-time project fees, or any external vendor costs unless explicitly authorized in writing by the Company.',
    ],
  },
  {
    title: '5. Expiration and Forfeiture',
    paragraphs: [
      'Pursuant to Ontario consumer and commercial regulations regarding promotional credits, the Growth Credit is issued for promotional purposes and expires twelve (12) months from the initial service commencement date. Any remaining balance upon expiration, or upon termination of the Client’s Master Services Agreement for any reason, is immediately forfeited.',
    ],
  },
  {
    title: '6. Fraud and Misrepresentation',
    paragraphs: [
      'If the Client is found to have provided false information during the qualification process, the Company reserves the right to immediately revoke all issued credits and back-bill the Client for any credits previously utilized.',
    ],
  },
  {
    title: '7. Modification and Limitation of Liability',
    paragraphs: [
      'The Company reserves the right to modify, suspend, or terminate the Growth Credit Program at any time. Under no circumstances shall the Company be liable for any direct, indirect, or consequential damages arising from the Client’s participation in or inability to utilize the Program.',
    ],
  },
  {
    title: '8. Governing Law',
    paragraphs: [
      'These Terms shall be governed by and construed in accordance with the laws of the Province of Ontario, Canada, and the federal laws of Canada applicable therein.',
    ],
  },
]

export const GROWTH_CREDIT_FOOTER_DISCLAIMER =
  'Stratezik Growth Credits are promotional incentives with no cash value. Credits are applicable only to eligible Stratezik Digital Inc. management fees and cannot be applied toward third-party media spend or software costs. Maximum 40% monthly utilization applies. Credits expire 12 months from issuance. Subject to approval and standard commercial terms.'
