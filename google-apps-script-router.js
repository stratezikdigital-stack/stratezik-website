// Stratezik Leads — UNIFIED ROUTER (one web app for ALL lead types)
// ---------------------------------------------------------------------------
// This REPLACES the separate per-product scripts (contact / AEO / GBP /
// growth-credit / ChatGPT / paid-order-issues). Those scripts each defined
// their own doGet/doPost, so putting them in one project made them collide
// (only one handler wins). This single router has ONE doGet + ONE doPost and
// dispatches on a `type` field, so everything lives in one project + one URL.
//
// SETUP (one time):
//   1. Open the Stratezik Leads spreadsheet → Extensions → Apps Script.
//   2. Delete ALL existing .gs files (Code, AEO LEads, credit, ChatGpt Leads,
//      gbp audit, Paid Order Issues) and paste THIS file as the only file.
//   3. Run `setupAllSheets` once (creates/headers every tab).
//   4. Run `sendTestEmail` once and approve the permission prompt.
//   5. Deploy → Manage deployments → Edit (pencil) → Version: New version →
//      Deploy.  Copy the /exec URL.
//   6. In Vercel set GOOGLE_LEADS_WEBHOOK_URL = that /exec URL (Prod + Dev),
//      then redeploy the site. (The old per-product GOOGLE_*_WEBHOOK_URL vars
//      are no longer needed.)
//
// A GET to the /exec URL with ?type=chatgpt&email=test@x.com should return
// "chatgpt lead recorded" and add a row to the ChatGpt Leads tab.

var LEAD_NOTIFICATION_EMAIL = 'stratezikdigital@gmail.com';
var LEADS_SPREADSHEET_URL =
  'https://docs.google.com/spreadsheets/d/1k2EUMWerUGFaxIRGxioI1IVAlJi7xPPDs8grAzrCPnQ/edit';

// tab name + header row for every lead type
var TABS = {
  contact: {
    name: 'Sheet1',
    headers: ['Timestamp', 'Name', 'Email', 'Company', 'Message', 'Source'],
  },
  gbp: {
    name: 'GBP Audit',
    headers: ['Timestamp', 'Name', 'Email', 'Business', 'Score', 'Industry', 'City', 'Source', 'Consent'],
  },
  'growth-credit': {
    name: 'Marketing Credit',
    headers: ['Timestamp', 'First Name', 'Last Name', 'Business Name', 'Email', 'Phone', 'Business Type', 'Source'],
  },
  aeo: {
    name: 'AEO Readiness List',
    headers: ['Timestamp', 'Name', 'Email', 'Domain', 'Score (/20)', 'Group A %', 'Group B %', 'Source', 'Consent'],
  },
  chatgpt: {
    name: 'ChatGpt Leads',
    headers: ['Timestamp', 'First Name', 'Email', 'Vertical', 'Consent', 'Source', 'Delivery Email Sent'],
  },
  'paid-issue': {
    name: 'Paid Order Issues',
    headers: ['Timestamp', 'Product', 'Email', 'Amount', 'Scan / Domain', 'Stripe Session', 'Status', 'Attempts', 'Last Error', 'Reason', 'Resolved?'],
  },
};

function getSpreadsheet() {
  return SpreadsheetApp.openByUrl(LEADS_SPREADSHEET_URL);
}

function getOrCreateTab(key) {
  var cfg = TABS[key];
  var spreadsheet = getSpreadsheet();
  var sheet = spreadsheet.getSheetByName(cfg.name);
  if (!sheet) sheet = spreadsheet.insertSheet(cfg.name);
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, cfg.headers.length).setValues([cfg.headers]);
    sheet.getRange(1, 1, 1, cfg.headers.length).setFontWeight('bold');
  }
  return sheet;
}

// Merge GET query params and POST body (JSON or form-encoded) into one object.
function getParams(e) {
  var p = {};
  if (e && e.parameter) {
    for (var k in e.parameter) p[k] = e.parameter[k];
  }
  if (e && e.postData && e.postData.contents) {
    var c = e.postData.contents;
    if (e.postData.type && e.postData.type.indexOf('application/json') !== -1) {
      try {
        var j = JSON.parse(c);
        for (var jk in j) p[jk] = j[jk];
      } catch (err) {
        /* ignore malformed JSON */
      }
    } else {
      var usp = new URLSearchParams(c);
      usp.forEach(function (v, key) {
        p[key] = v;
      });
    }
  }
  return p;
}

function notify(subject, body, replyTo) {
  try {
    MailApp.sendEmail({
      to: LEAD_NOTIFICATION_EMAIL,
      replyTo: replyTo || LEAD_NOTIFICATION_EMAIL,
      subject: subject,
      body: body,
    });
  } catch (mailError) {
    console.error('Notify email failed: ' + mailError.toString());
  }
}

function recordContact(p) {
  var ts = new Date();
  getOrCreateTab('contact').appendRow([ts, p.name || '', p.email || '', p.company || '', p.message || '', p.source || 'Website Form']);
  notify(
    'New lead from Stratezik website' + (p.name ? ' — ' + p.name : ''),
    'A new lead was submitted on stratezik.com.\n\n' +
      'Name: ' + (p.name || '(not provided)') + '\n' +
      'Email: ' + (p.email || '(not provided)') + '\n' +
      'Company: ' + (p.company || '(not provided)') + '\n' +
      'Message: ' + (p.message || '(not provided)') + '\n' +
      'Source: ' + (p.source || 'Website Form') + '\n' +
      'Received: ' + ts + '\n',
    p.email,
  );
  return 'contact lead recorded';
}

