# GAS Hands-on Workshop @ GDSC Osaka Univ. Information Session
GAS Hands-on Workshop (@GDSC 大阪大学支部 Information Session ) で使用するサンプルコードや、課題の説明をまとめたリポジトリです。


## Event Information
- Title: Information Session / 説明会
- Date: 2021.12.05 13:30
- Place: Online
- https://gdsc.community.dev/e/m95u9a/

本ワークショップでは、Google App Script (GAS) を用いて、名簿に登録された宛先に対して、文面を一人一人に合わせてカスタマイズしたメールを配信するシステムをみなさんと一緒に作成します。

みなさんはGmailやGoogle Spreadshetを使用したことはありますか？GASはこれらのサービスを統合、自動化、拡張することができるローコードプラットフォームです。短いプログラムで、メールの送信やスプレッドシートの操作などを行うことができます。本ワークショップでは、Google Spreadsheetで作成した名簿の宛先に、メールを送信します。
ただし、単にメールを送るだけではなく、メールの文面に宛先の方の氏名などを個別に設定します。（よくメルマガの冒頭にでみる「XXXX様」のあれです。）

ワークショップの進め方は以下の通りです。まず、(1) GASの解説、(2)  GASを使うために必要なプログラミング言語の基礎知識の説明を行います。次に皆さんと一緒に、(3) メール配信システムを作成し、メールが送信できることを確かめます。また、(4) ワークショップの最後には2つの課題を用意しておりますので、挑戦してみましょう！(3) までは、難しいコーディングは必要なく、Copy & Pasteで進めることができます。プログラムを書いたことがない方も安心してご参加いだだけます。この機会に是非、一緒に初めてのプログラミングに挑戦しましょう！

## Table of Contents
1. Javascript (JS) の基礎知識
1. GASを用いたカスタムメール配信
1. [課題1] 送信するメールの本文を変えてみよう！
1. [課題2] (スキルアップ問題) アンケートの回答確認とリマインダーの自動送信

---

## Sec.1: Javascript (JS) の基礎知識
### JavaScript とは？

> JavaScriptとはブラウザを「動かす」ためのプログラム言語のこと。例えば、Webサイトを訪問したとき、ポップアップ画面やカルーセルのように、Webサイト上でアニメーションが動いているのを見たことがあるのではないでしょうか？あのようなブラウザが「動く」ために、指示を出しているプログラミング言語がJavaScriptなのです。また最近ではサーバーサイド、スマホアプリ、デスクトップアプリでも使われています。
>> (https://www.modis.jp/staffing/insight/column_29/)

Google App ScriptはJavaScriptをベースとした言語であり、Javascriptの基本構文はGASでも使用することができます。
ただし、JavaScriptが得意とするDOMの操作 (Webページ上のオブジェクトを動かすなど) など、使用できない機能もあります。
ここでは、プログラミング初心者を対象として、JavaScriptの基本構文を学習します。

### GAS上でJavaScriptの実行
Google App Scriptのエディタ上で、JavaScriptを実行します。以下の手順に従って操作をしてください。
Workshop参加者はスピーカーの画面を参考に操作してください。

1. Google Driveを開く
1. 左上の「新規」ボタンから、「その他 >> Google App Script」 を選択し、Script Editorを開きます。 (図1-1)
1. [01_introduction_to_JS.js](./01_introduction_to_JS.js) を別のタブで開き、中身をEditorにコピーします。
1. ツールバーから実行したい関数を選択し、関数を実行します。(図1-2)
1. 実行結果が画面下部に出力されます。

### Javascriptの基本構文
前のステップで実行したプログラムに関して解説をします。


#### (1) 出力
実行時のメッセージや変数を確認するためには、`console.log()` 関数を使用します。

```js
function Output() {
  //下の行はコンソールに"Hello, world"を出力するコードです。
  console.log( 'Hello, world!' );  
}
```

#### (2) 変数

```js
function Variable() {
  let a; //“a” という名前の変数を作ります. (別の言い方:定義)  or  var a;
  a = 10; // aの値は5です。
  //合わせて let a = 5; 
  // let user = 'John', age = 25, message = 'Hello';
  console.log(a);  
}
```

#### (3) データ型

```js
function DataType(){
  let n = 123; // 整数 Integer 
  console.log("n equal", n); 
  n = 12.345; // 浮動小数点数 Floating number
  console.log("Now, n equal", n); 
  n = "candy"; //文字列 String
  console.log("Now, n is", n);
  n = true; //(n = false) 論理型 boolean
  console.log("Now, n is", n);
}
```

#### (4) 演算子

```js
function BasicComputation(){
  let a=3, b=2;
  console.log(a+b, a-b,a*b, a/b) // 3+2, 3-2, 3*2, 3/2
}
```

#### (5) 条件分岐 if, else

```js
function IfElse(){
  let a = 2;
  if(a < 3){
    console.log(Loop(2)) //2+2+2+2+2
  }else{
    console.log(Loop(3)) //3+3+3+3+3
  }
}
```

#### (6) ループ

```js
function Loop(a){
  var count = 0;
  for(var i=0; i<5; i++)
  {
    count += a;
  }
  return count;
}
```

---

## Sec.2: GASを用いたカスタムメール配信

### Matrials

- [Google Spreadsheet - Member list](https://docs.google.com/spreadsheets/d/1jBdk5Qa4Ke-THKRbrr4khBGsv1SAuo7bl7DudcuBTNs/edit?usp=sharing) 
- [Script - 02_member_list.js](./02_member_list.js)

---

## [課題2] (スキルアップ問題) アンケートの回答確認とリマインダーの自動送信

TBA
