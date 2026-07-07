import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from 'pdf-lib'
import { TORONTO_STARTUP_WEBSITE_AUDIT_2026_FINDINGS_BODY } from './verbatim/torontoStartupWebsiteAudit2026FindingsBody'

const CREAM = rgb(0.957, 0.945, 0.917)
const INK = rgb(0.13, 0.12, 0.11)
const INK_SOFT = rgb(0.4, 0.38, 0.35)
const OXBLOOD = rgb(0.55, 0.18, 0.18)
const WATERMARK = rgb(0.72, 0.68, 0.62)

const PAGE = { w: 595.28, h: 841.89 }
const MARGIN = 52
const FOOTER_H = 36
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
    .replace(/[^\t\n\x20-\xFF]/g, '')
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

function drawWatermark(ctx: Ctx): void {
  const text = 'Stratezik Digital · stratezik.com · Toronto Startup Audit 2026'
  const size = 7.5
  ctx.page.drawLine({
    start: { x: MARGIN, y: FOOTER_H + 8 },
    end: { x: PAGE.w - MARGIN, y: FOOTER_H + 8 },
    thickness: 0.5,
    color: WATERMARK,
  })
  ctx.page.drawText(text, {
    x: MARGIN,
    y: FOOTER_H - 6,
    size,
    font: ctx.bodyBold,
    color: WATERMARK,
  })
}

function newPage(ctx: Ctx): void {
  ctx.page = ctx.doc.addPage([PAGE.w, PAGE.h])
  ctx.page.drawRectangle({ x: 0, y: 0, width: PAGE.w, height: PAGE.h, color: CREAM })
  drawWatermark(ctx)
  ctx.y = PAGE.h - MARGIN
}

function ensure(ctx: Ctx, needed: number): void {
  if (ctx.y - needed < MARGIN + FOOTER_H) newPage(ctx)
}

function paragraph(ctx: Ctx, text: string, opts: { font?: PDFFont; size?: number; gap?: number } = {}): void {
  const font = opts.font ?? ctx.body
  const size = opts.size ?? 9.5
  const lineH = size * 1.38
  for (const line of wrap(text, font, size, CONTENT_W)) {
    ensure(ctx, lineH)
    ctx.page.drawText(line, { x: MARGIN, y: ctx.y - size, size, font, color: INK_SOFT })
    ctx.y -= lineH
  }
  ctx.y -= opts.gap ?? 3
}

/** Branded PDF of the verbatim raw findings appendix (browser or server). */
export async function generateTorontoStartupAuditFindingsPdf(): Promise<Uint8Array> {
  const doc = await PDFDocument.create()
  doc.setTitle('Toronto Startup Website Audit 2026 — Raw Findings Appendix')
  doc.setAuthor('Stratezik Digital')
  doc.setSubject('Pattern analysis appendix for the Toronto Startup Website Audit 2026')

  const body = await doc.embedFont(StandardFonts.Helvetica)
  const bodyBold = await doc.embedFont(StandardFonts.HelveticaBold)
  const display = await doc.embedFont(StandardFonts.TimesRomanBold)

  const ctx: Ctx = { doc, page: null as unknown as PDFPage, y: 0, body, bodyBold, display }
  newPage(ctx)

  ctx.page.drawText('STRATEZIK', { x: MARGIN, y: ctx.y - 10, size: 9, font: bodyBold, color: OXBLOOD })
  ctx.y -= 28
  ctx.page.drawText('Raw findings appendix', { x: MARGIN, y: ctx.y - 22, size: 20, font: display, color: INK })
  ctx.y -= 32
  paragraph(ctx, 'Toronto Startup Website Audit 2026 — pattern analysis working document. Verbatim export for researchers and journalists.', {
    size: 10,
    gap: 10,
  })

  for (const block of TORONTO_STARTUP_WEBSITE_AUDIT_2026_FINDINGS_BODY.split(/\n{2,}/)) {
    const trimmed = block.trim()
    if (!trimmed) continue
    if (/^#+\s/.test(trimmed)) {
      const heading = trimmed.replace(/^#+\s*/, '')
      ensure(ctx, 28)
      ctx.y -= 8
      ctx.page.drawText(clean(heading), { x: MARGIN, y: ctx.y - 14, size: 13, font: display, color: INK })
      ctx.y -= 22
      continue
    }
    if (/^>\s/.test(trimmed)) {
      paragraph(ctx, trimmed.replace(/^>\s?/gm, ''), { font: bodyBold, size: 9, gap: 6 })
      continue
    }
    if (/^\|/.test(trimmed)) continue
    if (/^---$/.test(trimmed)) continue
    paragraph(ctx, trimmed, { gap: 6 })
  }

  return doc.save()
}
