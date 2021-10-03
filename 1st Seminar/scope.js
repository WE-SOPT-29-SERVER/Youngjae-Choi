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
  
