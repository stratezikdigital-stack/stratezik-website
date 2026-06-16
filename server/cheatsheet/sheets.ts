// Append ChatGPT Ads cheat sheet leads via google-apps-script-chatgpt-leads.js
export type ChatGptLeadSheetRow = {
  email: string
  firstName?: string
  vertical: string | null
  source: string
  consent: boolean
  emailSent: boolean
}

export async function appendChatGptLeadToSheet(row: ChatGptLeadSheetRow): Promise<void> {
  const webhook = process.env.GOOGLE_CHATGPT_LEADS_WEBHOOK_URL?.trim()
  if (!webhook) {
    console.warn('[cheatsheet/sheets] GOOGLE_CHATGPT_LEADS_WEBHOOK_URL not set — skipping sheet sync')
    return
  }

  const params = new URLSearchParams({
    first_name: row.firstName ?? '',
    email: row.email,
    vertical: row.vertical ?? '',
    source: row.source,
    consent: row.consent ? 'yes' : 'no',
    email_sent: row.emailSent ? 'yes' : 'no',
  })
  try {
    const res = await fetch(`${webhook}?${params.toString()}`, {
      method: 'GET',
      redirect: 'follow',
      signal: AbortSignal.timeout(12000),
    })
    if (!res.ok) {
      console.warn('[cheatsheet/sheets] webhook returned', res.status)
    }
  } catch (err) {
    console.warn('[cheatsheet/sheets] failed to append lead:', err)
  }
}
