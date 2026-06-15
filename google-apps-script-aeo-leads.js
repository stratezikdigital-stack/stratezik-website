// Google Apps Script for Stratezik AEO Readiness Checker leads
// Deploy as its OWN web app (separate project from google-apps-script.js).
//
// Writes to the "AEO Readiness List" tab in Stratezik Leads spreadsheet.
// After editing here: paste into Apps Script -> Save -> Deploy -> New version.
//
// Set GOOGLE_AEO_LEADS_WEBHOOK_URL in Vercel to the deployed /exec URL.
//
// Sheet logging only — the visitor report email is sent by the site (Resend).
// Contact-form leads still use google-apps-script.js for new-lead notifications.

var LEADS_SPREADSHEET_URL =
  'https://docs.google.com/spreadsheets/d/1k2EUMWerUGFaxIRGxioI1IVAlJi7xPPDs8grAzrCPnQ/edit';
var AEO_SHEET_NAME = 'AEO Readiness List';

function getLeadsSpreadsheet() {
  return SpreadsheetApp.openByUrl(LEADS_SPREADSHEET_URL);
}

function getOrCreateAeoSheet() {
  var spreadsheet = getLeadsSpreadsheet();
  var sheet = spreadsheet.getSheetByName(AEO_SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(AEO_SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    var headers = [
      'Timestamp',
      'Name',
      'Email',
      'Domain',
      'Score (/20)',
      'Group A %',
      'Group B %',
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

/** Append an AEO Readiness Checker lead to the spreadsheet. */
function recordAeoLead(data) {
  var sheet = getOrCreateAeoSheet();
  var timestamp = new Date();

  sheet.appendRow([
    timestamp,
    data.name || '',
    data.email || '',
    data.domain || '',
    data.score || '',
    data.group_a || '',
    data.group_b || '',
    data.source || 'aeo-checker',
    data.consent || '',
  ]);
}

function doGet(e) {
  try {
    recordAeoLead(parseLeadData(e, false));
    return ContentService.createTextOutput('AEO lead recorded').setMimeType(
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
    recordAeoLead(parseLeadData(e, true));
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: 'AEO lead recorded' }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/** Run once to create headers on the AEO Readiness List tab. */
function setupAeoReadinessSheet() {
  getOrCreateAeoSheet();
  Logger.log('AEO Readiness List sheet is ready.');
}

