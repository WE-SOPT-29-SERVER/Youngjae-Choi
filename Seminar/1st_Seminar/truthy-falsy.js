/** truthy, falsy
--------------------------------
js의 다양한 자료형들은 값이 있는지 없는지, 그 여부를 타입캐스팅 할 수 있다. 
대충 값이 true인 것과 대충 false인 것들을 알아본다!
--------------------------------  
**/

const num1 = 1;
const num2 = 2;
const str = "2";
const bool = true;
// num2와 str을 비교하면 2가 "2"로 바뀐다.

console.log(num1==bool); // true
// 1 -> true
// true == 1 , false == 0
console.log(num2==bool); // false
// 2 -> false




// Truthy 
// 대충 true 다
console.log(Boolean(10)) //true
console.log(Boolean(-41)) //true
console.log(Boolean('문자')) //true
console.log(Boolean(true)) //true
console.log(Boolean({})) //true
console.log(Boolean([])) //true


// Falsy
// 대충 false 다
// false, 0, null, undefined
console.log(Boolean(0)) //false
console.log(Boolean(undefined)) //false
console.log(Boolean(null)) //false
console.log(Boolean('')) //false
console.log(Boolean(false)) //false


