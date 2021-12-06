/**
 * 事前準備: Underscore ライブラリのインポート
 *     Script ID: 1PcEHcGVC1njZd8SfXtmgQk19djwVd2GrrW1gd7U5hNk033tzi6IUvIAV
 *     手順:
 *         1) ライブラリのプラスボタンを押す。
 *         2) 上のScript IDを入力 >> 検索
 *         3) Import !
*/
var MSG_TEMPLATE = "{{NAME}}さん\n\nGoogle Formへの回答を忘れていませんか？"


/**
 * メンバーデータ (members)に含まれる一人一人の名前が、回答シートにあるか確認します。
 * 回答が見つかれば、 回答が登録されている行番号を、未解答の場合は-1を格納した配列を返します。
 * 配列の検索には indexOf()と、Underscore.zip.apply()を用いる。
 * 
 * @param {Array} シート "members" から読み出したデータ (2D Array)
 * @param {Array} シート "Form Response" から読み出したデータ(2D Array) 
 * @return {Array} 回答が登録されている行番号のリスト。
 */
function getResponsRows(members, responses){
  // responsesを転地し、名前のカラムに対する Arr.indexOf() が使えるようにする。
  var _ = Underscore.load();
  let responsesTrans = _.zip.apply(_, responses);

  // 各メンバーに回答があるか否かを検証
  var results = [];
  for(let i = 0; i < members.length; i++){
    // NOTE: for ... of は配列などを順に処理する。
    // NOTE: for ... in は連想配列を順に処理する。取り出されるのはkeyであり、valueではない。(配列に使ってはいけない。)
    let name = members[i][0];

    // NOTE: Array.indexOf(value)は、配列に指定した値があればその値のIndexを、なければ-1を返す。
    //       Array.includes(valie) でも代用可能 (こちらの方がBool値を返すので良いかもしれない).
    let idx = responsesTrans[1].indexOf(name);
    results.push(idx);
  }
  return results;
}


/**
 * 回答の有無を、MemberListの最後の列に追記
 * 
 * @param {Array} responseRows 回答の行番号を格納した配列。 (i.e., getResponsRows()の結果)
 * @param {Spreadsheet} ss
 */
function markResponseExists(sheet, responseRows){
  let lastCol = sheet.getLastColumn();

  // Headerを記入
  sheet.getRange(1, lastCol+1).setValue("ExistsResponse");

  // 回答の有無を記入
  let status = [];
  for(let row of responseRows){
    let val = (row == -1) ? 0 : 1;
    status.push([val]);
  }
  // NOTE: .setValues() の引数は2d-array
  sheet.getRange(2, lastCol + 1, status.length).setValues(status);
  return true;
}


/**
 * 未回答者のリストを返す。
 * 
 * @param {Array} members
 * @param {Array} responseRows 回答の行番号を格納した配列。 (i.e., getResponsRows()の結果)
 */
function getNoResponseMemberList(members, responseRows){
  // FIXME: もう少し賢い抽出の方法はないのか？
  var notRespondesMembers = [];
  for (let i =0; i < responseRows.length; i++){
    if(responseRows[i] == -1){
      notRespondesMembers.push(members[i]);
    }
  }
  return notRespondesMembers;
}

/**
 * リストに登録されているアドレス全てにメールを送信可能か確認する。
 * NOTE: Gmailが1日で送信可能なメールの数は100
 * @param numEntry 
 * @returns {bool}
 */
function canSendAllEmail(numEntry){
  // リストに登録されているアドレス全てにメールを送信可能か確認する関数
  // NOTE: Gmailが1日で送信可能なメールの数は100

  // 今日送信可能なメールの残数を取得
  let emailQuotaRemaining = MailApp.getRemainingDailyQuota();
  Logger.log("本日送信可能メール数:", emailQuotaRemaining);

  // 確認 (残数的に全件送信可能 ==> true, 不可 ==> false)
  if (numEntry < emailQuotaRemaining){
    return true;
  } 
  return false;
}


/**
 * メンバーのリスト(氏名とEmail)を受け取り、個別にメールを送信する。
 * 
 * @param {Array} members
 */
