/** null과 undefined
--------------------------------
null : 값이 정해지지 않은 것
    --> 변수가 선언되었지만 값이 없는 경우
undefined : 타입이 정해지지 않은 것
    --> 선언되지 않은 변수나, 존재하지 않는 값이 있는 경우
--------------------------------  
**/

// null 값은 타입을 확인해보면 Object 타입이다!
// 왜 그런가하면 ?? 급하게 만들어진 자바스크립트의 버그.
// 고치기엔, 이를 활용한 코드가 너무 많아 지금까지 그냥 냅뒀다고 한다. 골때려 정말~
let nothing = null;
console.log(`nothing : ${nothing}, type: ${typeof nothing}`); 

let x;
console.log(`x: ${x}, type ${typeof x}`); // undefined


// null과 undefined 비교하기

console.log("null vs undefined");
console.log("null === undefined: ", null === undefined);
console.log("null == undefined: ", null == undefined);
// null과 undefined를 비교해보면 값만 비교했을땐 true를 리턴하지만 
// 타입까지 비교했을때는 false임을 확인할 수 있다.



// typeof 를 사용하면 다양한 값/변수들의 타입을 확인할 수 있다.
console.log(typeof 1);
console.log(typeof "str");
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof Symbol());
console.log(typeof null);