# Google Sheets Synced Deletion & Notifications Setup

To make Google Sheets automatically **delete the row** when you delete an inquiry in your Admin Panel, we use a single Google Apps Script deployed as a Web App in your Google Account.

This script does **everything** for you:
1. Receives form submissions from the website and appends them to your Google Sheet.
2. Sends instant custom email alerts to all addresses in your `Recipients` sheet.
3. Finds and deletes the matching row from your Google Sheet when you delete it from the Admin panel.

---

### Step 1: Prepare Your Google Sheet
1. Open your linked Google Sheet.
2. Click the **`+` icon** at the bottom-left corner to create a new tab.
3. Rename this tab to **`Recipients`**.
4. In Column A, write the email addresses you want to notify (one email per row, e.g. `your-email@gmail.com`).

---

### Step 2: Paste the Sync Script
1. In the top menu of your Google Sheet, click **Extensions** > **Apps Script**.
2. Delete any existing code and paste this script:

```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Locate the responses/leads sheet (look for form responses tab, or Sheet1, or fallback to first sheet that isn't Recipients)
    var sheet = activeSpreadsheet.getSheetByName("Form Responses 1") || 
                activeSpreadsheet.getSheetByName("Sheet1") || 
                activeSpreadsheet.getSheets().filter(function(s) { return s.getName() !== "Recipients"; })[0] ||
                activeSpreadsheet.getActiveSheet();
    
    // ACTION 1: ADD ROW
    if (data.action === "add") {
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(["Submitted At", "Name", "Email", "Phone", "Country", "Service Requested", "Project Details"]);
      }
      sheet.appendRow([
        data.submittedAt || new Date().toLocaleString(),
        data.name || "",
        data.email || "",
        data.phone || "",
        data.country || "",
        data.service || "",
        data.message || ""
      ]);
      
      // Trigger notifications
      sendNotifications(data, activeSpreadsheet);
      
      return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // ACTION 2: DELETE ROW
    if (data.action === "delete") {
      var emailToDelete = data.email;
      var nameToDelete = data.name;
      var lastRow = sheet.getLastRow();
      
      if (lastRow > 1) {
        // Read headers row to locate Name and Email columns dynamically
        var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
        var nameColIdx = -1;
        var emailColIdx = -1;
        
        for (var col = 0; col < headers.length; col++) {
          var headerName = headers[col].toString().toLowerCase().trim();
          if (headerName.indexOf("name") !== -1 || headerName.indexOf("naam") !== -1) {
            nameColIdx = col;
          }
          if (headerName.indexOf("email") !== -1 || headerName.indexOf("mail") !== -1) {
            emailColIdx = col;
          }
        }
        
        // Only run delete loop if we found both Name and Email columns
        if (nameColIdx !== -1 && emailColIdx !== -1) {
          var range = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn());
          var values = range.getValues();
          
          for (var i = values.length - 1; i >= 0; i--) {
            var rowName = values[i][nameColIdx];
            var rowEmail = values[i][emailColIdx];
            
            if (rowEmail && rowName && 
                rowEmail.toString().trim().toLowerCase() === emailToDelete.toString().trim().toLowerCase() && 
                rowName.toString().trim().toLowerCase() === nameToDelete.toString().trim().toLowerCase()) {
              sheet.deleteRow(i + 2); // Row index is 1-based, adjusted for headers
              break;
            }
          }
        }
      }
      return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendNotifications(data, spreadsheet) {
  try {
    var recipientSheet = spreadsheet.getSheetByName("Recipients");
    var emailsList = [];
    
    if (recipientSheet) {
      var lastRow = recipientSheet.getLastRow();
      if (lastRow > 0) {
        var range = recipientSheet.getRange(1, 1, lastRow, 1);
        var rValues = range.getValues();
        for (var i = 0; i < rValues.length; i++) {
          var mail = rValues[i][0].toString().trim();
          if (mail && mail.indexOf("@") !== -1) {
            emailsList.push(mail);
          }
        }
      }
    }
    
    if (emailsList.length === 0) {
      emailsList.push(Session.getActiveUser().getEmail());
    }
    
    var recipients = emailsList.join(",");
    var subject = "🔥 New Lead Submitted: " + data.name + " (" + data.service + ")";
    var body = "Hi,\n\n" +
               "A new lead has been submitted on the Brand Brick Studio website:\n\n" +
               "👤 Name: " + data.name + "\n" +
               "📧 Email: " + data.email + "\n" +
               "📞 Phone: " + data.phone + "\n" +
               "🌍 Country: " + data.country + "\n" +
               "💼 Service: " + data.service + "\n" +
               "📝 Message:\n" + data.message + "\n\n" +
               "Submitted At: " + (data.submittedAt || new Date().toLocaleString()) + "\n\n" +
               "Link to Sheet: " + spreadsheet.getUrl();
               
    MailApp.sendEmail(recipients, subject, body);
  } catch (err) {
    Logger.log("Notification error: " + err.toString());
  }
}
```

3. Click the **Save** icon (floppy disk) at the top of the editor.

---

### Step 3: Save & Deploy as a Web App
1. Click the blue **Deploy** button > **New deployment**.
2. Click the gear icon next to *Select type* and choose **Web app**.
3. Set the following options:
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: `Anyone`
4. Click **Deploy**.
5. Click **Authorize access**, select your account, click *Advanced*, click *Go to Untitled project (unsafe)*, and click *Allow*.
6. Copy the generated **Web App URL** (starts with `https://script.google.com/macros/s/.../exec`).

---

### Step 4: Link in your Admin Panel
1. Open your website's `/admin` panel (vault code `396230`).
2. Paste the Web App URL in the **🟢 Google Sheets Web App URL** input box.
3. Click **Save Settings**.

Now, whenever you delete an entry from your website's admin center, it will be deleted from your Google Sheet in real-time!
