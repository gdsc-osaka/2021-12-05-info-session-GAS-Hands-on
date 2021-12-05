function sendEmails(){
  
  /*ActiveなSpreadsheet(今開いているSpreadsheet)の「Emails」というSheetを取得
   「Emails」の Sheetの情報を示す ss という変数を定義　*/
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Emails");

  var lr = ss.getLastRow();　// ss (Emailのシートを示す) に記入されている行数を取得
  Logger.log(lr);　//行数をlogに出力して確認


  //「Template」という名前の Sheet の１行目1列目の値を取得
  var templateText = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Template").getRange(1, 1).getValue();
  
  //本日、残っている送信可能なメールの数を取得　（Gmailが毎日送信可能なメールの数は100）
  var quotaLeft = MailApp.getRemainingDailyQuota();
  Logger.log(quotaLeft) //残っている送信可能なメールの数を出力して確認

　/* 行数-1（シート上に入力されているメールアドレスの数）が送信可能なメール数より多いか if文で判定
  ・送信可能なメール数より多い場合 --> エラーメッセージを出力
  ・送信可能なメール数以下の場合 --> else{}内を実行 */
  if ((lr-1) > quotaLeft){
    Logger.log("You have " + quotaLeft + " left and you're tring to send " + (lr-1) + " emails. Emails were not sent.");
  } 
  
  else{
    for (var i=2;i<=lr;i++){ //シートの２行目から最終行まで以下を実行

      var currentEmail = ss.getRange(i, 1).getValue(); //１列目の値（Email）を取得
      var currentClassTitle = ss.getRange(i, 3).getValue(); //3列目の値（Class）を取得
      var currentName = ss.getRange(i,2).getValue(); //2列目の値（Name）を取得

      // 「Template」シート内のテンプレートテキストの "{name}"と "{title}" をそれぞれ上記で得た Name と Class に置き換え
      var messageBody = templateText.replace("{name}", currentName).replace("{title}", currentClassTitle);
      Logger.log(messageBody); // 置き換えた後のテキストを出力

      /* Email(アドレス)に「Reminder: [Class] Upcoming Class」という件名でテンプレートの中身を置き換えたテキストを本文とするメールを送信
         (MailApp.sendEmail(アドレス, 件名, 本文) ：　指定したアドレスに件名と本文を指定してメールを送信)*/
      //MailApp.sendEmail(currentEmail, "Reminder: " + currentClassTitle + "Upcoming Class", messageBody);　

    } //close for statement（ここで繰り返し文が終了）
  } //close else statement（条件分岐のelseの中身がここで終了）

}//関数sendEmailsがここで終了