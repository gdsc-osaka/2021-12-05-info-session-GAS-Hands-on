/**
 * ================
 *   00: コメント
 * ================
*/

//コメント 実行しません

/*
  コメント 実行しません
*/


/**
 * ==================
 *   01: 変数の出力
 * ==================
*/
function print01() {
  //下の行はコンソールに"Hello, world"を出力するコードです。
  console.log( 'Hello, world!' );  
}


/**
 * ============
 *   02: 変数
 * ============
*/
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


/**
 * ================
 *   03: データ型
 * ================
*/
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

/*
 * ================
 *   04: 四則演算
 * ================
*/
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

/*
 * ========================
 *   05: 条件分岐 if else
 * ========================
*/
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


/*
 * ========================
 *   06: ループ
 * ========================
*/
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


/*
 * ========================
 *   Run All
 * ========================
*/
function testAll(){
  print01();
  variable02();
  dataType03();
  basicComputation04();
  condition05();
  checkLoop06();
}