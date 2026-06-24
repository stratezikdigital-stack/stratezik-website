// Google Apps Script for Stratezik GBP Audit leads
// Deploy as its OWN web app (separate from contact / AEO / ChatGPT scripts).
//
// Writes to the "GBP Audit" tab in Stratezik Leads spreadsheet.
// After editing here: paste into Apps Script -> Save -> Deploy -> New version.
//
// Set GOOGLE_GBP_LEADS_WEBHOOK_URL in Vercel to the deployed /exec URL.
//
// Sheet logging + one admin notification per submission. Visitor report email
// is sent by the site (Resend) when configured.

var LEAD_NOTIFICATION_EMAIL = 'stratezikdigital@gmail.com';
var LEADS_SPREADSHEET_URL =
  'https://docs.google.com/spreadsheets/d/1k2EUMWerUGFaxIRGxioI1IVAlJi7xPPDs8grAzrCPnQ/edit';
var GBP_AUDIT_SHEET_NAME = 'GBP Audit';

function getLeadsSpreadsheet() {
  return SpreadsheetApp.openByUrl(LEADS_SPREADSHEET_URL);
}

function getOrCreateGbpAuditSheet() {
  var spreadsheet = getLeadsSpreadsheet();
  var sheet = spreadsheet.getSheetByName(GBP_AUDIT_SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(GBP_AUDIT_SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    var headers = [
      'Timestamp',
      'Name',
      'Email',
      'Business',
      'Score',
      'Industry',
      'City',
      'Source',
      'Consent',
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  return sheet;
}

function parseLeadData(e, isPost) {
  if (isPost && e.postData && e.postData.contents) {
    var contents = e.postData.contents;
    if (e.postData.type && e.postData.type.indexOf('application/json') !== -1) {
      return JSON.parse(contents);
    }
    var params = new URLSearchParams(contents);
    return {
      name: params.get('name') || '',
      email: params.get('email') || '',
      domain: params.get('domain') || '',
      score: params.get('score') || '',
      group_a: params.get('group_a') || '',
      group_b: params.get('group_b') || '',
      source: params.get('source') || '',
      consent: params.get('consent') || '',
    };
  }
  return {
    name: e.parameter.name || '',
    email: e.parameter.email || '',
    domain: e.parameter.domain || '',
    score: e.parameter.score || '',
    group_a: e.parameter.group_a || '',
    group_b: e.parameter.group_b || '',
    source: e.parameter.source || '',
    consent: e.parameter.consent || '',
  };
}

/** Append a GBP Audit lead and send one notification email. */
function recordGbpLead(data) {
  var sheet = getOrCreateGbpAuditSheet();
  var timestamp = new Date();

  sheet.appendRow([
    timestamp,
    data.name || '',
    data.email || '',
    data.domain || '',
    data.score || '',
    data.group_a || '',
    data.group_b || '',
    data.source || 'gbp-audit',
    data.consent || '',
  ]);

  try {
    MailApp.sendEmail({
      to: LEAD_NOTIFICATION_EMAIL,
      replyTo: data.email || LEAD_NOTIFICATION_EMAIL,
      subject:
        'GBP Audit lead — ' +
        (data.domain || data.email || 'unknown'),
      body:
        'New GBP Audit lead on stratezik.com/gbp-audit.\n\n' +
        'Name: ' + (data.name || '(not provided)') + '\n' +
        'Email: ' + (data.email || '(not provided)') + '\n' +
        'Business: ' + (data.domain || '(not provided)') + '\n' +
        'Visibility score: ' + (data.score || '(not provided)') + '\n' +
        'Industry: ' + (data.group_a || '(not provided)') + '\n' +
        'City: ' + (data.group_b || '(not provided)') + '\n' +
        'Source: ' + (data.source || 'gbp-audit') + '\n' +
        'Consent: ' + (data.consent || '(not provided)') + '\n' +
        'Received: ' + timestamp + '\n',
    });
  } catch (mailError) {
    console.error('GBP lead email failed: ' + mailError.toString());
  }
}

function doGet(e) {
  try {
    recordGbpLead(parseLeadData(e, false));
    return ContentService.createTextOutput('GBP lead recorded').setMimeType(
      ContentService.MimeType.TEXT,
    );
  } catch (error) {
    return ContentService.createTextOutput('Error: ' + error.toString()).setMimeType(
      ContentService.MimeType.TEXT,
    );
  }
}

function doPost(e) {
  try {
    recordGbpLead(parseLeadData(e, true));
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: 'GBP lead recorded' }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/** Run once to create headers on the GBP Audit tab. */
function setupGbpAuditSheet() {
  getOrCreateGbpAuditSheet();
  Logger.log('GBP Audit sheet is ready.');
}

/**
 * Run once to authorize MailApp, then redeploy a new web-app version.
 */
function sendTestEmail() {
  MailApp.sendEmail({
    to: LEAD_NOTIFICATION_EMAIL,
    subject: 'Stratezik GBP Audit — test',
    body: 'If you can read this, GBP Audit notification emails are working. ' + new Date(),
  });
  Logger.log(
    'Test email sent to ' +
      LEAD_NOTIFICATION_EMAIL +
      '. Remaining daily quota: ' +
      MailApp.getRemainingDailyQuota(),
  );
}
