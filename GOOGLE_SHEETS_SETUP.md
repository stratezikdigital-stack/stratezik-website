# Google Sheets Integration Setup Guide

## 🎯 **How to Set Up Lead Capture in Google Sheets**

### **Step 1: Create Google Sheet**
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Stratezik Leads" or similar
4. The first row will automatically get headers when you deploy the script

### **Step 2: Create Google Apps Script**
1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Replace the default code with the content from `google-apps-script.js`
4. Save the project as "Stratezik Contact Form"

### **Step 3: Connect to Your Google Sheet**
1. In the Apps Script editor, click on "Resources" → "Advanced Google Services"
2. Enable "Google Sheets API"
3. Go back to your Google Sheet and copy its URL
4. In Apps Script, replace `SpreadsheetApp.getActiveSpreadsheet()` with:
   ```javascript
   SpreadsheetApp.openByUrl('YOUR_GOOGLE_SHEET_URL_HERE')
   ```

### **Step 4: Deploy as Web App**
1. Click "Deploy" → "New deployment"
2. Choose "Web app"
3. Set "Execute as" to "Me"
4. Set "Who has access" to "Anyone"
5. Click "Deploy"
6. **Copy the Web App URL** - this is your webhook URL

### **Step 5: Update Your Website**
1. In `src/components/ContactSection.tsx`
2. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your actual webhook URL
3. Commit and push to GitHub
4. Vercel will automatically redeploy

### **Step 6: Test the Integration**
1. Fill out the contact form on your website
2. Submit the form
3. Check your Google Sheet - you should see a new row with the lead data

## 📊 **What You'll See in Google Sheets**

### Contact form (Sheet1)

| Timestamp | Name | Email | Company | Message | Source |
|-----------|------|-------|---------|---------|--------|
| 2024-01-15 10:30:00 | John Doe | john@example.com | ABC Corp | Looking for marketing help | stratezik.com |

### AEO Readiness Checker (`AEO Readiness List` tab)

Uses a **separate** Apps Script project (`google-apps-script-aeo-leads.js`) so contact-form and AEO issues are easy to isolate.

| Timestamp | Name | Email | Domain | Score (/20) | Group A % | Group B % | Source | Consent |
|-----------|------|-------|--------|-------------|-----------|-----------|--------|---------|

#### AEO setup (one-time)

