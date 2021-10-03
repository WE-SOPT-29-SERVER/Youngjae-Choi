const num1 = 1;
const num2 = 2;
const str = "2";
const bool = true;

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


