// Google Apps Script for Stratezik $3,000 Growth Credit / Marketing Credit leads
// Deploy as its OWN web app (separate from google-apps-script.js and google-apps-script-aeo-leads.js).
//
// Writes to the "Marketing Credit" tab in Stratezik Leads spreadsheet.
// After editing here: paste into Apps Script -> Save -> Deploy -> New version.
//
// Set VITE_GROWTH_CREDIT_WEBHOOK_URL in Vercel (and .env.local for dev) to the deployed /exec URL.
//
// One row + one admin email per submission. Does NOT touch Sheet1 (homepage contact form).

var LEAD_NOTIFICATION_EMAIL = 'stratezikdigital@gmail.com';
var LEADS_SPREADSHEET_URL =
  'https://docs.google.com/spreadsheets/d/1k2EUMWerUGFaxIRGxioI1IVAlJi7xPPDs8grAzrCPnQ/edit';
var GROWTH_CREDIT_SHEET_NAME = 'Marketing Credit';

function getLeadsSpreadsheet() {
  return SpreadsheetApp.openByUrl(LEADS_SPREADSHEET_URL);
}

function getOrCreateGrowthCreditSheet() {
  var spreadsheet = getLeadsSpreadsheet();
  var sheet = spreadsheet.getSheetByName(GROWTH_CREDIT_SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(GROWTH_CREDIT_SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    var headers = [
      'Timestamp',
      'First Name',
      'Last Name',
      'Business Name',
      'Email',
      'Phone',
      'Business Type',
      'Source',
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
      last_name: params.get('last_name') || '',
      business: params.get('business') || '',
      email: params.get('email') || '',
      phone: params.get('phone') || '',
      business_type: params.get('business_type') || '',
      source: params.get('source') || '',
    };
  }
  return {
    first_name: e.parameter.first_name || '',
    last_name: e.parameter.last_name || '',
    business: e.parameter.business || '',
    email: e.parameter.email || '',
    phone: e.parameter.phone || '',
    business_type: e.parameter.business_type || '',
    source: e.parameter.source || '',
  };
}

/** Append a Growth Credit lead and send one notification email. */
function recordGrowthCreditLead(data) {
  var sheet = getOrCreateGrowthCreditSheet();
  var timestamp = new Date();

  sheet.appendRow([
    timestamp,
    data.first_name || '',
    data.last_name || '',
    data.business || '',
    data.email || '',
    data.phone || '',
    data.business_type || '',
    data.source || 'growth-credit',
  ]);

  try {
    MailApp.sendEmail({
      to: LEAD_NOTIFICATION_EMAIL,
      replyTo: data.email || LEAD_NOTIFICATION_EMAIL,
      subject:
        'Marketing Credit lead — ' +
        (data.business ||
          (String(data.first_name || '') + ' ' + String(data.last_name || '')).trim() ||
          'unknown business'),
      body:
        'New $3,000 Growth Credit lead on stratezik.com/growth-credit.\n\n' +
        'First name: ' + (data.first_name || '(not provided)') + '\n' +
        'Last name: ' + (data.last_name || '(not provided)') + '\n' +
        'Business: ' + (data.business || '(not provided)') + '\n' +
        'Email: ' + (data.email || '(not provided)') + '\n' +
        'Phone: ' + (data.phone || '(not provided)') + '\n' +
        'Business type: ' + (data.business_type || '(not provided)') + '\n' +
        'Source: ' + (data.source || 'growth-credit') + '\n' +
        'Received: ' + timestamp + '\n',
    });
  } catch (mailError) {
    console.error('Growth credit lead email failed: ' + mailError.toString());
  }
}

function doGet(e) {
  try {
    recordGrowthCreditLead(parseLeadData(e, false));
    return ContentService.createTextOutput('Growth credit lead recorded').setMimeType(
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
    recordGrowthCreditLead(parseLeadData(e, true));
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: 'Growth credit lead recorded' }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/** Run once to create headers on the Marketing Credit tab. */
function setupMarketingCreditSheet() {
  getOrCreateGrowthCreditSheet();
  Logger.log('Marketing Credit sheet is ready.');
}

/**
 * Run once to authorize MailApp, then redeploy a new web-app version.
 */
function sendTestEmail() {
  MailApp.sendEmail({
    to: LEAD_NOTIFICATION_EMAIL,
    subject: 'Stratezik Marketing Credit leads — test',
    body: 'If you can read this, Marketing Credit notification emails are working. ' + new Date(),
  });
  Logger.log('Test email sent to ' + LEAD_NOTIFICATION_EMAIL + '. Remaining daily quota: ' + MailApp.getRemainingDailyQuota());
}
