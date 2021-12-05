function canSendAllEmail(numEntry){
    // 今日送信可能なメールの残数を取得 
    // NOTE: Gmailが毎日送信可能なメールの数は100
    let emailQuotaRemaining = MailApp.getRemainingDailyQuota();
    Logger.log("本日送信可能メール数:", emailQuotaRemaining);
  
    if (numEntry < emailQuotaRemaining){
      return true;
    } 
    return false;
  }
  
  function sendEmails(){
    // B1: 本文のテンプレートを取得 (シート "Template" の１行目1列目の値)
    var template = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Template").getRange(1, 1).getValue();
    Logger.log("本文のテンプレート: %s", template);
    
    // B2: シート "Emails" を取得
    var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Emails"); // シート"Emails" を示す変数
  
    // B2: 登録されているメールが送れるか確認
    // NOTE: ss.getLastRow(): シートに記入されている行数を取得。Header分の1を引く。
    var numEntry = ss.getLastRow() - 1;
    Logger.log("送信したいメール件数: %d", numEntry);
    if (!canSendAllEmail(numEntry)){
      console.error("送信可能メール数の残数が足りません!");
      return;
    }
    
    // B4: メールを送信
    for (let i = 0; i < numEntry; i++){ //シートの２行目から最終行まで以下を実行
      Logger.log("== %d / %d 件目 ==", i+1, numEntry);
  
      // B4-1
      let rowIndex = i + 2;
      let emailAddr = ss.getRange(rowIndex, 1).getValue();       // １列目の値（Email）を取得
      let name = ss.getRange(rowIndex,2).getValue();        // 2列目の値（Name）を取得
      let eventTitle = ss.getRange(rowIndex, 3).getValue(); // 3列目の値（Class）を取得
      let startTime = ss.getRange(rowIndex, 4).getValue();  // 4列目の値（StartTime）を取得
  
      // B4-2: プレースホルダに変数を代入し、本部を作成
      let msgBody = template
        .replace("{{NAME}}", name)
        .replace("{{EVENT_TITLE}}", eventTitle)
        .replace("{{START_TIME}}", startTime);
      Logger.log("送信する本文:");
      Logger.log(msgBody); // 置き換えた後のテキストを出力
  
      // B4-3: 件名を作成
      let emailSubject = `Event Reminder: ${eventTitle}`;
      Logger.log("件名: %s", emailSubject);
  
      // B4-4: 送信
      MailApp.sendEmail({
        to: emailAddr, // Toのアドレス 
        subject: emailSubject, // 件名
        body: msgBody, // 本文
      });
    }
  }