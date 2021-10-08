/** equal
--------------------------------
==(동등연산자) : 값만 비교한다.
===(일치연산자) : 값과 타입을 비교한다.
--------------------------------
*/

const num = 2
const str = '2'

// 동등연산자 -> 값만 비교
// == -> equal,  != -> not equal
console.log(num==str); // true
// 이 경우에는 js가 숫자를 문자로 바꾸어서 비교해버린다다.

console.log(num+str);
console.log(typeof (num+str));

console.log(String(num)+String(str));



// 비교연산자 -> 값과 타입을 같이 비교
// === -> equal, !== -> not equal
console.log(num===str);
// false