function recordGbp(p) {
  var ts = new Date();
  getOrCreateTab('gbp').appendRow([
    ts, p.name || '', p.email || '', p.domain || '', p.score || '', p.group_a || '', p.group_b || '', p.source || 'gbp-audit', p.consent || '',
  ]);
  notify(
    'GBP Audit lead — ' + (p.domain || p.email || 'unknown'),
    'New GBP Audit lead on stratezik.com/gbp-audit.\n\n' +
      'Name: ' + (p.name || '(not provided)') + '\n' +
      'Email: ' + (p.email || '(not provided)') + '\n' +
      'Business: ' + (p.domain || '(not provided)') + '\n' +
      'Visibility score: ' + (p.score || '(not provided)') + '\n' +
      'Industry: ' + (p.group_a || '(not provided)') + '\n' +
      'City: ' + (p.group_b || '(not provided)') + '\n' +
      'Source: ' + (p.source || 'gbp-audit') + '\n' +
      'Consent: ' + (p.consent || '(not provided)') + '\n' +
      'Received: ' + ts + '\n',
    p.email,
  );
  return 'gbp lead recorded';
}

function recordGrowthCredit(p) {
  var ts = new Date();
  getOrCreateTab('growth-credit').appendRow([
    ts, p.first_name || '', p.last_name || '', p.business || '', p.email || '', p.phone || '', p.business_type || '', p.source || 'growth-credit',
  ]);
  notify(
    'Marketing Credit lead — ' + (p.business || ((String(p.first_name || '') + ' ' + String(p.last_name || '')).trim()) || 'unknown business'),
    'New $3,000 Growth Credit lead on stratezik.com/growth-credit.\n\n' +
      'First name: ' + (p.first_name || '(not provided)') + '\n' +
      'Last name: ' + (p.last_name || '(not provided)') + '\n' +
      'Business: ' + (p.business || '(not provided)') + '\n' +
      'Email: ' + (p.email || '(not provided)') + '\n' +
      'Phone: ' + (p.phone || '(not provided)') + '\n' +
      'Business type: ' + (p.business_type || '(not provided)') + '\n' +
      'Source: ' + (p.source || 'growth-credit') + '\n' +
      'Received: ' + ts + '\n',
    p.email,
  );
  return 'growth-credit lead recorded';
}

function recordAeo(p) {
  var ts = new Date();
  // Sheet logging only — the visitor report email is sent by the site (Resend).
  getOrCreateTab('aeo').appendRow([
    ts, p.name || '', p.email || '', p.domain || '', p.score || '', p.group_a || '', p.group_b || '', p.source || 'aeo-checker', p.consent || '',
  ]);
  return 'aeo lead recorded';
}

function recordChatgpt(p) {
  var ts = new Date();
  getOrCreateTab('chatgpt').appendRow([
    ts, p.first_name || '', p.email || '', p.vertical || '', p.consent || '', p.source || 'chatgpt-ads-cheat-sheet', p.email_sent || '',
  ]);
  notify(
    'ChatGPT Ads cheat sheet lead — ' + (p.email || 'unknown email'),
    'New ChatGPT Ads Cheat Sheet lead on stratezik.com/chatgpt-ads-cheat-sheet.\n\n' +
      'First name: ' + (p.first_name || '(not provided)') + '\n' +
      'Email: ' + (p.email || '(not provided)') + '\n' +
      'Vertical: ' + (p.vertical || '(not provided)') + '\n' +
      'Consent: ' + (p.consent || '(not provided)') + '\n' +
      'Source: ' + (p.source || 'chatgpt-ads-cheat-sheet') + '\n' +
      'Delivery email sent: ' + (p.email_sent || '(unknown)') + '\n' +
      'Received: ' + ts + '\n',
    p.email,
  );
  return 'chatgpt lead recorded';
}

function recordPaidIssue(p) {
  var ts = new Date();
  // No email here — the site already emails this alert via Resend.
  getOrCreateTab('paid-issue').appendRow([
    ts, p.product || '', p.email || '', p.amount || '', p.scan_or_domain || '', p.session_id || '', p.status || '', p.attempts || '', p.last_error || '', p.reason || '', 'No',
  ]);
  return 'paid-order issue recorded';
}

function route(e) {
  var p = getParams(e);
  var type = String(p.type || '').toLowerCase();
  switch (type) {
    case 'contact': return recordContact(p);
    case 'gbp': return recordGbp(p);
    case 'growth-credit': return recordGrowthCredit(p);
    case 'aeo': return recordAeo(p);
    case 'chatgpt': return recordChatgpt(p);
    case 'paid-issue': return recordPaidIssue(p);
    default: throw new Error('Unknown or missing type: "' + type + '"');
  }
}

function doGet(e) {
  try {
    return ContentService.createTextOutput(route(e)).setMimeType(ContentService.MimeType.TEXT);
  } catch (error) {
    return ContentService.createTextOutput('Error: ' + error.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}

function doPost(e) {
  try {
    var msg = route(e);
    return ContentService.createTextOutput(JSON.stringify({ success: true, message: msg })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

/** Run once to create/header every tab. */
function setupAllSheets() {
  for (var key in TABS) getOrCreateTab(key);
  Logger.log('All lead tabs are ready.');
}

/** Run once to authorize MailApp, then redeploy a new web-app version. */
function sendTestEmail() {
  MailApp.sendEmail({
    to: LEAD_NOTIFICATION_EMAIL,
    subject: 'Stratezik Leads router — test',
    body: 'If you can read this, router notification emails are working. ' + new Date(),
  });
  Logger.log('Test email sent to ' + LEAD_NOTIFICATION_EMAIL + '. Remaining daily quota: ' + MailApp.getRemainingDailyQuota());
}
