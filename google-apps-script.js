// Google Apps Script for Stratezik Contact Form
// Deploy this as a web app to receive form submissions.
//
// IMPORTANT: This file is the source of truth, but the live code runs inside
// Google Apps Script. After editing here you MUST paste it into the Apps Script
// project and create a NEW deployment (Deploy -> Manage deployments -> Edit ->
// New version) for changes to take effect on the live site.

// Where new-lead notification emails are sent.
var LEAD_NOTIFICATION_EMAIL = 'stratezikdigital@gmail.com';
var LEADS_SPREADSHEET_URL =
  'https://docs.google.com/spreadsheets/d/1k2EUMWerUGFaxIRGxioI1IVAlJi7xPPDs8grAzrCPnQ/edit';

/** Append a lead to the sheet and send a notification email. */
function recordLead(data) {
  var spreadsheet = SpreadsheetApp.openByUrl(LEADS_SPREADSHEET_URL);
  var sheet = spreadsheet.getActiveSheet();
  var timestamp = new Date();

  sheet.appendRow([
    timestamp,
    data.name,
    data.email,
    data.company,
    data.message,
    data.source || 'Website Form',
  ]);

  // Notify the team of every submission.
  try {
    MailApp.sendEmail({
      to: LEAD_NOTIFICATION_EMAIL,
      replyTo: data.email || LEAD_NOTIFICATION_EMAIL,
      subject: 'New lead from Stratezik website' + (data.name ? ' — ' + data.name : ''),
      body:
        'A new lead was submitted on stratezik.com.\n\n' +
        'Name: ' + (data.name || '(not provided)') + '\n' +
        'Email: ' + (data.email || '(not provided)') + '\n' +
        'Company: ' + (data.company || '(not provided)') + '\n' +
        'Message: ' + (data.message || '(not provided)') + '\n' +
        'Source: ' + (data.source || 'Website Form') + '\n' +
        'Received: ' + timestamp + '\n',
    });
  } catch (mailError) {
    // Don't fail the submission if the email quota/permission hiccups.
    console.error('Lead email failed: ' + mailError.toString());
  }
}

function doPost(e) {
  try {
    var data;
    if (e.postData && e.postData.contents) {
      var params = new URLSearchParams(e.postData.contents);
      data = {
        name: params.get('name') || '',
        email: params.get('email') || '',
        company: params.get('company') || '',
        message: params.get('message') || '',
        source: params.get('source') || 'Website Form',
      };
    } else {
      data = JSON.parse(e.postData.contents);
    }

    recordLead(data);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: 'Form submitted successfully' }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var data = {
      name: e.parameter.name || '',
      email: e.parameter.email || '',
      company: e.parameter.company || '',
      message: e.parameter.message || '',
      source: e.parameter.source || 'Website Form',
    };

    recordLead(data);

    return ContentService.createTextOutput('Form submitted successfully').setMimeType(
      ContentService.MimeType.TEXT,
    );
  } catch (error) {
    return ContentService.createTextOutput('Error: ' + error.toString()).setMimeType(
      ContentService.MimeType.TEXT,
    );
  }
}

/**
 * Run this ONCE from the Apps Script editor (select sendTestEmail -> Run).
 * It does two things:
 *   1) Triggers the Google authorization prompt for the "send email" scope
 *      (MailApp). The web app runs as you, so you must grant this once or
 *      emails are silently skipped even though sheet rows are still written.
 *   2) Sends a test email to confirm delivery (check inbox AND spam).
 * After it succeeds, redeploy: Deploy -> Manage deployments -> Edit (pencil)
 * -> Version: New version -> Deploy.
 */
function sendTestEmail() {
  MailApp.sendEmail({
    to: LEAD_NOTIFICATION_EMAIL,
    subject: 'Stratezik lead notifications — test',
    body: 'If you can read this, lead notification emails are working. ' + new Date(),
  });
  Logger.log('Test email sent to ' + LEAD_NOTIFICATION_EMAIL + '. Remaining daily quota: ' + MailApp.getRemainingDailyQuota());
}

// Setup function to create headers in the sheet
function setupSheet() {
  var spreadsheet = SpreadsheetApp.getActiveSheet
    ? SpreadsheetApp.openByUrl(LEADS_SPREADSHEET_URL)
    : SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();

  var headers = ['Timestamp', 'Name', 'Email', 'Company', 'Message', 'Source'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
}
