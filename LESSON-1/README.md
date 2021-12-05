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
1. [01_introduction_to_JS.js](./introduction_to_JS.js) を別のタブで開き、中身をEditorにコピーします。
1. ツールバーから実行したい関数を選択し、関数を実行します。(図1-2)
1. 実行結果が画面下部に出力されます。

## 1-3: Javascriptの基本構文
前のステップで実行したプログラムに関して解説をします。

### 1-3-1: 出力
実行時のメッセージや変数を確認するためには、`console.log()` 関数を使用します。

```js
function print01() {
  //下の行はコンソールに"Hello, world"を出力するコードです。
  console.log( 'Hello, world!' );  
}
```

### 1-3-2: 変数

```js
function variable02() {
  // “a” という名前の変数を作ります. 
  // (別の表記)   var a;
  let a; 
  console.log("2-1:", a);

  // aの値を5にします。
  a = 10; 
  console.log("2-2:", a);

  // 上記2つを合わせて表現することもできます.
  // let a = 5; 

  // 複数変数をまとめて定義することもできます。
  let user = 'John', age = 25, message = 'Hello';
  console.log("2-3:", user, age, message);  
}
```

### 1-3-3: データ型

```js
function dataType03(){
  // 整数 Integer 
  let n = 123; 
  console.log("3-1:", "n equal", n); 
  
  // 浮動小数点数 Floating number
  n = 12.345; 
  console.log("3-2:", "Now, n equal", n); 
  
  //文字列 String
  n = "candy"; 
  console.log("3-3:", "Now, n is", n);
  
  //  論理型 boolean
  n = true; //(n = false)
  console.log("3-4:", "Now, n is", n);
}
```

### 1-3-4: 四則演算

```js
function basicComputation04(){
  let a=3, b=2;
  //  加算 a + b
  console.log("4-1:", a + b);
  //  減算 a - b
  console.log("4-2:", a - b);
  //  乗算 a x b
  console.log("4-3:", a * b);
  //  除算 a / b
  console.log("4-1:", a / b);
}
```

### 1-3-5: 条件分岐 if, else

```js
function aisatsu(isMorning){
  if (isMorning == true){
    return "Good Morning!";
  }else{
    return "Hello!";
  }
}

function condition05(){
  let isMorning;

  // 朝の場合
  isMorning = true
  console.log("5-1:", aisatsu(isMorning))

  // 夜の場合
  isMorning = false
  console.log("5-2:", aisatsu(isMorning))
}
```

### 1-3-6: ループ

```js
function Loop(a, numLoop){
  var count = 0;
  for(var i=0; i<numLoop; i++)
  {
    count += a;
  }
  return count;
}

function checkLoop06(){
  let a, numLoop;
  
  // 出力 = 2 + 2 + 2
  a = 2;
  numLoop = 3;
  console.log("6-1:", Loop(a, numLoop));

  // 出力 = 3 + 3 + 3 + 3 + 3
  a = 3;
  numLoop = 5;
  console.log("6-2:", Loop(a, numLoop));
}
```
