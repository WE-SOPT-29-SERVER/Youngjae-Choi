/** Hoisting
--------------------------------
Hoisting은 코드의 선언부를 맨 위로 끌어올리는 것을 의미한다.
자바스크립트는 선언부와 할당부를 분리시켜, 자동으로 선언을 함수의 최상부로 끌어올리는 'hoisting'을 한다.
var 변수 뿐만이 아닌 함수 선언 또한 호이스팅의 대상이 된다.

이런 hoisting은 선언 위치를 변경함으로써, 내가 짠 코드가 나의 의도와 다르게 동작할수도 있게 만든다. 
코드의 가독성을 높이고, 유지보수를 원활하게 하기 위해선 hoisting을 고려하여 코드를 짜야하는데, 방법은 간단하다!
이런 문제들은 -> let과 const를 사용하면 대부분 해결된다!
--------------------------------  
**/
hoistFunction();

function hoistFunction() {
  console.log(x);
  var x = "var";
  console.log(x);
}


// 위처럼 코드를 짰더라도 JS engine은 코드를 아래처럼 해석한다.
function hoistFunction() {
    var x;
    console.log(x);
    x = "var";
    console.log(x);
  }
  
  hoistFunction();