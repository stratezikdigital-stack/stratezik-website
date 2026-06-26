/**
 * Branded PDF for the paid GBP growth plan.
 *
 * Pure-JS (pdf-lib) so it runs in a Vercel serverless function with no headless
 * browser. Renders all 12 operator sections plus a closing CTA.
 */
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from 'pdf-lib'
import type { GbpScanResult } from './scan.js'
import type { AiRoadmap } from './roadmap-ai.js'

const CREAM = rgb(0.957, 0.945, 0.917)
const INK = rgb(0.13, 0.12, 0.11)
const INK_SOFT = rgb(0.4, 0.38, 0.35)
const OXBLOOD = rgb(0.55, 0.18, 0.18)
const HAIRLINE = rgb(0.82, 0.79, 0.74)

const PAGE = { w: 595.28, h: 841.89 }
const MARGIN = 56
const CONTENT_W = PAGE.w - MARGIN * 2

type Ctx = {
  doc: PDFDocument
  page: PDFPage
  y: number
  body: PDFFont
  bodyBold: PDFFont
  display: PDFFont
}

function clean(text: string): string {
  return text
    .replace(/[‘’‚′]/g, "'")
    .replace(/[“”„″]/g, '"')
    .replace(/[–—―]/g, '-')
    .replace(/…/g, '...')
    .replace(/ /g, ' ')
    .replace(/•/g, '-')
    // eslint-disable-next-line no-control-regex
    .replace(/[^\t\n\x20-\xFF]/g, '')
}

function newPage(ctx: Ctx): void {
  ctx.page = ctx.doc.addPage([PAGE.w, PAGE.h])
  ctx.page.drawRectangle({ x: 0, y: 0, width: PAGE.w, height: PAGE.h, color: CREAM })
  ctx.y = PAGE.h - MARGIN
}

function ensure(ctx: Ctx, needed: number): void {
  if (ctx.y - needed < MARGIN) newPage(ctx)
}

function wrap(text: string, font: PDFFont, size: number, maxW: number): string[] {
  const lines: string[] = []
  for (const rawLine of clean(text).split('\n')) {
    const words = rawLine.split(/\s+/).filter(Boolean)
    if (words.length === 0) {
      lines.push('')
      continue
    }
    let line = ''
    for (const word of words) {
      const test = line ? `${line} ${word}` : word
      if (font.widthOfTextAtSize(test, size) > maxW && line) {
        lines.push(line)
        line = word
      } else {
        line = test
      }
    }
    if (line) lines.push(line)
  }
  return lines
}

function paragraph(
  ctx: Ctx,
  text: string,
  opts: { font?: PDFFont; size?: number; color?: ReturnType<typeof rgb>; gap?: number; indent?: number } = {},
): void {
  const font = opts.font ?? ctx.body
  const size = opts.size ?? 10.5
  const color = opts.color ?? INK_SOFT
  const lineH = size * 1.42
  const indent = opts.indent ?? 0
  const lines = wrap(text, font, size, CONTENT_W - indent)
  for (const line of lines) {
    ensure(ctx, lineH)
    ctx.page.drawText(line, { x: MARGIN + indent, y: ctx.y - size, size, font, color })
    ctx.y -= lineH
  }
  ctx.y -= opts.gap ?? 4
}

function sectionLabel(ctx: Ctx, kicker: string, title: string): void {
  ensure(ctx, 54)
  ctx.y -= 10
  ctx.page.drawText(clean(kicker).toUpperCase(), {
    x: MARGIN,
    y: ctx.y - 8,
    size: 8,
    font: ctx.bodyBold,
    color: OXBLOOD,
  })
  ctx.y -= 18
  ctx.page.drawText(clean(title), { x: MARGIN, y: ctx.y - 16, size: 16, font: ctx.display, color: INK })
  ctx.y -= 24
  ctx.page.drawLine({
    start: { x: MARGIN, y: ctx.y },
    end: { x: PAGE.w - MARGIN, y: ctx.y },
    thickness: 0.75,
    color: HAIRLINE,
  })
  ctx.y -= 14
}

function bullet(ctx: Ctx, text: string): void {
  const size = 10.5
  const lineH = size * 1.42
  const lines = wrap(text, ctx.body, size, CONTENT_W - 16)
  lines.forEach((line, i) => {
    ensure(ctx, lineH)
    if (i === 0) {
      ctx.page.drawText('-', { x: MARGIN, y: ctx.y - size, size, font: ctx.bodyBold, color: OXBLOOD })
    }
    ctx.page.drawText(line, { x: MARGIN + 16, y: ctx.y - size, size, font: ctx.body, color: INK_SOFT })
    ctx.y -= lineH
  })
  ctx.y -= 2
}

