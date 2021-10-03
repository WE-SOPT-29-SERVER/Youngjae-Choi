/** Object
--------------------------------
자바스크립트의 기본 타입으로, {}로 감싸져있다.
{key : value}로 구성된 프로퍼티들의 정렬되지 않은 집합이다.
property로는 함수도 들어갈 수 있는데, 이런 함수를 method 라고 부른다.
--------------------------------  
**/


/* Object 생성자 함수 */
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


console.log();
console.log("====================");
console.log();


/* 객체 리터럴 (가장 일반적인 자바스크립트의 객체 생성 방식) */
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