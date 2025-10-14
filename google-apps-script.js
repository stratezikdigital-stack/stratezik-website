// Google Apps Script for Stratezik Contact Form
// Deploy this as a web app to receive form submissions

function doPost(e) {
  try {
    // Handle FormData (URL-encoded data)
    let data;
    if (e.postData && e.postData.contents) {
      // Parse URL-encoded data from FormData
      const params = new URLSearchParams(e.postData.contents);
      data = {
        name: params.get('name') || '',
        email: params.get('email') || '',
        company: params.get('company') || '',
        message: params.get('message') || '',
        source: params.get('source') || 'Website Form'
      };
    } else {
      // Fallback for JSON data
      data = JSON.parse(e.postData.contents);
    }
    
    // Get the spreadsheet by URL
    const spreadsheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1k2EUMWerUGFaxIRGxioI1IVAlJi7xPPDs8grAzrCPnQ/edit');
    const sheet = spreadsheet.getActiveSheet();
    
    // Get current timestamp
    const timestamp = new Date();
    
    // Prepare row data
    const rowData = [
      timestamp,           // Timestamp
      data.name,          // Name
      data.email,         // Email
      data.company,       // Company
      data.message,       // Message
      data.source || 'Website Form' // Source
    ];
    
    // Add data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Form submitted successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle GET requests (for testing)
  return ContentService
    .createTextOutput('Stratezik Contact Form Webhook is running')
    .setMimeType(ContentService.MimeType.TEXT);
}

// Setup function to create headers in the sheet
function setupSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getActiveSheet();
  
  // Set up headers
  const headers = [
    'Timestamp',
    'Name', 
    'Email',
    'Company',
    'Message',
    'Source'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
}
