export type GbpLeadSheetRow = {
  email: string
  name?: string
  businessName: string
  city: string
  score: number | null
  source: string | null
  consent: boolean
  industry: string
}

export async function appendGbpLeadToSheet(row: GbpLeadSheetRow): Promise<void> {
  const webhook =
    process.env.GOOGLE_LEADS_WEBHOOK_URL?.trim() ||
    process.env.GOOGLE_GBP_LEADS_WEBHOOK_URL?.trim() ||
    process.env.GOOGLE_AEO_LEADS_WEBHOOK_URL?.trim()
  if (!webhook) {
    console.warn('[gbp/sheets] no sheet webhook configured — skipping sheet sync')
    return
  }

  const params = new URLSearchParams({
    name: row.name ?? '',
    email: row.email,
    domain: `${row.businessName} · ${row.city}`,
    score: row.score === null ? '' : String(row.score),
    source: row.source ?? 'gbp-audit',
    consent: row.consent ? 'yes' : 'no',
    group_a: row.industry,
    group_b: row.city,
  })
  try {
    const res = await fetch(`${webhook}?${params.toString()}`, {
      method: 'GET',
      redirect: 'follow',
      signal: AbortSignal.timeout(12000),
    })
    if (!res.ok) console.warn('[gbp/sheets] webhook returned', res.status)
  } catch (err) {
    console.warn('[gbp/sheets] failed to append lead:', err)
  }
}
