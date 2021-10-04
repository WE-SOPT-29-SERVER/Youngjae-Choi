//  변수선언법

/** 
--------------------------------
var는 재선언과 재할당이 가능하다.
초기화 값이 없어도 선언이 가능하다.
--------------------------------
**/

// var 재선언
var variableVar = '123';
var variableVar = '321';
console.log('variableVar ', variableVar);

// var 재할당
variableVar = '12345'
console.log('variableVar ', variableVar);

// var 초기화 값
var helloVar;
console.log('helloVar ', helloVar);

/** 
--------------------------------
let은 재선언이 불가능하고, 재할당만 가능하다.
초기화 값이 없어도 선언이 가능하다.
--------------------------------
**/
let variableLet = '123';
// let variableLet = '321'; --> 재선언시 에러 발생
console.log('variableLet ', variableLet);

// let 재할당
variableLet = '12345';
console.log('variableLet ', variableLet);

// let 초기화 값
let helloLet;
console.log('helloLet ', helloLet);

/** 
--------------------------------
const는 재선언과 재할당이 전부 불가능하다
초기화 값이 없으면 선언이 불가능하다.
--------------------------------  
**/
const variableConst = '123';
// let variableConst = '321'; --> 재선언시 에러 발생

console.log('variableConst ', variableConst);

// const 재할당 불가능
// variableConst = '12345';--> 재선언시 에러 발생
console.log('variableConst ', variableConst);

// const 초기화 값
// const helloConst; --> 초기화 값 없이 선언시 에러 발생
// console.log('helloConst ', helloConst);