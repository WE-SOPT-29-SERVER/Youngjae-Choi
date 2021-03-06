# 1st Seminar

![image](https://user-images.githubusercontent.com/49263163/135910023-0c7c06fc-ea01-4af3-89e2-7a43680cd47e.png)

# Javascript 

## 변수 (Variable)

|                    |   var    |  let  | const |
| :----------------: | :------: | :---: | :---: |
|      **범위**      | Function | Block | Block |
|  **변수 재선언**   |    ✅     |   ❌   |   ❌   |
| **변수 값 재할당** |    ✅     |   ✅   |   ❌   |
| **초기화 값 필요** |    ❌     |   ❌   |   ✅   |

- **var**
  var는 재선언과 재할당이 가능하다.
  초기화 값이 없어도 선언이 가능하다.
- **let** 
  let은 재선언이 불가능하고, 재할당만 가능하다.
  초기화 값이 없어도 선언이 가능하다.
- **const**
  const는 재선언과 재할당이 전부 불가능하다
  초기화 값이 없으면 선언이 불가능하다.Scope



## Scope

- **Function Scope**

  ```javascript
  /** Function Scope
  --------------------------------
  Function Scope는 유효 범위가 함수 범위 내이다.
  그렇기 때문에 함수 범위 밖에서는 사용이 불가능하다.
  만일 전역 함수 외부에서 변수를 생성했다면, 그 변수는 전역(global)변수가 된다
  --------------------------------  
  **/
  
  // var는 Function Scope를 가진다.
  // 그렇기에 if문의 braket 안에서 선언되었음에도 접근이 가능하다.
  
  if (true) {
      var x = 'hey';
  }
  console.log(`x : ${x}`);
  
  // Function Scope의 유효범위를 확인해볼 수 있는 코드
  function colorFunction() {
      if (true) {
        var color = "blue";
        console.log(color);
      }
      console.log(color);
    }
    
    colorFunction();
  //   console.log(color); --> function Scope를 벗어나기 떄문에 에러가 발생한다.
  ```

- **Block Scope**

  ```javascript
  
  /** Block Scope
  --------------------------------
  Block Scope는 유효 범위가 중괄호 {}(braket) 범위 내이다.
  Block Scope를 사용하는 경우 Hoisting으로 인한 문제를 해결할 수 있다.
  --------------------------------  
  **/
  
    // let or const
    if (true) {
      let y = "let";
      const z = "const";
      console.log(`let1: ${y}`);
      console.log(`const1: ${z}`);
    }
  //   console.log(`let2: ${y}`);
  //   console.log(`const2: ${z}`);
  //  --> 만일 x,y를 이 자리에서 출력하려고 했다면, Block Scope를 벗어나는 것이기에 에러가 발생한다!
  ```



## Hoisting

*Hoisting*은 코드의 선언부를 맨 위로 끌어올리는 것을 의미한다.  
*자바스크립트는 선언부와 할당부를 분리시켜*, 자동으로 선언을 함수의 최상부로 끌어올리는 *'hoisting'*을 한다.  
*var* 변수 뿐만이 아닌 함수 선언 또한 호이스팅의 대상이 된다.

이런 *hoisting*은 선언 위치를 변경함으로써, 내가 짠 코드가 나의 의도와 다르게 동작할수도 있게 만든다.   
코드의 가독성을 높이고, 유지보수를 원활하게 하기 위해선 *hoisting*을 고려하여 코드를 짜야하는데, 방법은 간단하다!  
이런 문제들은 -> let과 *const*를 사용하면 대부분 해결된다*!*



## 동등 연산자, 일치 연산자

- == (동등연산자) : 값만 비교한다.
  == -> equal,  != -> not equal

- === (일치연산자) : 값과 타입을 비교한다.
  === -> equal, !== -> not equal



## String 자료형

```javascript
//  "과 ' 를 동일하게 취급한다.  
// 만일 '로 쌓여진 문자열에서 '를 출력하고 싶으면 \을 붙여 사용한다.  
const str1 = "Just Do it";
const str2 = "Just don't do it";
const str3 = 'Just don\'t do it';

// ` (벡틱)을 사용하면 선언된 변수를 활용할 수 있다.
const myName = "최영재";
const strr = "안녕하세요" + myName + "입니다";
const backtickStr = `안녕하세요 ${myName}입니다`;
```



## null과 undefined

- **null** : 값이 정해지지 않은 것 --> *변수가 선언되었지만 값이 없는 경우*

  null 값은 타입을 확인해보면 Object 타입이다!  
  왜 그런가하면 ?? 급하게 만들어진 자바스크립트의 버그.  
  고치기엔, 이를 활용한 코드가 너무 많아 지금까지 그냥 냅뒀다고 한다. 골때려 정말~

- **undefined** : 타입이 정해지지 않은 것 --> *선언되지 않은 변수나, 존재하지 않는 값이 있는 경우*



## Object

자바스크립트의 기본 타입으로*, {}*로 감싸져있다*.*  
*{key : value}*로 구성된 프로퍼티들의 정렬되지 않은 집합이다*.*  
property*로는 함수도 들어갈 수 있는데*,* 이런 함수를 *method* 라고 부른다*.*

- object 생성자 함수

  ```javascript
  const person = new Object(); // 빈 객체 생성
  
  // 프로퍼티 추가
  person.name = "이름"; // 점표기법 접근
  person.part = "Server";
  person["group"] = "YB"; // 브라켓 표기법 접근
  person.sayHello = function () {
      console.log(`안녕하세요 ${this.name} 입니다.`);
  }
  
  // person의 type 확인
  console.log(typeof person);
  // person Object 내용 출력
  console.log(person);
  // person Object의 sayHello 메소드 실행
  person.sayHello();
  ```

- 객체 리터럴

  ```javascript
  const emptyObject = {}; // 빈 객체 생성
  console.log(typeof emptyObject); // object
  
  const animal = {
      animalType: "dog",
      animalName: "뽀삐",
      animalFriends: ["코코","초코","쿠키"],
      bark: function () {
          console.log(`${this.animalName}: 멍멍`);
      },
      thisFriends: function () {
          this.animalFriends.forEach(friend => {
              console.log(`${this.animalName}의 친구 ${friend}`)
          });
      },
  };
  
  // animal Object의 내용 출력
  console.log(animal);
  // animal Object의 bark, thisFriends 메소드 실행
  animal.bark();
  animal.thisFriends();
  ```



## truthy / falsy

*js의 다양한 자료형들은 값이 있는지 없는지, 그 여부를 타입캐스팅 할 수 있다.* 

- **truthy**

  ```javascript
  // Truthy 
  // 대충 true 다
  console.log(Boolean(10)) //true
  console.log(Boolean(-41)) //true
  console.log(Boolean('문자')) //true
  console.log(Boolean(true)) //true
  console.log(Boolean({})) //true
  console.log(Boolean([])) //true
  ```

- **falsy**

  ```javascript
  // Falsy
  // 대충 false 다
  // false, 0, null, undefined
  console.log(Boolean(0)) //false
  console.log(Boolean(undefined)) //false
  console.log(Boolean(null)) //false
  console.log(Boolean('')) //false
  console.log(Boolean(false)) //false
  ```



## Array

*js에선 array도 객체로 취급한다.*  
*배열의 타입이 고정되지 않아, 같은 배열에도 다른 타입의 요소가 들어갈 수 있다.*  
*또한, 요소의 인덱스가 연속적이지 않아도 되기에 특정 배열이 비어있을수도 있다.*

```javascript
// 기본 형태
arr = [elem1, elem2, elem3]
```

### Array Method

- **length** : 배열의 길이를 리턴한다.

  ```javascript
  let arr = [1, 2, 3, 4];
  console.log(`arr의 길이: ${arr.length}`); // 4
  ```

- **push, pop** : 배열의 맨 뒤에 요소를 추가하거나 삭제한다.

  ```javascript
  arr.push("new item");
  console.log("arr push:", arr); // [1,2,3,4,"new item"]
  arr.pop();
  console.log("arr pop:", arr); // [1,2,3,4]

- shift, unshift : 배열의 맨 앞에 요소를 추가하거나 삭제한다.

  ```javascript
  arr.unshift("first item");
  console.log("arr unshift:", arr); // ["first item",1,2,3,4]
  arr.shift();
  console.log("arr shift:", arr); // [1,2,3,4]
  ```

- **includes** : 배열에서 원하는 원소 값을 찾아준다. 원하는 값이 배열에 있다면 true, 없다면  false를 리턴한다

  ```javascript
  console.log("arr.includes(4):", arr.includes(4));  // true
  console.log("arr.includes(1000):", arr.includes(1000));  // false
  ```

- **indexOf** : 배열에서 원하는 원소 값을 찾아 그 원소의 위치 인덱스를 리턴해준다. 동일한 값이 여러개 있다면 가장 첫번째 위치를 리턴하고, 값이 없다면 -1을 리턴한다.

  ```javascript
  console.log("arr.indexOf(4):", arr.indexOf(4));  // 3
  console.log("arr.indexOf(100):", arr.indexOf(100)); // -1
  ```

- **concat** : 배열을 합쳐준다

  ```javascript
  let concat1 = [1, 2, 3];
  let concat2 = [4, 5, 6];
  let concatArr = concat1.concat(concat2); // [1,2,3,4,5,6]
  console.log("arr1.concat(arr2):", concatArr);
  ```

- **join** : 배열의 원소를 연결하여 하나의 값으로 만든다. 기본적으로는 ,로 원소를 구분하지만, ()안에 문자를 입력하면 그 문자로 원소들을 구분해준다.

  ```javascript
  let location = ["서울", "대전", "대구", "부산"];
  console.log(location.join("-> ")); // 서울-> 대전-> 대구-> 부산
  ```

- **reverse** : 배열의 순서를 뒤집는다

  ```javascript
  console.log(location.reverse().join("-> ")); // 부산-> 대구-> 대전-> 서울
  ```

- **sort**  : *array를 정렬해주는 함수*

  *sort(a,b) 함수가 리턴하는 값이 0보다 작은 경우에는 a가 b보다 앞에 오도록(내림차수),*  
  *0보다 큰 경우에는 b가 a 앞에 오도록(오름차순) 정렬한다.* *0을 리턴하면 a와 b의 순서를 변경하지 않는다.*

  ```javascript
  let countries = ["Österreich", "Andorra", "Vietnam"];
  
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
  );
  
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
  ```

- **filter** : 필터는 배열 요소 전체를 대상으로 조건을 걸어서 그 조건을 충족하는 결과를 반환해준다. 

  ```javascript
  let number = [100, 234, -125, 1, 23, -637, -123, 99, 2, 3, 4, 5];
  let minusNumber = number.filter(item => item < 0);
  console.log("minusNumber: ", minusNumber); // minusNumber:  [ -125, -637, -123 ]
  ```

- **map** : map은 배열 요소 전체를 대상으로 함수를 호출하고, 그 결과를 새로운 배열로 반환할 때 주로 사용한다.

  ```javascript
  let countries2 = ["Österreich", "Andorra", "Vietnam", "Korea", "China"];
  let countriesLengths = countries2.map(item => item.length);
  console.log("countriesLengths: ", countriesLengths); // countriesLengths:  [ 10, 7, 7, 5, 5 ]
  ```

- **reduce** : map은 배열을 반환할 때 상요했지만, reduce는 값 하나를 반환할 대 주로 사용한다. 대표적인 예시로 1~n 까지 더하기 

  ```javascript
  let number2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let sum = number2.reduce((previousValue, currentValue) => {
    console.log(`previousValue: ${previousValue}, currentValue: ${currentValue}`);
    return previousValue + currentValue;
  });
  
  console.log("sum = ", sum);
  ```

### 배열 순회

- **for in** : for in 은 객체를 탐색한다. 객체의 모든 열거 가능한 속성(property)에 대한 반복

  ```javascript
    // for in 은 객체를 탐색한다
    // 아래의 경우 serverPart라는 배열 객체의 프로퍼티를 출력하게 된다.
    for (let item in serverPart) {
      serverIndexStr += item + "! "; }
    console.log(serverIndexStr);
  ```

- **for of** : for of 은 배열 값을 탐색한다. [Symbol.iterator] 속성을 가지는 컬렉션 전용

  ```javascript
    // for of 은 배열 값을 탐색한다.
    // 아래의 경우 serverPart라는 배열의 요소를 출력한다.
    for (let item of serverPart) {
      serverPartMemberNameStr += item + "! ";  }
    console.log(serverPartMemberNameStr);
  ```

- **forEach** : forEach는 오직 Array 객체에서만 사용가능하다. 배열의 요소들을 반복하여 작업을 수행한다.

  ```javascript
    serverPart.forEach(item => {
      console.log(item);
    });
  ```



## function

function은 하나의 특정한 동작을 하도록 설계된 독립적인 블록이다.  
자바스크립트에선 function을 "일급객체"로 취급한다.  
그렇기에 function은 변수 또는 데이터 구조에 담을 수 있고,  
다른 함수의 파라미터로 전달할 수 있으며, 반환 값으로도 사용이 가능하다

- **함수 선언식** : 함수선언식은 호이스팅의 영향을 받는다

  ```javascript
  // 함수 선언문 생성
  function add(x,y) {
      return x+y;
  }
  // 함수 선언문 실행
  console.log(add(2,3));
  ```

- **함수 표현식** : 함수 표현식은 호이스팅에 영향을 받지 않는다! 함수를 변수에 할당한다!! (일급객체!)

  ```javascript
  // 함수 표현식 생성 
  const addStr = function (x,y) {
      return x+y;
  };
  // 함수 표현식 실행
  console.log(addStr("안녕","하세요"));
  ```

- **함수 표현식 (화살표 함수)** : 함수 표현식을 간결하게 쓸 수 있는 방법이다! 변수가 하나인 경우에 소괄호 생략이 가능하고, 상황에따라 return 문도 생략이 가능하다.

  ```javascript
  // 일반적인 화살표 함수 사용법!
  const add2 = (x,y) => {
      return x+y;
  };
  // 변수가 하나인 경우는 소괄호 생략이 가능! (x) -> x
  const returnX = x => {
      return x;
  };
  // 변수가 없는 경우에는 빈 소괄호를 사용한다.
  const returnOne = () => {
      return 1;
  };
  
  // 로직이 한줄일때 return 문 생략 가능
  const add3 = (x,y) => x+y;
  // 매개변수가 하나일때 매개변수 소괄호 생략 가능
  const square = x => x * x;
  // 객체를 리턴하고 로직이 한줄일때는 소괄호 ( ) 로 감싸줘야함
  const person2 = (name, age) => ({ name: name, age: age });
  // 위의 person2 화살표 함수는 아래의 함수표현식과 동일하다!
  const person3 = function (name, age) {
    return {
      name: name,
      age: age,
    };
  };
  ```

  

## JSON (JavaScript Object Notation)

JSON은 객체를 표현하는 하나의 표현방식이다.   
key와 value로 구성된 프로퍼티의 정렬되지 않은 집합이다.  
작은 단위의 Daya 교환 형식이고, 클라이언트와 통신시에 주로 사용한다.  

```javascript
const sopt = {
    name: "WE SOPT",
    slogan: "우리가 SOPT입니다",
    part: ["plan", "design", "android", "iOS", "server", "web"],
    number: 199,
    printName: function () {
      console.log("name : ", this.name);
    },
    printNum: function () {
      console.log("number : ", this.number);
    },
  };
  
  console.log("typeof sopt : " + typeof sopt); // JSON은 객체의 표현방식을 말하는 것이기 떄문에, type은 당연히 object!
```

- **\+ 과 ,***
  객체를 출력할때 +를 사용한다면 '문자열 합치기'가 되어버리기 때문에, 객체 정보를 제대로 확인할 수 없다.  
   \+ 대신 , 를 사용해서 객체를 출력해준다면, 객체의 정보를 제대로 볼 수 있다.

  ```javascript
  console.log("sopt : " + sopt); // sopts  : [object Object]
  
  console.log("sopt : ", sopt);
  /*
    sopt :  {
    name: 'WE SOPT',
    slogan: '우리가 SOPT입니다',
    part: [ 'plan', 'design', 'android', 'iOS', 'server', 'web' ],
    number: 199,
    printName: [Function: printName],
    printNum: [Function: printNum]
  }
  */
  ```

- **stringify( )** : javascript 객체를 JSON 문자열로 변환하여주는 함수이다.

  ```javascript
  console.log("sopt :" + JSON.stringify(sopt));
  /*
  sopt :{"name":"WE SOPT","slogan":"우리가 SOPT입니다","part":["plan","design","android","iOS","server","web"],"number":199}
  */
  ```

- **JSON 배열**

  ```javascript
  const dogs = [
      { name: "식빵", family: "웰시코기", age: 1, weight: 2.14 },
      { name: "콩콩", family: "포메라니안", age: 3, weight: 2.5 },
      { name: "두팔", family: "푸들", age: 7, weight: 3.1 },
    ];
  
  console.log("dogs :" + JSON.stringify(dogs));
  // dogs :[{"name":"식빵","family":"웰시코기","age":1,"weight":2.14},{"name":"콩콩","family":"포메라니안","age":3,"weight":2.5},{"name":"두팔","family":"푸들","age":7,"weight":3.1}]
    
    dogs.forEach(dog =>
      console.log(
        dog.name +
          "이는 종이 " +
          dog.family +
          "이고, 나이가 " +
          dog.age +
          "세입니다 ~",
      ),
    );
  // 식빵이는 종이 웰시코기이고, 나이가 1세입니다 ~
  // 콩콩이는 종이 포메라니안이고, 나이가 3세입니다 ~
  // 두팔이는 종이 푸들이고, 나이가 7세입니다 ~
  ```

# Node.js

Node.js는 브라우저에서만 돌아가는 JS를 브라우저 바깥에서 실행할 수 있도록 해주는 런타임 환경을 의미한다.  

## Node.js의 특징

###  - Non-Blocking I/O 

- blocking I/O  
  I/O 작업이 끝날 때까지 기존의 작업을 중단하고 대기하다가, I/O 작업이 끝나고나면 다음 작업을 이어 진행한다
- non-blocking I/O  
  I/O가 진행되는 동안, 멈추지 않고 다음 작업을 진행한다. 즉 I/O와 동시에 작업 수행이 가능하다.

### - Single Thread

노드를 실행하면 프로세스를 한게 생성하고, 그 프로세스는 여러개의 쓰레드를 생성한다.  
하지만 제어가능한 쓰레드(JS를 실행하는 쓰레드)는 단 하나다!

- 프로세스 : 운영체제에서 할당하는 작업의 단위
- 쓰레드 : 프로세스 내에서 실행되는 흐름의 단위. 쓰레드는 부모 프로세스의 자원을 공유 가능하다

### - Event-Driven

Event-Driven은 어떤 이벤트가 발생할 때 미리 지정해둔 작업을 수행하는 방식을 의미한다. 
--> "'어떤 일'이 발생하면 '이런 동작'을 수행"을 지정해두는 방식

- call stack : 실행되는 함수들이 스택의 구조로 쌓이는 곳 
- background : 로직이 실행되는 공간
- callback queue : 이벤트 발생 후 콜백 함수들이 기다리는 공간
- event loop : 코백 큐의 콜백 함수를 콜 스택에 전달한다. --> 단 콜 스택이 비어있을 때만 가져온다

**Event-Driven의 작동 방식**

1. 특정 함수가 call stack에 push 된다. 만일 해당 함수가 바로 실행되면 바로 pop되고,  특정 이벤트가 발생한다면 해당 콜백 함수가 background로 pop되고 background에서 해당 콜백함수가 실행된다.
2. 해당 이벤트가 실행을 마치면, 해당 함수는 call stak이 아닌  calback queue로 이동한다
3. call stack이 비었다면 event loop이 callback queue에서  콜백 함수를  call stak으로 이동시킨다. (call stack이 빈 경우에만!)
4. call stack에서 콜백 함수를 pop 한다.

