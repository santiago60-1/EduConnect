function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var email = data.email;
    var subject = data.subject;
    var htmlBody = data.htmlBody; // Ahora esperamos htmlBody
    
    if (!email || !subject || !htmlBody) {
      return ContentService.createTextOutput(JSON.stringify({
        "status": "error",
        "message": "Missing fields"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: htmlBody // Usamos htmlBody para enviar HTML
    });
    
    return ContentService.createTextOutput(JSON.stringify({
      "status": "success",
      "message": "Email sent to " + email
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      "status": "error",
      "message": error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