1. [Google Apps Script](https://script.google.com) → **New project** → name it **Stratezik AEO Leads**
2. Paste `google-apps-script-aeo-leads.js` → **Save**
3. Run **`setupAeoReadinessSheet`** once (optional — headers are created on first lead)
4. Run **`sendTestEmail`** once and approve MailApp permissions
5. **Deploy → New deployment → Web app** (Execute as: Me, Access: Anyone) → copy the `/exec` URL
6. Add to Vercel (Production + Development): `GOOGLE_AEO_LEADS_WEBHOOK_URL` = that URL
7. Redeploy the site; submit a test lead on `/aeo-checker` and confirm the row appears

If AEO rows stop appearing, check **Stratezik AEO Leads** in Apps Script (not the contact-form project).

### GBP Audit (`GBP Audit` tab)

Uses a **separate** Apps Script project (`google-apps-script-gbp-leads.js`).

| Timestamp | Name | Email | Business | Score | Industry | City | Source | Consent |
|-----------|------|-------|----------|-------|----------|------|--------|---------|

#### GBP Audit setup (one-time)

1. [Google Apps Script](https://script.google.com) → **New project** → name it **Stratezik GBP Audit Leads**
2. Paste `google-apps-script-gbp-leads.js` → **Save**
3. Run **`setupGbpAuditSheet`** once (creates/headers the **GBP Audit** tab — rename an existing empty tab to match if needed)
4. Run **`sendTestEmail`** once and approve MailApp permissions
5. **Deploy → New deployment → Web app** (Execute as: Me, Access: Anyone) → copy the `/exec` URL
6. Add to Vercel (Production + Development): `GOOGLE_GBP_LEADS_WEBHOOK_URL` = that URL
7. Redeploy the site; submit a test email unlock on `/gbp-audit` and confirm the row appears on **GBP Audit** plus notification email to **stratezikdigital@gmail.com**

### ChatGPT Ads Cheat Sheet (`ChatGpt Leads` tab)

Uses a **separate** Apps Script project (`google-apps-script-chatgpt-leads.js`).

| Timestamp | First Name | Email | Vertical | Consent | Source | Delivery Email Sent |
|-----------|------------|-------|----------|---------|--------|---------------------|

#### ChatGPT cheat sheet setup (one-time)

1. [Google Apps Script](https://script.google.com) → **New project** → name it **Stratezik ChatGpt Leads**
2. Paste `google-apps-script-chatgpt-leads.js` → **Save**
3. Run **`setupChatGptLeadsSheet`** once (creates/headers the **ChatGpt Leads** tab — rename an existing empty tab to match if needed)
4. Run **`sendTestEmail`** once and approve MailApp permissions
5. **Deploy → New deployment → Web app** (Execute as: Me, Access: Anyone) → copy the `/exec` URL
6. Add to Vercel (Production + Development): `GOOGLE_CHATGPT_LEADS_WEBHOOK_URL` = that URL
7. Redeploy the site; submit a test on `/chatgpt-ads-cheat-sheet` and confirm the row appears on **ChatGpt Leads**

### $3,000 Growth Credit (`Marketing Credit` tab)

Uses a **separate** Apps Script project (`google-apps-script-growth-credit.js`). Does **not** write to Sheet1 or duplicate contact-form emails.

| Timestamp | First Name | Last Name | Business Name | Email | Phone | Business Type | Source |
|-----------|------------|-----------|---------------|-------|-------|---------------|--------|

#### Growth Credit setup (one-time)

1. [Google Apps Script](https://script.google.com) → **New project** → name it **Stratezik Growth Credit Leads**
2. Paste `google-apps-script-growth-credit.js` → **Save**
3. Run **`setupMarketingCreditSheet`** once (creates/headers the **Marketing Credit** tab — rename an existing empty tab to match if needed)
4. Run **`sendTestEmail`** once and approve MailApp permissions
5. **Deploy → New deployment → Web app** (Execute as: Me, Access: Anyone) → copy the `/exec` URL
6. Add to Vercel (Production, Preview, Development): `GOOGLE_GROWTH_CREDIT_WEBHOOK_URL` = that URL (server-only — do **not** use `VITE_` prefix)
7. For local dev, add the same to `.env.local` in the project root
8. Redeploy; submit a test on `/growth-credit` and confirm the row appears only on **Marketing Credit**

### Paid Order Issues (`Paid Order Issues` tab)

Alerts you when a customer **pays** for an AEO or GBP report but it is **not delivered** (generation failed, or they never returned to the results page). Uses a **separate** Apps Script project (`google-apps-script-paid-order-issues.js`).

| Timestamp | Product | Email | Amount | Scan / Domain | Stripe Session | Status | Attempts | Last Error | Reason | Resolved? |
|-----------|---------|-------|--------|---------------|----------------|--------|----------|------------|--------|-----------|

#### Paid Order Issues setup (one-time)

1. [Google Apps Script](https://script.google.com) → **New project** → name it **Stratezik Paid Order Issues**
2. Paste `google-apps-script-paid-order-issues.js` → **Save**
3. Run **`setupPaidIssuesSheet`** once (creates/headers the **Paid Order Issues** tab)
4. Run **`sendTestEmail`** once and approve MailApp permissions
5. **Deploy → New deployment → Web app** (Execute as: Me, Access: Anyone) → copy the `/exec` URL
6. Add to Vercel (Production + Development): `GOOGLE_PAID_ISSUES_WEBHOOK_URL` = that URL
7. Redeploy the site. You can force a test alert by hitting `/api/reconcile-orders` after inserting a fake undelivered row, or just wait for the next real failure.

## 💳 **Paid order failure monitoring (full setup)**

This protects paid AEO/GBP reports so you're notified whenever a customer is charged but the report isn't delivered — then you can retry, deliver manually, or issue a credit/refund. Pieces:

1. **Supabase table** — run `supabase/paid_orders.sql` in the Supabase SQL editor (Dashboard → SQL). This is the ledger of every paid order and whether it was delivered.
2. **Stripe webhook** — in the [Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/webhooks): **Add endpoint** = `https://www.stratezik.com/api/stripe-webhook`, listen for **`checkout.session.completed`**. Copy the **Signing secret** (`whsec_…`) and add it to Vercel as `STRIPE_WEBHOOK_SECRET`. This records every payment even if the customer never returns to the site.
3. **Alerts** — set `GOOGLE_PAID_ISSUES_WEBHOOK_URL` (above) and `RESEND_API_KEY` so failures email you and log to the sheet. Optional: `PAID_ISSUES_EMAIL` (defaults to stratezikdigital@gmail.com), `PAID_ISSUES_FROM_EMAIL`.
4. **Reconciliation cron** — already configured in `vercel.json` (`/api/reconcile-orders`, daily). Set `CRON_SECRET` in Vercel so only Vercel Cron can trigger it. It flags any paid order still undelivered after 15 minutes. (Sub-daily schedules require a Vercel Pro plan; the inline failure alert fires immediately regardless.)
5. **Consent** — the AEO and GBP checkout forms now require ticking the **Terms & Refund Policy** (Privacy Notice §17) before payment; consent + timestamp are stored on the order.

## 🔧 **Alternative: Use Formspree (Easier)**

If you prefer a simpler solution:

1. Go to [Formspree](https://formspree.io)
2. Create a free account
3. Create a new form
4. Get your form endpoint URL
5. Replace the fetch URL in your contact form with the Formspree URL
6. Formspree will email you leads and provide a dashboard

## 📧 **Email Notifications (built in)**

`google-apps-script.js` now emails every submission to **stratezikdigital@gmail.com**
via the shared `recordLead()` function (used by both `doGet` and `doPost`). The
`replyTo` is set to the lead's email so you can reply directly from the notification.

To change the recipient, edit `LEAD_NOTIFICATION_EMAIL` at the top of the script.

### ⚠️ Emails not arriving but the sheet still updates?

This is the #1 gotcha. The sheet updating means the script runs — but the live
web app is almost certainly serving an **old deployed version** (no email code),
or the **send-email permission was never granted**. Do these in order:

1. **Paste** the latest `google-apps-script.js` into the Apps Script project and **Save**.
2. **Authorize email:** in the editor, select the function **`sendTestEmail`** in the
   toolbar dropdown and click **Run**. Approve the Google consent screen (it now asks
   for "Send email as you"). Confirm a test email lands at **stratezikdigital@gmail.com**
   (check Spam too).
3. **Redeploy a new version:** **Deploy → Manage deployments → Edit (pencil icon) →
   Version: _New version_ → Deploy.** Saving alone does NOT update the live `/exec`
   URL — you must publish a new version. The URL stays the same, so no website change.
4. Submit the live form once and confirm both the sheet row **and** the email.

To change the recipient, edit `LEAD_NOTIFICATION_EMAIL` at the top of the script,
then repeat steps 2–3.

## 🎯 **Benefits of This Setup**

- ✅ **Real-time lead capture** in Google Sheets
- ✅ **Easy to manage** and export data
- ✅ **No third-party dependencies**
- ✅ **Free to use**
- ✅ **Customizable** for your needs
- ✅ **Email notifications** possible
