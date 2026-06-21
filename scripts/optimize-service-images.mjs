/**
 * Compress service hero PNGs and emit WebP + AVIF siblings.
 * Run: node scripts/optimize-service-images.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const servicesDir = path.resolve(__dirname, '../public/services')
const MAX_WIDTH = 1400

const pngFiles = fs.readdirSync(servicesDir).filter((f) => f.endsWith('.png'))

if (pngFiles.length === 0) {
  console.error('No PNG files found in public/services/')
  process.exit(1)
}

let totalBefore = 0
let totalAfter = 0

for (const file of pngFiles) {
  const inputPath = path.join(servicesDir, file)
  const base = file.replace(/\.png$/, '')
  const before = fs.statSync(inputPath).size
  totalBefore += before

  const image = sharp(inputPath).rotate().resize({ width: MAX_WIDTH, withoutEnlargement: true })

  const pngBuffer = await image
    .clone()
    .png({ compressionLevel: 9, palette: true, quality: 85, effort: 10 })
    .toBuffer()

  const webpBuffer = await image.clone().webp({ quality: 82, effort: 6 }).toBuffer()
  const avifBuffer = await image.clone().avif({ quality: 55, effort: 6 }).toBuffer()

  fs.writeFileSync(inputPath, pngBuffer)
  fs.writeFileSync(path.join(servicesDir, `${base}.webp`), webpBuffer)
  fs.writeFileSync(path.join(servicesDir, `${base}.avif`), avifBuffer)

  const after = pngBuffer.length + webpBuffer.length + avifBuffer.length
  totalAfter += after

  console.log(
    `${base}: PNG ${(before / 1024).toFixed(0)}KiB → PNG ${(pngBuffer.length / 1024).toFixed(0)}KiB, WebP ${(webpBuffer.length / 1024).toFixed(0)}KiB, AVIF ${(avifBuffer.length / 1024).toFixed(0)}KiB`,
  )
}

console.log(
  `\nTotal: ${(totalBefore / 1024 / 1024).toFixed(1)}MiB source PNGs → ${(totalAfter / 1024 / 1024).toFixed(1)}MiB across all formats`,
)
