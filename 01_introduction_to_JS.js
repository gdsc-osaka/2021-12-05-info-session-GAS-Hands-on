//コメント 実行しません

/*
  コメント 実行しません
*/

function Output() {
  //下の行はコンソールに"Hello, world"を出力するコードです。
  console.log( 'Hello, world!' );  
}

function Variable() {
  let a; //“a” という名前の変数を作ります. (別の言い方:定義)  or  var a;
  a = 10; // aの値は5です。
  //合わせて let a = 5; 
  // let user = 'John', age = 25, message = 'Hello';
  console.log(a);  
}

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

function BasicComputation(){
  let a=3, b=2;
  console.log(a+b, a-b,a*b, a/b) // 3+2, 3-2, 3*2, 3/2
}

function IfElse(){
  let a = 2;
  if(a < 3){
    console.log(Loop(2)) //2+2+2+2+2
  }else{
    console.log(Loop(3)) //3+3+3+3+3
  }
}

function Loop(a){
  var count = 0;
  for(var i=0; i<5; i++)
  {
    count += a;
  }
  return count;
}
