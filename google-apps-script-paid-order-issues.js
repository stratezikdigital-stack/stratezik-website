// Google Apps Script for Stratezik "Paid Order Issues"
// Deploy as its OWN web app (separate from the leads / contact scripts).
//
// Writes to the "Paid Order Issues" tab in the Stratezik Leads spreadsheet and
// sends one notification email per issue. Called by the site whenever a paid
// AEO/GBP report is charged but not delivered (see server/payments/alerts.ts).
//
// After editing here: paste into Apps Script -> Save -> Deploy -> New version.
// Set GOOGLE_PAID_ISSUES_WEBHOOK_URL in Vercel to the deployed /exec URL.

var ISSUE_NOTIFICATION_EMAIL = 'stratezikdigital@gmail.com';
var LEADS_SPREADSHEET_URL =
  'https://docs.google.com/spreadsheets/d/1k2EUMWerUGFaxIRGxioI1IVAlJi7xPPDs8grAzrCPnQ/edit';
var PAID_ISSUES_SHEET_NAME = 'Paid Order Issues';

function getLeadsSpreadsheet() {
  return SpreadsheetApp.openByUrl(LEADS_SPREADSHEET_URL);
}

function getOrCreatePaidIssuesSheet() {
  var spreadsheet = getLeadsSpreadsheet();
  var sheet = spreadsheet.getSheetByName(PAID_ISSUES_SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(PAID_ISSUES_SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    var headers = [
      'Timestamp',
      'Product',
      'Email',
      'Amount',
      'Scan / Domain',
      'Stripe Session',
      'Status',
      'Attempts',
      'Last Error',
      'Reason',
      'Resolved?',
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  return sheet;
}

function parseIssueData(e, isPost) {
  if (isPost && e.postData && e.postData.contents) {
    var contents = e.postData.contents;
    if (e.postData.type && e.postData.type.indexOf('application/json') !== -1) {
      return JSON.parse(contents);
    }
    var params = new URLSearchParams(contents);
    return {
      product: params.get('product') || '',
      email: params.get('email') || '',
      amount: params.get('amount') || '',
      scan_or_domain: params.get('scan_or_domain') || '',
      session_id: params.get('session_id') || '',
      status: params.get('status') || '',
      attempts: params.get('attempts') || '',
      last_error: params.get('last_error') || '',
      reason: params.get('reason') || '',
    };
  }
  return {
    product: e.parameter.product || '',
    email: e.parameter.email || '',
    amount: e.parameter.amount || '',
    scan_or_domain: e.parameter.scan_or_domain || '',
    session_id: e.parameter.session_id || '',
    status: e.parameter.status || '',
    attempts: e.parameter.attempts || '',
    last_error: e.parameter.last_error || '',
    reason: e.parameter.reason || '',
  };
}

/** Append a paid-order issue and send one notification email. */
function recordPaidIssue(data) {
  var sheet = getOrCreatePaidIssuesSheet();
  var timestamp = new Date();

  sheet.appendRow([
    timestamp,
    data.product || '',
    data.email || '',
    data.amount || '',
    data.scan_or_domain || '',
    data.session_id || '',
    data.status || '',
    data.attempts || '',
    data.last_error || '',
    data.reason || '',
    'No',
  ]);

  try {
    MailApp.sendEmail({
      to: ISSUE_NOTIFICATION_EMAIL,
      replyTo: data.email || ISSUE_NOTIFICATION_EMAIL,
      subject: '⚠️ Paid but undelivered — ' + (data.product || 'report') + ' — ' + (data.email || 'unknown'),
      body:
        'A customer paid but their report was not delivered. Follow up per the refund/credit policy.\n\n' +
        'Product: ' + (data.product || '(unknown)') + '\n' +
        'Email: ' + (data.email || '(unknown)') + '\n' +
        'Amount: ' + (data.amount || '(unknown)') + '\n' +
        'Scan / domain: ' + (data.scan_or_domain || '(none)') + '\n' +
        'Stripe session: ' + (data.session_id || '(none)') + '\n' +
        'Status: ' + (data.status || '(unknown)') + '\n' +
        'Attempts: ' + (data.attempts || '0') + '\n' +
        'Last error: ' + (data.last_error || '(none)') + '\n' +
        'Reason: ' + (data.reason || '(none)') + '\n' +
        'Received: ' + timestamp + '\n\n' +
        'Next step: retry the unlock, deliver manually, or issue a free re-run credit or full refund in Stripe.',
    });
  } catch (mailError) {
    console.error('Paid issue email failed: ' + mailError.toString());
  }
}

function doGet(e) {
  try {
    recordPaidIssue(parseIssueData(e, false));
    return ContentService.createTextOutput('Paid order issue recorded').setMimeType(
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
    recordPaidIssue(parseIssueData(e, true));
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: 'Paid order issue recorded' }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/** Run once to create headers on the Paid Order Issues tab. */
function setupPaidIssuesSheet() {
  getOrCreatePaidIssuesSheet();
  Logger.log('Paid Order Issues sheet is ready.');
}

/** Run once to authorize MailApp, then redeploy a new web-app version. */
function sendTestEmail() {
  MailApp.sendEmail({
    to: ISSUE_NOTIFICATION_EMAIL,
    subject: 'Stratezik Paid Order Issues — test',
    body: 'If you can read this, paid-order issue notifications are working. ' + new Date(),
  });
  Logger.log('Test email sent to ' + ISSUE_NOTIFICATION_EMAIL);
}