function sendEmails(members){
  // B1: 登録されているメールが送れるか確認
  var numEntry = members.length;
  Logger.log("送信したいメール件数: %d", numEntry);
  if (!canSendAllEmail(numEntry)){
    // NOTE: 送信可能なメール数より多い場合 --> エラーメッセージを出力
    console.error("送信可能メール数の残数が足りません!");
    return;
  }
  
  // B2: メールを送信
  for (let i = 0; i < numEntry; i++){ //シートの２行目から最終行まで以下を実行
    Logger.log("== %d / %d 件目 ==", i+1, numEntry);

    let name = members[i][0];
    let addr = members[i][1];
    Logger.log("name, addr: %s", name, addr);
    
    // プレースホルダに変数を代入し、本文を作成
    let msgBody = MSG_TEMPLATE.replace("{{NAME}}", name);
    Logger.log("送信する本文:");
    Logger.log(msgBody); // 置き換えた後のテキストを出力

    // 件名を作成
    let emailSubject = "[TEST] Reminder: Please Send Google Form Now!";
    Logger.log("件名: %s", emailSubject);

    // 送信
    MailApp.sendEmail({
      to: addr, // Toのアドレス 
      subject: emailSubject, // 件名
      body: msgBody, // 本文
    });
  }
}


function main(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var members = ss.getSheetByName("MemberList").getDataRange().getValues().slice(1);
  var responses = ss.getSheetByName("Form Responses").getDataRange().getValues().slice(1);
  Logger.log("mebers: %s", members);
  Logger.log("responses: %s", members);
  
  var responseRows = getResponsRows(members, responses);
  Logger.log("ResponseRow: %s", responseRows);
  var notRespondesMembers = getNoResponseMemberList(members, responseRows);
  Logger.log("NotRespondedMembers: %s", notRespondesMembers);

  // var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('MemberList');
  // markResponseExists(sheet, responseRows);
  
  sendEmails(notRespondesMembers);
}


// =============
//   Unit Test 
// =============
function testGetResponsRows(){
  // Input
  var members = [
    ["Ichiro", "xxxx+ichiro@gmail.com"],
    ["Jiro",  "xxxx+jiro@gmail.com"],
    ["Saburo", "xxxx+saburo@gmail.com"],
    ["Shiro", "xxxx+shiro@gmail.com"],
    ["Goro", "xxxx+goro@gmail.com"],
  ];
  var responses = [
    ["12/5/2021 19:53:35", "Ichiro", 	"Cloud Study Jam"],
    ["12/5/2021 19:53:42", 	"Jiro", "Information Session"],
    ["12/5/2021 19:53:49",  "Saburo", "Cloud Study Jam"],
  ];

  // Output
  var outputExpected = [0, 1, 2, -1, -1];

  output = getResponsRows(members, responses);
  Logger.log("Unit-Test: output=%s", output);
  // >> [0, 1, 2, -1, -1]
}

function testGetNoResponseMemberList(){
  // Input
  var members = [
    ["Ichiro", "xxxx+ichiro@gmail.com"],
    ["Jiro",  "xxxx+jiro@gmail.com"],
    ["Saburo", "xxxx+saburo@gmail.com"],
    ["Shiro", "xxxx+shiro@gmail.com"],
    ["Goro", "xxxx+goro@gmail.com"],
  ];
  var responses = [
    ["12/5/2021 19:53:35", "Ichiro", 	"Cloud Study Jam"],
    ["12/5/2021 19:53:42", 	"Jiro", "Information Session"],
    ["12/5/2021 19:53:49",  "Saburo", "Cloud Study Jam"],
  ];

  // Output
  var outputExpected = [
    ["Shiro", "xxxx+shiro@gmail.com"],
    ["Goro", "xxxx+goro@gmail.com"],
  ];

  output = getResponsRows(members, responses);
  Logger.log("Unit-Test: output=%s", output);
  Logger.log("Unit-Test: outputExpected=%s", outputExpected);
}

function testMarkResponseExists(){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('MemberList');
  var responseRows = [0, 1, 2, -1, -1];

  var newMembersArr = [
    ["Ichiro", "xxxx+ichiro@gmail.com", true],
    ["Jiro",  "xxxx+jiro@gmail.com", true],
    ["Saburo", "xxxx+saburo@gmail.com", true],
    ["Shiro", "xxxx+shiro@gmail.com", false],
    ["Goro", "xxxx+goro@gmail.com", false],
  ];

  output = markResponseExists(sheet, responseRows);
  Logger.log("Unit-Test: output=%s", output);
}


function testSendEmails(){
  var notRespondesMembers = [
    ["Shiro", "xxxx+shiro@gmail.com"],
    ["Goro", "xxxx+goro@gmail.com"],
  ];

  sendEmails(notRespondesMembers);
  Logger.log("Unit-Test: Done!");
}