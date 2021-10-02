const num = 2
const str = '2'

// 값만 비교
// == equal
// != not equal
console.log(num==str);
// true
// 이경우에는 숫자를 문자로 바꾸어서 비교한다.

console.log(num+str);
console.log(typeof (num+str));

console.log(String(num)+String(str));





// 값과 타입을 같이 비교
// === equal
// !== not equal
console.log(num===str);
// false
