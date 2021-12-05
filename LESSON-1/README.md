# Lesson.1: Javascript (JS) の基礎知識

## 1-1: JavaScript とは？

> JavaScriptとはブラウザを「動かす」ためのプログラム言語のこと。例えば、Webサイトを訪問したとき、ポップアップ画面やカルーセルのように、Webサイト上でアニメーションが動いているのを見たことがあるのではないでしょうか？あのようなブラウザが「動く」ために、指示を出しているプログラミング言語がJavaScriptなのです。また最近ではサーバーサイド、スマホアプリ、デスクトップアプリでも使われています。
>> (https://www.modis.jp/staffing/insight/column_29/)

Google App ScriptはJavaScriptをベースとした言語であり、Javascriptの基本構文はGASでも使用することができます。
ただし、JavaScriptが得意とするDOMの操作 (Webページ上のオブジェクトを動かすなど) など、使用できない機能もあります。
ここでは、プログラミング初心者を対象として、JavaScriptの基本構文を学習します。

## 1-2: GAS上でJavaScriptの実行

Google App Scriptのエディタ上で、JavaScriptを実行します。以下の手順に従って操作をしてください。
Workshop参加者はスピーカーの画面を参考に操作してください。

1. Google Driveを開く
1. 左上の「新規」ボタンから、「その他 >> Google App Script」 を選択し、Script Editorを開きます。 (図1-1)
1. [01_introduction_to_JS.js](./01_introduction_to_JS.js) を別のタブで開き、中身をEditorにコピーします。
1. ツールバーから実行したい関数を選択し、関数を実行します。(図1-2)
1. 実行結果が画面下部に出力されます。

## 1-3: Javascriptの基本構文
前のステップで実行したプログラムに関して解説をします。

### 1-3-1: 出力
実行時のメッセージや変数を確認するためには、`console.log()` 関数を使用します。

```js
function Output() {
  //下の行はコンソールに"Hello, world"を出力するコードです。
  console.log( 'Hello, world!' );  
}
```

### 1-3-2: 変数

```js
function Variable() {
  let a; //“a” という名前の変数を作ります. (別の言い方:定義)  or  var a;
  a = 10; // aの値は5です。
  //合わせて let a = 5; 
  // let user = 'John', age = 25, message = 'Hello';
  console.log(a);  
}
```

### 1-3-3: データ型

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

### 1-3-4: 演算子

```js
function BasicComputation(){
  let a=3, b=2;
  console.log(a+b, a-b,a*b, a/b) // 3+2, 3-2, 3*2, 3/2
}
```

### 1-3-5: 条件分岐 if, else

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

### 1-3-6: ループ

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
