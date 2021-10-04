/** Array
--------------------------------
js에선 array도 객체로 취급한다.
배열의 타입이 고정되지 않아, 같은 배열에도 다른 타입의 요소가 들어갈 수 있다.
또한, 요소의 인덱스가 연속적이지 않아도 되기에 특정 배열이 비어있을수도 있다.
--------------------------------  
**/

/* -------------------- */
/*   1. 배열 실습    */
/* -------------------- */

let arr1 = [];
console.log(arr1); // []
console.log(typeof arr1); // object
console.log();


let arr2 = new Array(1,2,3,4,5);
console.log(arr2); // [1,2,3,4,5]
console.log(typeof arr2); // object
console.log();


let arr3 = ["최영재",1,2,3,null, {name : "youngjae", age: 28}];
console.log(arr3); // [ '최영재', 1, 2, 3, null, { name: 'youngjae', age: 28 } ]
console.log(typeof arr3); // object
console.log();



/* -------------------------- */
/*   2. 배열 prototype 메서드    */
/* -------------------------- */
console.log();
console.log("**** Array 기본 함수들을 알아보자 ****");
console.log();

let arr = [1, 2, 3, 4];

// 2-1, length
// 배열의 길이를 return
console.log(`arr의 길이: ${arr.length}`);
console.log();

// 2-2, push, pop
// 배열의 맨 뒤에 요소를 추가하거나 삭제한다
arr.push("new item");
console.log("arr push:", arr); // [1,2,3,4,"new item"]
arr.pop();
console.log("arr pop:", arr); // [1,2,3,4]
console.log();


// 2-3 shift, unshift
// 배열의 맨 앞에 요소를 추가하거나 삭제한다.
arr.unshift("first item");
console.log("arr unshift:", arr); // ["first item",1,2,3,4]
arr.shift();
console.log("arr shift:", arr); // [1,2,3,4]
console.log();

// 2-4 includes
// 배열에서 원하는 원소 값을 찾아준다. 
// 원하는 값이 배열에 있다면 true, 없다면 false를 리턴한다.
console.log("arr.includes(4):", arr.includes(4));  // true
console.log("arr.includes(1000):", arr.includes(1000));  // false
console.log();

// 2-5 indexOf
// 배열에서 원하는 원소 값을 찾아 그 원소의 위치 인덱스를 리턴해준다.
// 동일한 값이 여러개 있다면 가장 첫번째 위치를 리턴하고, 값이 없다면 -1을 리턴한다.
console.log("arr.indexOf(4):", arr.indexOf(4));  // 3
console.log("arr.indexOf(100):", arr.indexOf(100)); // -1
console.log();


// 2-6 concat  
// 배열을 합쳐준다. 
let concat1 = [1, 2, 3];
let concat2 = [4, 5, 6];
let concatArr = concat1.concat(concat2);
console.log("arr1.concat(arr2):", concatArr);
console.log();


// 2-7 join
// 배열의 원소를 연결하여 하나의 값으로 만든다.
// 기본적으로는 ,로 원소를 구분하지만, ()안에 문자를 입력하면 그 문자로 원소들을 구분해준다.
let location = ["서울", "대전", "대구", "부산"];
console.log(location.join("-> "));
console.log();


// 2-8 reverse
// 배열의 순서를 뒤집는다.
console.log(location.reverse().join("-> "));
console.log();


// 2-9 sort
/**  
array를 정렬해주는 함수
sort(a,b) 함수가 리턴하는 값이 0보다 작은 경우에는 a가 b보다 앞에 오도록(내림차수), 
0보다 큰 경우에는 b가 a 앞에 오도록(오름차순) 정렬한다.
0을 리턴하면 a와 b의 순서를 변경하지 않는다.
*/
let countries = ["Österreich", "Andorra", "Vietnam"];
console.log(countries.sort((a, b) => (a > b ? 1 : -1))); // Andorra, Vietnam, Österreich (제대로 정렬이 되지 않았습니다.)

/** 
localCompare --> 문자열과 문자열을 비교하여, 비교 결과에 따른 숫자를 반환하는 함수이다.
a가 b보다 큰 경우에는 -1 
b가 a보다 큰 경우에는 1
a와 b가 같은 경우에는 0을 리턴한다.
*/
console.log(
  countries.sort(function (a, b) {
    return a.localeCompare(b);
  }),
); // Andorra,Österreich,Vietnam (제대로 정렬되었네요!) 유니코드 기준으로 문자 정렬


// 두 숫자의 차가 양수값이냐, 음수값이냐를 이용해서 
// 아래처럼 정렬을 더 단순화할 수도 있다.
console.log(
  "오름차순 정렬:",
  concatArr.sort((a, b) => a - b),
);
console.log(
  "내림차순 정렬:",
  concatArr.sort(function (a, b) {
    return b - a;
  }),
);
console.log();


// 2-10 filter 
// 필터는 배열 요소 전체를 대상으로 조건을 걸어서 그 조건을 충족하는 결과를 반환해준다.
let number = [100, 234, -125, 1, 23, -637, -123, 99, 2, 3, 4, 5];
let minusNumber = number.filter(item => item < 0);
console.log("minusNumber: ", minusNumber); // minusNumber:  [ -125, -637, -123 ]
console.log();

// 2-11 map  
// map은 배열 요소 전체를 대상으로 함수를 호출하고, 그 결과를 새로운 배열로 반환할때 주로 사용한다.
let countries2 = ["Österreich", "Andorra", "Vietnam", "Korea", "China"];
let countriesLengths = countries2.map(item => item.length);
console.log("countriesLengths: ", countriesLengths); // countriesLengths:  [ 10, 7, 7, 5, 5 ]
console.log();

// 2-12 reduce 
// map은 배열을 반환할때 사용했지만 reduce는 값 하나를 반환할때 주로 사용한다. 
// 대표적인 예시로 1 ~ n 까지 더하기
let number2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let sum = number2.reduce((previousValue, currentValue) => {
  console.log(`previousValue: ${previousValue}, currentValue: ${currentValue}`);
  return previousValue + currentValue;
});

console.log("sum = ", sum);
console.log();


/* -------------------- */
/*   3. 배열 순회    */
/* -------------------- */

let serverPart = [
    "강한희",
    "고성용",
    "구건모",
    "권세훈",
    "김영권",
    "김은지",
    "김진욱",
  ];
  let serverIndexStr = '서버파트 여러분 번호 한번 세겠습니다. "';
  let serverPartMemberNameStr = '서버파트 여러분 이름 한번씩만 불러주세요~ "';
  
  // for in 은 객체를 탐색한다ㅣ
  // 아래의 경우 serverPart라는 배열 객체의 프로퍼티를 출력하게 된다.
  for (let item in serverPart) {
    serverIndexStr += item + "! ";
  }
  console.log(serverIndexStr);
  
  // for of 은 배열 값을 탐색한다.
  // 아래의 경우 serverPart라는 배열의 요소를 출력한다.
  for (let item of serverPart) {
    serverPartMemberNameStr += item + "! ";
  }
  console.log(serverPartMemberNameStr);

/**
for in 반복문 : 객체의 모든 열거 가능한 속성(property)에 대한 반복
for of 반복문 : [Symbol.iterator] 속성을 가지는 컬렉션 전용
 */


  
  //forEach는 오직 Array 객체에서만 사용가능하다.
  // 배열의 요소들을 반복하여 작업을 수행한다.
  serverPart.forEach(item => {
    console.log(item);
  });