// Google Apps Script for Stratezik ChatGPT Ads Cheat Sheet leads
// Deploy as its OWN web app (separate from contact / AEO / growth-credit scripts).
//
// Writes to the "ChatGpt Leads" tab in Stratezik Leads spreadsheet.
// After editing here: paste into Apps Script -> Save -> Deploy -> New version.
//
// Set GOOGLE_CHATGPT_LEADS_WEBHOOK_URL in Vercel to the deployed /exec URL.
//
// Sheet logging + one admin notification per submission. Visitor delivery email
// is sent by the site (Resend).

var LEAD_NOTIFICATION_EMAIL = 'stratezikdigital@gmail.com';
var LEADS_SPREADSHEET_URL =
  'https://docs.google.com/spreadsheets/d/1k2EUMWerUGFaxIRGxioI1IVAlJi7xPPDs8grAzrCPnQ/edit';
var CHATGPT_LEADS_SHEET_NAME = 'ChatGpt Leads';

function getLeadsSpreadsheet() {
  return SpreadsheetApp.openByUrl(LEADS_SPREADSHEET_URL);
}

function getOrCreateChatGptLeadsSheet() {
  var spreadsheet = getLeadsSpreadsheet();
  var sheet = spreadsheet.getSheetByName(CHATGPT_LEADS_SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(CHATGPT_LEADS_SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    var headers = [
      'Timestamp',
      'First Name',
      'Email',
      'Vertical',
      'Consent',
      'Source',
      'Delivery Email Sent',
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
      first_name: params.get('first_name') || '',
      email: params.get('email') || '',
      vertical: params.get('vertical') || '',
      consent: params.get('consent') || '',
      source: params.get('source') || '',
      email_sent: params.get('email_sent') || '',
    };
  }
  return {
    first_name: e.parameter.first_name || '',
    email: e.parameter.email || '',
    vertical: e.parameter.vertical || '',
    consent: e.parameter.consent || '',
    source: e.parameter.source || '',
    email_sent: e.parameter.email_sent || '',
  };
}

/** Append a ChatGPT cheat sheet lead and send one notification email. */
function recordChatGptLead(data) {
  var sheet = getOrCreateChatGptLeadsSheet();
  var timestamp = new Date();

  sheet.appendRow([
    timestamp,
    data.first_name || '',
    data.email || '',
    data.vertical || '',
    data.consent || '',
    data.source || 'chatgpt-ads-cheat-sheet',
    data.email_sent || '',
  ]);

  try {
    MailApp.sendEmail({
      to: LEAD_NOTIFICATION_EMAIL,
      replyTo: data.email || LEAD_NOTIFICATION_EMAIL,
      subject:
        'ChatGPT Ads cheat sheet lead — ' +
        (data.email || 'unknown email'),
      body:
        'New ChatGPT Ads Cheat Sheet lead on stratezik.com/chatgpt-ads-cheat-sheet.\n\n' +
        'First name: ' + (data.first_name || '(not provided)') + '\n' +
        'Email: ' + (data.email || '(not provided)') + '\n' +
        'Vertical: ' + (data.vertical || '(not provided)') + '\n' +
        'Consent: ' + (data.consent || '(not provided)') + '\n' +
        'Source: ' + (data.source || 'chatgpt-ads-cheat-sheet') + '\n' +
        'Delivery email sent: ' + (data.email_sent || '(unknown)') + '\n' +
        'Received: ' + timestamp + '\n',
    });
  } catch (mailError) {
    console.error('ChatGPT lead email failed: ' + mailError.toString());
  }
}

function doGet(e) {
  try {
    recordChatGptLead(parseLeadData(e, false));
    return ContentService.createTextOutput('ChatGPT lead recorded').setMimeType(
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
    recordChatGptLead(parseLeadData(e, true));
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: 'ChatGPT lead recorded' }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/** Run once to create headers on the ChatGpt Leads tab. */
function setupChatGptLeadsSheet() {
  getOrCreateChatGptLeadsSheet();
  Logger.log('ChatGpt Leads sheet is ready.');
}

/**
 * Run once to authorize MailApp, then redeploy a new web-app version.
 */
function sendTestEmail() {
  MailApp.sendEmail({
    to: LEAD_NOTIFICATION_EMAIL,
    subject: 'Stratezik ChatGpt Leads — test',
    body: 'If you can read this, ChatGPT cheat sheet notification emails are working. ' + new Date(),
  });
  Logger.log('Test email sent to ' + LEAD_NOTIFICATION_EMAIL + '. Remaining daily quota: ' + MailApp.getRemainingDailyQuota());
}
