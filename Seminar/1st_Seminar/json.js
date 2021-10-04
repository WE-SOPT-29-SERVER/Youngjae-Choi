/** JSON (JavaScript Object Notation)
--------------------------------
JSON은 객체를 표현하는 하나의 표현방식이다.
key와 value로 구성된 프로퍼티의 정렬되지 않은 집합이다.
작은 단위의 Daya 교환 형식이고, 클라이언트와 통신시에 주로 사용한다.
--------------------------------  
**/


/* -------------------- */
/*   1. JSON 객체 실습    */
/* -------------------- */

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
  console.log()

/** 
+ 와 ,  
객체를 출력할때 +를 사용한다면 '문자열 합치기'가 되어버리기 때문에, 객체 정보를 제대로 확인할 수 없다.
+ 대신 , 를 사용해서 객체를 출력해준다면, 객체의 정보를 제대로 볼 수 있다.
*/

console.log("sopt : " + sopt);
console.log("sopt : ", sopt);
console.log()


/** stringify() 
javascript 객체를 JSON 문자열로 변환하여주는 함수이다.
*/
console.log("sopt :" + JSON.stringify(sopt));

sopt.printName();
sopt.number = 190;
sopt.printNum();
console.log()


/* -------------------- */
/*   2. JSON 배열 실습    */
/* -------------------- */

const dogs = [
    { name: "식빵", family: "웰시코기", age: 1, weight: 2.14 },
    { name: "콩콩", family: "포메라니안", age: 3, weight: 2.5 },
    { name: "두팔", family: "푸들", age: 7, weight: 3.1 },
  ];
  
  console.log("dogs : " + dogs);
  console.log("dogs : ", dogs);
  console.log("dogs :" + JSON.stringify(dogs));
  
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