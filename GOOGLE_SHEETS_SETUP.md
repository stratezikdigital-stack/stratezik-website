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

| Timestamp | Name | Email | Company | Message | Source |
|-----------|------|-------|---------|---------|--------|
| 2024-01-15 10:30:00 | John Doe | john@example.com | ABC Corp | Looking for marketing help | stratezik.com |

## 🔧 **Alternative: Use Formspree (Easier)**

If you prefer a simpler solution:

1. Go to [Formspree](https://formspree.io)
2. Create a free account
3. Create a new form
4. Get your form endpoint URL
5. Replace the fetch URL in your contact form with the Formspree URL
6. Formspree will email you leads and provide a dashboard

## 📧 **Email Notifications**

You can also set up email notifications in Google Apps Script:

```javascript
// Add this to the doPost function after adding to sheet
MailApp.sendEmail({
  to: "your-email@stratezik.com",
  subject: "New Lead from Stratezik Website",
  body: `New lead received:\n\nName: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company}\nMessage: ${data.message}`
});
```

## 🎯 **Benefits of This Setup**

- ✅ **Real-time lead capture** in Google Sheets
- ✅ **Easy to manage** and export data
- ✅ **No third-party dependencies**
- ✅ **Free to use**
- ✅ **Customizable** for your needs
- ✅ **Email notifications** possible
