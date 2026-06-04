# Google Sheets Auto-Sync Setup Guide

Follow these simple steps to link your website forms directly to your personal Google Sheet for automatic lead logging.

---

### Step 1: Create Your Google Sheet
1. Open your Google Drive and create a new **Google Sheet**.
2. Name it (e.g. `Brand Brick Studio Leads`).

### Step 2: Open Google Apps Script Editor
1. In the top menu of your Google Sheet, click **Extensions** > **Apps Script**.
2. Delete any default code in the editor.

### Step 3: Paste the Script Code
Copy and paste the following code block into the Apps Script editor:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Create headers automatically if sheet is brand new
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Submitted At", "Name", "Email", "Phone", "Country", "Service Requested", "Project Details"]);
    }
    
    // Log details as a new row
    sheet.appendRow([
      data.submittedAt || new Date().toLocaleString(),
      data.name || "",
      data.email || "",
      data.phone || "",
      data.country || "",
      data.service || "",
      data.message || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Step 4: Save & Deploy as a Web App
1. Click the **Save** icon (floppy disk) at the top of the editor.
2. Click the blue **Deploy** button > **New deployment**.
3. Under *Select type*, click the Gear icon and choose **Web app**.
4. Configure these exact settings:
   - **Description**: `Sync website contact form leads`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: `Anyone` *(This is safe because only the website sends formatted JSON here; nobody else knows the URL)*.
5. Click **Deploy**.
6. Google will ask you to **Authorize Access**. Click *Authorize Access*, select your account, click *Advanced* (small text), and click *Go to Untitled project (unsafe)*, then click *Allow*.
7. Copy the **Web App URL** generated in the deployment screen (it starts with `https://script.google.com/macros/s/...`).

---

### Step 5: Add the URL to Vercel
1. Go to your **Vercel Dashboard** and open your project (`Brand-Brick-Studio`).
2. Go to **Settings** > **Environment Variables**.
3. Add a new variable:
   - **Key**: `VITE_GOOGLE_SHEETS_WEBHOOK_URL`
   - **Value**: `[PASTE_YOUR_GOOGLE_WEB_APP_URL_HERE]`
4. Click **Save**.
5. Redeploy your project on Vercel so the environment variable is injected. 

*From now on, every time a lead is submitted on the website, it will instantly appear as a new row in your Google Sheet!*
