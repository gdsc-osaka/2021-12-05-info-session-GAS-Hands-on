# 課題1 回答

## Step.1: Google Spreadsheetを編集

### Sample.1: Sheet "Emails"

`StartTime` の列を追加します。

| Email                 | Name   | Event               | StartTime        |
|-----------------------|--------|---------------------|------------------|
| xxxx+ichiro@gmail.com | Ichiro | Cloud Study Jam     | 2021/11/28 13:30 |
| xxxx+jiro@gmail.com   | Jiro   | Information Session | 2021/12/05 13:30 |
| xxxx+saburo@gmail.com | Saburo | Cloud Study Jam     | 2021/11/28 13:30 |

### Sample.2: Sheet "Template" (A1のセル)

イベント名のプレースホルダの後に、開始時刻のプレースホルダ `{{START_TIME}}` を追加します。

```
Hello {{NAME}},  

This is a reminder that you have an upcoming event, {{EVENT_TITLE}} from {{START_TIME}}.

Best Regards,
GDSC Osaka Univ. Chapter
```

## Step.2: App Scriptの編集

[member_list.js (編集後)](./answer_script_task1.js)

以下に編集のポイントをまとめます。

```js
# B4-1: 最後に `StartTime` を取得する処理を追記
let startTime = ss.getRange(rowIndex, 4).getValue();  // 4列目の値（StartTime）を取得
```

```js
# B4-2: `START_TIME` を置き換える処理を追記
let msgBody = template
        .replace("{{NAME}}", name)
        .replace("{{EVENT_TITLE}}", eventTitle)
        .replace("{{START_TIME}}", startTime);
```

## 結果

以下の三件のメールが、登録したアドレス宛に送信されます。

1件目:

```
Hello Ichiro,

This is a reminder that you have an upcoming event, Cloud Study Jam, from 
Sun Nov 28 2021 13:30:00 GMT+0900 (Japan Standard Time).

Best Regards,
GDSC Osaka Univ. Chapter
```

2件目:

```
Hello Jiro,

This is a reminder that you have an upcoming event, Information Session, 
from Sun Dec 05 2021 13:30:00 GMT+0900 (Japan Standard Time).

Best Regards,
GDSC Osaka Univ. Chapter
```

3件目:

```
This is a reminder that you have an upcoming event, Cloud Study Jam, from 
Sun Nov 28 2021 13:30:00 GMT+0900 (Japan Standard Time).

Best Regards,
GDSC Osaka Univ. Chapter
```

### 実行ログ

```
19:12:45	お知らせ	実行開始
19:12:45	情報	本文のテンプレート: Hello {{NAME}},  

This is a reminder that you have an upcoming event, {{EVENT_TITLE}}, from {{START_TIME}}.

Best Regards,
GDSC Osaka Univ. Chapter
19:12:45	情報	送信したいメール件数: 3.0
19:12:46	情報	本日送信可能メール数:
19:12:46	情報	== 1.0 / 3.0 件目 ==
19:12:46	情報	送信する本文:
19:12:46	情報	Hello Ichiro,  

This is a reminder that you have an upcoming event, Cloud Study Jam, from Sun Nov 28 2021 13:30:00 GMT+0900 (Japan Standard Time).

Best Regards,
GDSC Osaka Univ. Chapter
19:12:46	情報	件名: Event Reminder: Cloud Study Jam
19:12:46	情報	== 2.0 / 3.0 件目 ==
19:12:46	情報	送信する本文:
19:12:46	情報	Hello Jiro,  

This is a reminder that you have an upcoming event, Information Session, from Sun Dec 05 2021 13:30:00 GMT+0900 (Japan Standard Time).

Best Regards,
GDSC Osaka Univ. Chapter
19:12:46	情報	件名: Event Reminder: Information Session
19:12:46	情報	== 3.0 / 3.0 件目 ==
19:12:46	情報	送信する本文:
19:12:46	情報	Hello Sabruo,  

This is a reminder that you have an upcoming event, Cloud Study Jam, from Sun Nov 28 2021 13:30:00 GMT+0900 (Japan Standard Time).

Best Regards,
GDSC Osaka Univ. Chapter
19:12:46	情報	件名: Event Reminder: Cloud Study Jam
19:12:47	お知らせ	実行完了
```