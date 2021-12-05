# Lesson.3: (スキルアップ問題) アンケートの回答確認とリマインダーの自動送信

Lesson.2では、名簿に書かれた全員にメールを送る方法を学習しました。
ここでは、Google Formでのアンケートの解答状況に応じて、アンケートみ回答者のみにリマインダーのメールを送るシステムを実装してください。

## 事前準備

1. Googleフォームを作成し、スプレッドシートに結果を記録
1. 回答を記録するスプレッドシートに、シートを追加し、回答が必要な人の名簿を作成
1. Google Formに、異なるユーザとして何件か回答を登録してください。

参考:
- [Google Form - Event Registration](https://docs.google.com/forms/d/e/1FAIpQLSdeKwRbw2Em694JWRnX6Ew0mBzV1e5osQSt87IJztMpK7Ms3Q/viewform)
- [Google Spreadsheet - L3_form_responses](https://docs.google.com/spreadsheets/d/10zmHFS31KOl7HFMwV6qnRGUXCkLGbt8HK38tEH7ZtX8/edit?usp=sharing)
  - 回答記録用

## 課題説明

作成したSpreadsheetに紐付いたApp Scriptを作成し、回答の登録がないユーザのみにリマインダーのメールを送信してください。

大まかな実装手順を以下に示すので、参考にしてください。

- スプレッドシートに紐付いたApp Scriptを作成
- アンケートに回答すべき人、回答した人のリストを取得
- 回答すべき人と未回答者の氏名を比較し、未回答者のリストを作成
- 未回答者に対して、リマインダーのメールを送信

(ヒントはワークショップ中に示されるかもしれません！)

### Hint!

GASで実装すべき関数の例を列挙しました。

- `existsResponse(name)`: 氏名からGoogle Formの回答があるか確認する。
- `getNoResponseMemberList(memberList, ssResponse)`: メンバーリストとGoogle Formの回答のシートを引数として、未回答のメンバーのリストを返す。
- `sendReminderEmail(member)`:  メンバー
