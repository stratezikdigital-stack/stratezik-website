// Append AEO checker leads via dedicated Apps Script (google-apps-script-aeo-leads.js).
export type AeoLeadSheetRow = {
  email: string
  name?: string
  businessName?: string
  domain: string
  score: number | null
  source: string | null
  consent: boolean
  groupAPct: number | null
  groupBPct: number | null
}

export async function appendAeoLeadToSheet(row: AeoLeadSheetRow): Promise<void> {
  const webhook =
    process.env.GOOGLE_LEADS_WEBHOOK_URL?.trim() ||
    process.env.GOOGLE_AEO_LEADS_WEBHOOK_URL?.trim()
  if (!webhook) {
    console.warn('[aeo/sheets] GOOGLE_LEADS_WEBHOOK_URL not set — skipping sheet sync')
    return
  }

  const params = new URLSearchParams({
    type: 'aeo',
    name: row.name ?? '',
    business: row.businessName ?? '',
    email: row.email,
    domain: row.domain,
    score: row.score === null ? 'unverifiable' : String(row.score),
    source: row.source ?? '',
    consent: row.consent ? 'yes' : 'no',
    group_a: row.groupAPct === null ? '' : String(row.groupAPct),
    group_b: row.groupBPct === null ? '' : String(row.groupBPct),
  })
  try {
    const res = await fetch(`${webhook}?${params.toString()}`, {
      method: 'GET',
      redirect: 'follow',
      signal: AbortSignal.timeout(12000),
    })
    if (!res.ok) {
      console.warn('[aeo/sheets] webhook returned', res.status)
    }
  } catch (err) {
    console.warn('[aeo/sheets] failed to append lead:', err)
  }
}
