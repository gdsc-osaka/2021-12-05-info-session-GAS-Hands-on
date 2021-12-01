function sendEmails(){
    //ActiveのSpreadsheetの「Emails」というSheetを取得します。　「Emails」の情報をssという変数に入れます。
    var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Emails");
  
    var lr = ss.getLastRow();　//列数
    Logger.log(lr);　//列数をlogに出力
  
    //「Template」の１行1列の値を取得します。
    var templateText = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Template").getRange(1, 1).getValue();
    
    //本日残った送信可能なメール数を取得します。Gmailが毎日送信可能なメールの数は100です。
    var quotaLeft = MailApp.getRemainingDailyQuota();
    Logger.log(quotaLeft) //残ったメール数のチェック。
    
    if ((lr-1) > quotaLeft){
      Logger.log("You have " + quotaLeft + " left and you're tring to send " + (lr-1) + " emails. Emails were not sent.");
    } else{
      for (var i=2;i<=lr;i++){
  
        var currentEmail = ss.getRange(i, 1).getValue();
        var currentClassTitle = ss.getRange(i, 3).getValue();
        var currentName = ss.getRange(i,2).getValue();
  
        var messageBody = templateText.replace("{name}", currentName).replace("{title}", currentClassTitle);
        
        Logger.log(messageBody);
  
        //MailApp.sendEmail(currentEmail, "Reminder: " + currentClassTitle + "Upcoming Class", messageBody);　//送信
    
      } //close for statement
    
    } //close else statement

  }