function assetBox(ctx: Ctx, label: string, copy: string): void {
  const size = 10
  const lineH = size * 1.45
  const lines = wrap(copy, ctx.body, size, CONTENT_W - 28)
  const boxH = lines.length * lineH + 34
  ensure(ctx, boxH + 6)
  const top = ctx.y
  ctx.page.drawRectangle({
    x: MARGIN,
    y: top - boxH,
    width: CONTENT_W,
    height: boxH,
    color: rgb(0.965, 0.957, 0.937),
    borderColor: HAIRLINE,
    borderWidth: 0.75,
  })
  ctx.page.drawText(clean(label).toUpperCase(), {
    x: MARGIN + 14,
    y: top - 18,
    size: 7.5,
    font: ctx.bodyBold,
    color: OXBLOOD,
  })
  let ty = top - 30
  for (const line of lines) {
    ctx.page.drawText(line, { x: MARGIN + 14, y: ty - size, size, font: ctx.body, color: INK })
    ty -= lineH
  }
  ctx.y = top - boxH - 12
}

export async function buildRoadmapPdf(scan: GbpScanResult, roadmap: AiRoadmap): Promise<Uint8Array> {
  const doc = await PDFDocument.create()
  doc.setTitle(`GBP Growth Plan - ${scan.businessName}`)
  doc.setAuthor('Stratezik')
  doc.setSubject(`90-day Google Business Profile roadmap for ${scan.businessName}, ${scan.city}`)

  const body = await doc.embedFont(StandardFonts.Helvetica)
  const bodyBold = await doc.embedFont(StandardFonts.HelveticaBold)
  const display = await doc.embedFont(StandardFonts.TimesRomanBold)

  const ctx: Ctx = { doc, page: null as unknown as PDFPage, y: 0, body, bodyBold, display }
  newPage(ctx)

  ctx.page.drawText('STRATEZIK', { x: MARGIN, y: ctx.y - 10, size: 9, font: bodyBold, color: OXBLOOD })
  ctx.y -= 30
  ctx.page.drawText('Google Business Profile', { x: MARGIN, y: ctx.y - 24, size: 24, font: display, color: INK })
  ctx.y -= 30
  ctx.page.drawText('90-Day Operator Plan', { x: MARGIN, y: ctx.y - 24, size: 24, font: display, color: INK })
  ctx.y -= 38
  paragraph(ctx, `${scan.businessName} - ${scan.city}`, { font: bodyBold, size: 11, color: INK, gap: 2 })
  paragraph(
    ctx,
    `Prepared for "${scan.query}". You currently rank ${scan.rankWord}, behind ${scan.topCompetitor}. Score ${scan.score}/100 (${scan.grade}).`,
    { size: 10, gap: 10 },
  )

  // 01 Situation
  sectionLabel(ctx, '01 - Where you stand', 'The situation, in plain terms')
  paragraph(ctx, roadmap.summary, { gap: 8 })
  paragraph(ctx, roadmap.competitorInsight, { gap: 6 })

  // 02 Plan
  sectionLabel(ctx, '02 - The plan', 'Your 90 days, week by week')
  for (const phase of roadmap.weeklyPlan) {
    ensure(ctx, 40)
    paragraph(ctx, `${phase.weeks} - ${phase.title}`, { font: bodyBold, size: 11.5, color: INK, gap: 2 })
    paragraph(ctx, phase.why, { size: 10, gap: 4 })
    for (const action of phase.actions) bullet(ctx, action)
    ctx.y -= 4
  }

  // 03 Category reverse-engineering
  sectionLabel(ctx, '03 - Categories', 'Reverse-engineer the Map Pack leader')
  const cat = roadmap.categoryStrategy
  if (cat.yourCurrentPrimary) {
    paragraph(ctx, `Your current primary: ${cat.yourCurrentPrimary}`, { font: bodyBold, size: 10.5, color: INK, gap: 2 })
  }
  paragraph(ctx, `Leader primary: ${cat.leaderPrimary}`, { size: 10, gap: 2 })
  paragraph(ctx, `Recommended primary: ${cat.recommendedPrimary}`, { font: bodyBold, size: 10.5, color: INK, gap: 2 })
  paragraph(ctx, `Additional categories: ${cat.additionalCategories.join(', ')}`, { size: 10, gap: 6 })
  paragraph(ctx, cat.rationale, { gap: 8 })

  // 04 Review-SEO
  sectionLabel(ctx, '04 - Review SEO', 'Keywords, photos, and velocity')
  paragraph(ctx, `Justification keywords: ${roadmap.reviewSeo.justificationKeywords.join(', ')}`, { gap: 6 })
  assetBox(ctx, 'Neighborhood seeding ask', roadmap.reviewSeo.neighborhoodSeedingAsk)
  paragraph(ctx, 'Photo asks for customers:', { font: bodyBold, size: 10, color: INK, gap: 2 })
  for (const ask of roadmap.reviewSeo.photoAsks) bullet(ctx, ask)
  const vp = roadmap.reviewSeo.velocityPacing
  paragraph(
    ctx,
    `You have ${vp.current} reviews. 90-day target: ${vp.ninetyDayTarget} (about ${vp.perWeek}/week). ${vp.note}`,
    { gap: 8 },
  )
  assetBox(ctx, 'Text after every job', roadmap.reviewSeo.reviewRequest.sms)
  assetBox(ctx, 'Or email this', roadmap.reviewSeo.reviewRequest.email)

  // 05 Services build-out
  sectionLabel(ctx, '05 - Services', 'Keyword-rich list for "Provides" justifications')
  paragraph(ctx, roadmap.servicesBuildOut.providesJustificationNote, { gap: 6 })
  for (const svc of roadmap.servicesBuildOut.services) {
    ensure(ctx, 28)
    paragraph(ctx, svc.name, { font: bodyBold, size: 10.5, color: INK, gap: 1 })
    paragraph(ctx, svc.description, { size: 10, gap: 6 })
  }

  // 06 Reply-SEO
  sectionLabel(ctx, '06 - Reply SEO', 'Owner reply templates')
  assetBox(ctx, '5-star review reply', roadmap.replySeo.fiveStar)
  assetBox(ctx, 'Mixed review reply (3-4 stars)', roadmap.replySeo.mixed)
  assetBox(ctx, 'Negative review reply (1-2 stars)', roadmap.replySeo.negative)

  // 07 Profile copy
  sectionLabel(ctx, '07 - Profile copy', 'Your business description')
  assetBox(ctx, 'Paste into GBP description', roadmap.optimizedDescription)

  // 08 Posts
  sectionLabel(ctx, '08 - Month one posts', 'Four posts, ready to publish')
  for (const post of roadmap.googlePosts) {
    assetBox(ctx, `${post.week} - ${post.type}`, post.copy)
  }

  // 09 Q&A
  sectionLabel(ctx, '09 - Seed your Q&A', 'Questions to post and answer yourself')
  for (const qa of roadmap.qanda) {
    ensure(ctx, 32)
    paragraph(ctx, `Q. ${qa.question}`, { font: bodyBold, size: 10.5, color: INK, gap: 2 })
    paragraph(ctx, `A. ${qa.answer}`, { size: 10, gap: 8 })
  }

  // 10 Competitive integrity
  sectionLabel(ctx, '10 - Competitive integrity', 'Audit, redressal, and what not to do')
  paragraph(ctx, 'Audit notes:', { font: bodyBold, size: 10, color: INK, gap: 2 })
  for (const note of roadmap.competitiveIntegrity.auditNotes) bullet(ctx, note)
  paragraph(ctx, 'Compliant redressal steps:', { font: bodyBold, size: 10, color: INK, gap: 2 })
  for (const step of roadmap.competitiveIntegrity.redressalSteps) bullet(ctx, step)
  paragraph(ctx, 'What NOT to do:', { font: bodyBold, size: 10, color: INK, gap: 2 })
  for (const item of roadmap.competitiveIntegrity.whatNotToDo) bullet(ctx, item)

  // 11 Geo-targeting
  sectionLabel(ctx, '11 - Geo-targeting', 'Block-by-block and neighborhood priority')
  paragraph(ctx, roadmap.geoTargeting.blockLogic, { gap: 6 })
  paragraph(ctx, `Priority neighborhoods: ${roadmap.geoTargeting.priorityNeighborhoods.join(', ')}`, { gap: 6 })
  paragraph(ctx, roadmap.geoTargeting.serviceAreaNote, { gap: 8 })

  // 12 Attributes, photos & authority
  sectionLabel(ctx, '12 - Authority signals', 'Attributes, photos, entity consistency')
  paragraph(ctx, 'Recommended attributes:', { font: bodyBold, size: 10, color: INK, gap: 2 })
  for (const attr of roadmap.attributesAndPhotos.recommendedAttributes) bullet(ctx, attr)
  paragraph(ctx, 'Photo shot list:', { font: bodyBold, size: 10, color: INK, gap: 2 })
  for (const shot of roadmap.attributesAndPhotos.photoShotList) bullet(ctx, shot)
  paragraph(ctx, roadmap.attributesAndPhotos.uploadCadence, { gap: 6 })
  paragraph(ctx, 'Entity consistency:', { font: bodyBold, size: 10, color: INK, gap: 2 })
  for (const item of roadmap.authoritySignals.entityConsistency) bullet(ctx, item)
  paragraph(ctx, 'sameAs profiles to link:', { font: bodyBold, size: 10, color: INK, gap: 2 })
  for (const link of roadmap.authoritySignals.sameAs) bullet(ctx, link)
  paragraph(ctx, 'Local citation targets:', { font: bodyBold, size: 10, color: INK, gap: 2 })
  for (const link of roadmap.authoritySignals.localLinks) bullet(ctx, link)
  paragraph(ctx, roadmap.authoritySignals.schemaNote, { gap: 8 })

  sectionLabel(ctx, 'Next', 'Want this done for you?')
  paragraph(
    ctx,
    'Stratezik runs this whole plan for local businesses every month: profile optimization, the review engine, weekly posts, and the push for a top-3 map pin. Reply to the email this report came from, or book a free consult at stratezik.com.',
    { gap: 4 },
  )

  return doc.save()
}
