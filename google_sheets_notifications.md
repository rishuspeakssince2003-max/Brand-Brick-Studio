# Google Sheets Instant Phone Notifications Setup

To get a push notification on your phone immediately whenever a lead is submitted, and to send these alerts to **multiple emails** of your choice for free, you can add a simple Apps Script inside your Google Sheet.

Here is how you can set it up in 2 minutes:

---

### Step 1: Prepare Your Google Sheet
1. Open your linked Google Sheet.
2. Click the **`+` icon** at the bottom-left corner of the sheet to create a new tab.
3. Rename this new tab to **`Recipients`**.
4. In Column A, write the email addresses you want to notify (one email address per row, e.g.):
   * A1: `your-email@gmail.com`
   * A2: `partner-email@gmail.com`
   * A3: `admin-email@gmail.com`

---

### Step 2: Paste the Notification Script
1. In the top menu of your Google Sheet, click **Extensions** > **Apps Script**.
2. Delete any existing code and paste this script:

```javascript
function onFormSubmitTrigger(e) {
  try {
    var values = e.values; 
    if (!values) return;

    var timestamp = values[0];
    var name = values[1];
    var email = values[2];
    var phone = values[3];
    var country = values[4];
    var service = values[5];
    var message = values[6];
    
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var recipientSheet = spreadsheet.getSheetByName("Recipients");
    var emailsList = [];
    
    // Read emails from column A of the "Recipients" sheet
    if (recipientSheet) {
      var lastRow = recipientSheet.getLastRow();
      if (lastRow > 0) {
        var range = recipientSheet.getRange(1, 1, lastRow, 1);
        var data = range.getValues();
        for (var i = 0; i < data.length; i++) {
          var mail = data[i][0].toString().trim();
          if (mail && mail.indexOf("@") !== -1) {
            emailsList.push(mail);
          }
        }
      }
    }
    
    // Fallback: If "Recipients" sheet is empty, notify the spreadsheet owner
    if (emailsList.length === 0) {
      emailsList.push(Session.getActiveUser().getEmail());
    }
    
    var recipients = emailsList.join(",");
    
    // Customize the notification email
    var subject = "🔥 New Lead Submitted: " + name + " (" + service + ")";
    var body = "Hi,\n\n" +
               "A new client lead has been submitted on the Brand Brick Studio website:\n\n" +
               "👤 Name: " + name + "\n" +
               "📧 Email: " + email + "\n" +
               "📞 Phone: " + phone + "\n" +
               "🌍 Country: " + country + "\n" +
               "💼 Service: " + service + "\n" +
               "📝 Message:\n" + message + "\n\n" +
               "Submitted At: " + timestamp + "\n\n" +
               "Link to Sheet: " + spreadsheet.getUrl();
               
    MailApp.sendEmail(recipients, subject, body);
    
  } catch (error) {
    Logger.log("Error sending notification: " + error.toString());
  }
}
```
3. Click the **Save** icon (floppy disk) at the top of the Apps Script page.

---

### Step 3: Setup the Submission Trigger
1. On the left sidebar of the Apps Script screen, click the **Triggers** icon (looks like a clock ⏰).
2. Click the blue **`+ Add Trigger`** button at the bottom-right corner.
3. Configure the trigger with these exact settings:
   - **Choose which function to run**: `onFormSubmitTrigger`
   - **Choose which deployment should run**: `Head`
   - **Select event source**: `From spreadsheet`
   - **Select event type**: `On form submit`
4. Click **Save**. 
5. Google will ask you to authorize permissions. Click *Authorize*, select your account, click *Advanced* (small text), click *Go to Untitled project (unsafe)*, and click *Allow*.

---

### How it works:
* As soon as a lead is submitted, Google Sheets triggers the script.
* The script reads the emails you listed in the **Recipients** tab and emails them the lead details instantly.
* Since you have Gmail/Mail apps on your phone, you and your partners will receive an **instant push notification** on your phones!
