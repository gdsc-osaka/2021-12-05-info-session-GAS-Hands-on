# Lesson.2: GASを用いたメール配信システム
ここでは、GAS用いて、Google SpreadsheetとGmailを連携させて、メール配信システムを構築します。
完成するメール配信システムでは、以下のような `{{NAME}}` と `{{EVENT_TITLE}}` をスプレッドシートに登録した文字列に置き換えて送信します。では初めて行きましょう！

```text
Hello {{NAME}},  

This is a reminder that you have an upcoming event, "{EVENT_TITLE}".

Best Regards,
GDSC Osaka Univ. Chapter
```

## 2-1: 事前準備

- Google Driveが開けることを確認してください。

## 2-2: 送り先リストの作成

メールの送り先を登録したGoogle Spreadsheetを作成します。
今回はテンプレートを用意したので、それをコピーすることで進めていきます。
手順は以下の通りです。

1. [Google Spreadsheet - Member list](https://docs.google.com/spreadsheets/d/1m03lQ-CXIlanE46Eh7f3xgeGypU5QIm-Yo7cea3ggDk/edit?usp=sharing) を新しいタブで開く。
1. 左上の「ファイル」タブ から 「コピーを作成」をクリックし、自分のドライブにスプレッドシートのコピーを作成。

コピーしたものを見ていただければ分かると思いますが、このスプレッドシートは ”Emails” と "Template" の2つのシートを持ちます。
"Emails"には、宛先のメールアドレス (Email)、氏名 (Name)、イベント名 (Event) の2つカラムがあります。
"Template" のシートでは、 1Aのセルに送る文面のテンプレートが記入されています。送信する文面を変える場合は、このセルの内容を変更します。スプレッドシートに登録した値に変えたい部分は、2重の`{{ }}` で変数名を囲みます。テンプレート内の変数で着替える部分をプレースホルダと言います。

後でメールの配信を確認できるように、"Emails"シートの メールアドレスをあなたが持っているメールアドレスに置き換えましょう。 **(決して他人のアドレスを登録しないように!!)**

**Sample.1: Sheet "Emails":**

| Email                 | Name   | Event               |
|-----------------------|--------|---------------------|
| xxxx+ichiro@gmail.com | Ichiro | Cloud Study Jam     |
| xxxx+jiro@gmail.com   | Jiro   | Information Session |
| xxxx+saburo@gmail.com | Saburo | Cloud Study Jam     |

**Sample.2: Sheet "Template" (A1のセル):**

```
"Hello {{NAME}},  

This is a reminder that you have an upcoming event, {{EVENT_TITLE}}.

Best Regards,
GDSC Osaka Univ. Chapter"
```

## 2-3: GAS Editorを開く

次にGASのプログラムを書く、"Editor" を開きます。
ツールバーの「拡張機能」 タブから、 「App Scripts」 をクリックします。

## 2-4: プログラムの作成

次にプログラムを入力します。今回は運営側で作成したプログラムをコピー&ペーストすることで次に進みます。課題1では、今回コピーしたプログラムを修正してもらいます。そこまでお楽しみはとっておきましょうね！ではやり方を説明します。

1. [member_list.js](./member_list.js) を別のタブで開き内容をコピーします。
1. GASのEditorを開きペーストします。
1. 画面上部の保存ボタン (フロッピーディスクのアイコン、実行の左) をクリックします。

プログラムの詳細に関しては、メールの送信を実行してから説明します。

## 2-5: 実行

1. ツールバーで、`sendEmails()` を指定し、「実行」をクリックします。
1. アクセス権限確認のポップアップが出ます。ログインして許可してください。
1. 送り先のメールの受信フォルダを開き、メールが届いていることを確認してください。

---

## 課題1: 送信するメールの本文を変えてみよう！

イベントのリマインダーを送ることができましたが、イベントの開始時刻を書き込むのを忘れてしまいました。
本課題では、スプレッドシートとプログラムを修正することでメールにイベントの開始時刻を追加してください。
イベントの開始時刻は以下の通りです。

- Cloud Study Jam: 2021/11/28 13:30
- Information Session: 2021/12/05 13:00

具体的には以下のようなメールを送ることを想定します。"GDSC説明会"の後に開催日が追記されているメールとなっています。

```text
Hello Ichiro,  

This is a reminder that you have an upcoming event, "Cloud Study Jam", from "2021/11/28 13:30".

Best Regards,
GDSC Osaka Univ. Chapter
```

<details>
<summary>ヒント!</summary>

1. シート "Emails" には、「StartTime」のカラムを追加します。
1. シート "Tempalte"には、時刻を記入するためのプレースホルダ `{{START_TIME}}` を付け足します。
1. スクリプトでは、
    1. シートから新たに "StartTime"のカラムを `ss.getRange(i, XX).getValue();` で取得します。
    1. テンプレートの文字列を`{{START_TIME}}`を、 `.replace()` 関数で置き換えます。
</details>

課題に成功したら、是非Slackで報告してくださいね！

----

## References

- [Google App Script - Docs - Class MailApp](https://developers.google.com/apps-script/reference/mail/mail-app)
