# 1st Seminar Assignment :fire::fire::fire:

![image](https://user-images.githubusercontent.com/49263163/136201699-a1568579-3447-4469-946a-0486eed0737c.png)

---

# Level 2

## Code

```javascript
const teammate = {
    members : [{
        name : "이  솔",
        address : "수원시",
        age : 24,
        hobby : "클래식 음악 감상"
      },
      {
        name: "최영재",
        address: "용인시",
        age: 21,
        hobby: "신문 읽으며 브런치 즐기기"
      },
      {
        name: "문규원",
        address: "성남시",
        age: 23,
        hobby: "독서와 함께하는 티타임"
      },
      {
      name: "허유정",
      address: "용인시",
      age: 23,
      hobby: "차 마시면서 서예하기"
      }],
    printName : function() {
        let nameStr = "조원 이름 :"
        this.members.forEach(member => {
            nameStr += " " + member.name 
        });
        console.log(nameStr);
    },
    printAddress : function() {
        this.members.forEach(member => {
            console.log(member.name + "의 집은? -> " + member.address);
        });
    },
    printAge : function() {
        this.members.forEach(member => {
            console.log(member.name + "의 나이는 " + member.age+"살 입니다");
        });
    },
    printHobby : function() {
        this.members.forEach(member => {
            console.log(member.name + "의 취미는 " + member.hobby);
        });
    },
}

console.log();
console.log(teammate);
console.log();
teammate.printName();
console.log();
teammate.printAddress();
console.log();
teammate.printAge();
console.log();
teammate.printHobby();
```

## Result

```

members: [
    { name: '이  솔', address: '수원시', age: 24, hobby: '클래식 음악 감상' },
    { name: '최영재', address: '용인시', age: 21, hobby: '신문 읽으며 브런치 즐기기' },
    { name: '문규원', address: '성남시', age: 23, hobby: '독서와 함께하는 티타임' },
    { name: '허유정', address: '용인시', age: 23, hobby: '차 마시면서 서예하기' }
  ],
  printName: [Function: printName],
  printAddress: [Function: printAddress],
  printAge: [Function: printAge],
  printHobby: [Function: printHobby]
}

조원 이름 : 이  솔 최영재 문규원 허유정

이  솔의 집은? -> 수원시
최영재의 집은? -> 용인시
문규원의 집은? -> 성남시
허유정의 집은? -> 용인시

이  솔의 나이는 24살 입니다
최영재의 나이는 21살 입니다
문규원의 나이는 23살 입니다
허유정의 나이는 23살 입니다

이  솔의 취미는 클래식 음악 감상
최영재의 취미는 신문 읽으며 브런치 즐기기
문규원의 취미는 독서와 함께하는 티타임
허유정의 취미는 차 마시면서 서예하기
```



---

# Level 3

## Code

```javascript
/**
 * 우선 YB,OB를 구분하여 리스트를 만든다.
 * 랜덤 함수를 활용하여 위에 만든 OB,YB 리스트의 순서을 섞어준다.
 *
 * 원하는 조별 최대 인원을 정수로 입력받는다! 
 * 그럼 총 몇개의 조가 짜여지는지 알 수 있는데,그 조의 개수만큼 빈 배열을 만든다.
 *
 * 이후 OB 먼저 각 조에 배치하고, 이어서 YB들을 이어서 조에 차례로 배치해준다.
 * 만일 해당 조의 최다 인원이 다 차 있는 경우에는, 자리가 남은 곳에 YB 인원을 배치시킨다.
 */

// 입력값을 받기 위해 "readline" 모듈을 import 해준다.
const readline = require("readline");

// 입력값을 받기 위한 인터페이스 객체
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 서버 파트 멤버 데이터
const members = [
  { name: "강한희", part: "Server", group: "OB" },
  { name: "고성용", part: "Server", group: "OB" },
  { name: "구건모", part: "Server", group: "YB" },
  { name: "권세훈", part: "Server", group: "YB" },
  { name: "김영권", part: "Server", group: "YB" },
  { name: "김은지", part: "Server", group: "YB" },
  { name: "김진욱", part: "Server", group: "YB" },
  { name: "김희빈", part: "Server", group: "OB" },
  { name: "남지윤", part: "Server", group: "YB" },
  { name: "문규원", part: "Server", group: "YB" },
  { name: "박나희", part: "Server", group: "OB" },
  { name: "박정현", part: "Server", group: "YB" },
  { name: "박현지", part: "Server", group: "OB" },
  { name: "변주현", part: "Server", group: "OB" },
  { name: "서호영", part: "Server", group: "OB" },
  { name: "설지원", part: "Server", group: "YB" },
  { name: "손시형", part: "Server", group: "YB" },
  { name: "안준영", part: "Server", group: "OB" },
  { name: "장서현", part: "Server", group: "OB" },
  { name: "오예원", part: "Server", group: "OB" },
  { name: "이다은", part: "Server", group: "OB" },
  { name: "이동근", part: "Server", group: "YB" },
  { name: "이솔", part: "Server", group: "OB" },
  { name: "이승헌", part: "Server", group: "YB" },
  { name: "이정은", part: "Server", group: "YB" },
  { name: "이제준", part: "Server", group: "YB" },
  { name: "정설희", part: "Server", group: "OB" },
  { name: "조윤서", part: "Server", group: "OB" },
  { name: "조재호", part: "Server", group: "YB" },
  { name: "조찬우", part: "Server", group: "YB" },
  { name: "주어진사랑", part: "Server", group: "YB" },
  { name: "주효식", part: "Server", group: "YB" },
  { name: "채정아", part: "Server", group: "OB" },
  { name: "최영재", part: "Server", group: "OB" },
  { name: "최유림", part: "Server", group: "YB" },
  { name: "최진영", part: "Server", group: "YB" },
  { name: "허유정", part: "Server", group: "YB" },
];

// 위의 member 데이터를 중 YB들만 구분하는 함수
const getYB = (members) => {
  let YBs = [];
  members.forEach((member) => {
    if (member.group == "YB") {
      YBs.push(member);
    }
  });
  return YBs;
};

// member 데이터 중 OB들만 구분하는 함수
const getOB = (members) => {
  let OBs = [];
  members.forEach((member) => {
    if (member.group == "OB") {
      OBs.push(member);
    }
  });
  return OBs;
};

// 리스트의 요소 순서들을 무작위로 바꾸어주는 함수 --> 피셔-예이츠 셔플(Fisher-Yates shuffle)
function shuffle(array) {
  for (let index = array.length - 1; index > 0; index--) {
    // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
    const randomPosition = Math.floor(Math.random() * (index + 1));
    // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
    const temporary = array[index];
    array[index] = array[randomPosition];
    array[randomPosition] = temporary;
  }
}

// 위에서 만든 함수를 활용하여, YB, OB를 구분해주고
const YBList = getYB(members);
const OBList = getOB(members);
// 각각의 리스트를 무작위로 재배열한다.
shuffle(YBList);
shuffle(OBList);

// 멤버, OB, YB들의 인원수를 저장한다.
const allMemberCount = members.length;
const YBcount = YBList.length;
const OBcount = OBList.length;

// 최종적으로 구성될 팀의 변수를 초기값 없이 선언해준다.
let teams;

console.log("서버 파트 총 인원 : ", allMemberCount);
console.log("서버 파트 OB 인원 : ", OBList.length);
console.log("서버 파트 YB 인원 : ", YBList.length);

let teamMemberCount; // 입력받을 조의 최대인원

console.log("\n조별 최대 인원을 입력해주세요.");

// rl은 event-driven 객체이기 때문에 가장 마지막에 rl.close(); 를 통해 입력이 끝났음을 알려주어야한다.
// 또한 사용자에게 값을 입력 받은 뒤에 buildTeam() 함수를 실행할 수 있도록 rl.on() 안에서 해당 함수가 실행되도록 해주었다.
rl.on("line", function (line) {
  teamMemberCount = Number(line);
  buildTeam();
  rl.close();
});

// 멤버들의 팀을 꾸리는 함수!
const buildTeam = () => {
  // Math.ceil = 소수점 이하 올림
  let groupCount = Math.ceil(allMemberCount / teamMemberCount);
  console.log(`\n이번 모임은 총 ${groupCount}개의 조로 이루어져 있습니다!\n`);

  // teams에 그룹의 수만큼의 원소를 가진 배열을 선언하고
  teams = new Array(groupCount);
  // for문을 통해 teams의 원소들에 배열을 한번 더 선언하여 2차 배열을 만들어준다.
  for (let i = 0; i < groupCount; i++) {
    teams[i] = new Array();
  }
  // 그렇게 생성된 배열은 다음과 같다
  // teams = [[1조],[2조],[3조],[4조]...]

  // OB, YB의 비율을 최대한 맞추어야하기 떄문에 우선 각 조마다 골고루 OB를 뿌려준다.
  // OB의 인원들을 하나하나 차례로 그룹에 넣어주고, 그룹보다 인원이 많은 경우가 당연히 많으니 모든 조에 OB가 한명씩 찼다면
  // 다시 1조부터 차례로 넣어주도록 하였다.
  for (let i = 0; i < OBcount; i++) {
    teams[i % groupCount].push(OBList[i]);
  }

  // 자신의 차례지만, 조에 들어가지 못하는 인원들을 위한 배열을 선언했다
  // 해당 배열의 사용은 아래에서 설명할 예정!
  surplus = new Array();

  // 각 조에 YB를 채워넣는 방법은 OB와 동일하다.
  // 하지만 하나 더 고려해야할 것은, 우리는 조에 들어갈 최대 인원을 체크해야한다는 점이다!
  // 그렇기에 for문 안에서, 해당 인원이 들어갈 조의 인원이 최대로 찼는지를 확인해주고
  // 자리가 남아있는 경우에만 push를 해주고, 자리가 다 찼다면 위에 만들어둔 surplus 배열로 push 해준다.
  for (let i = 0; i < YBcount; i++) {
    if (teams[i % groupCount].length != teamMemberCount) {
      teams[i % groupCount].push(YBList[i]);
    } else {
      surplus.push(YBList[i]);
    }
  }

  // YB까지 전부 조짜기를 완료했다면, 최종적으로 surplus 배열에 남아있는 사람이 있는지 확인한다.!
  // 한명이라도 있다면 아직 조를 배정받지 못한 사람이 있는 것이기 떄문에
  // 해당 인원을 확인하여, 조의 최대 인원을 다 채우지 않은 조에 차례로 배정한다.
  if (surplus.length != 0) {
    for (let i = 0; i < groupCount; i++) {
      if (teams[i].length < teamMemberCount && surplus.length != 0) {
        teams[i].push(surplus[0]);
        surplus.shift();
      }
    }
  }

  // 결과를 출력해준다!
  for (let team in teams) {
    console.log("====================");
    console.log(Number(team) + 1, "조");
    teams[team].forEach((member) => {
      console.log(`이름 : ${member.name} (${member.group})`);
    });
  }
  console.log("====================");
};

```

## Result

```javascript
서버 파트 총 인원 :  37
서버 파트 OB 인원 :  16
서버 파트 YB 인원 :  21

조별 최대 인원을 입력해주세요.
4 

이번 모임은 총 10개의 조로 이루어져 있습니다!

====================
1 조
이름 : 박현지 (OB)
이름 : 장서현 (OB)
이름 : 주효식 (YB)
이름 : 남지윤 (YB)
====================
2 조
이름 : 이다은 (OB)
이름 : 안준영 (OB)
이름 : 이제준 (YB)
이름 : 김은지 (YB)
====================
3 조
이름 : 채정아 (OB)
이름 : 오예원 (OB)
이름 : 김영권 (YB)
이름 : 조재호 (YB)
====================
4 조
이름 : 정설희 (OB)
이름 : 조윤서 (OB)
이름 : 이승헌 (YB)
이름 : 최진영 (YB)
====================
5 조
이름 : 서호영 (OB)
이름 : 김희빈 (OB)
이름 : 김진욱 (YB)
이름 : 이동근 (YB)
====================
6 조
이름 : 이솔 (OB)
이름 : 박나희 (OB)
이름 : 손시형 (YB)
이름 : 구건모 (YB)
====================
7 조
이름 : 변주현 (OB)
이름 : 이정은 (YB)
이름 : 조찬우 (YB)
이름 : 박정현 (YB)
====================
8 조
이름 : 강한희 (OB)
이름 : 주어진사랑 (YB)
이름 : 문규원 (YB)
====================
9 조
이름 : 최영재 (OB)
이름 : 허유정 (YB)
이름 : 설지원 (YB)
====================
10 조
이름 : 고성용 (OB)
이름 : 최유림 (YB)
이름 : 권세훈 (YB)
====================
```

# 내가 새로 알게된 친구들 :fire::fire::fire:

## 1. Math

math는 수학에서 사용되는 상수나 함수들을 구현해놓은 객체이다!  
이번 과제를 하면서 사용하거나, 알게된 Math 메소드들이 몇개 있다.  

- Math.ceil : 소수점 이하 올림

- Math.floor : 소수점 이하 버림

- Math.round : 소수점 이하 반올림

- Math.randon() : 0 이상 1 미만의 부동소수점 숫자를 무작위로 반환한다. 

  ```javascript
  Math.random(); // 기본 랜덤 메소드 호출, 0.9569793562433155 
  (Math.random() * 10).toFixed(); // 0 ~ 10 랜덤 수 리턴(문자열) 
  Math.round((Math.random() * 10)); // 0 ~ 10 랜덤 수 리턴(number)
  ```

  

## 2. random 함수를 이용한 배열 섞기

level3 과제에서는 조를 무작위로 짜내야하는데, 처음에는 지금 짠 코드랑 다르게 구현을 하려고 했다.  
OB 인원을 분리해놓은 배열 OBList을 두고, 새로운 배열 NewOBList를 하나 더 선언 한뒤,  
random함수를 사용해서 임의의 index를 구해 OBList에서 해당 인덱스의 원소를 slice하여  NewOBList에 push 하는 방식 이었다. 

그런데 문득, 아니 그냥 원래 있던 배열을 섞어버리면 안되나? 하는 생각이 들어 방법이 있나 구글링을 해보았다.  
그렇게 발견한게 바로, sort()를 활용한 방식이었다.

### sort() 메소드를 사용하여 배열 요소 무작위로 섞기

```javascript
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

let arr = [1, 2, 3];
shuffle(arr);
```

sort()를 사용하면 배열의 요소를 어렵지 않게 섞을 수 있다.  
기본적으로 `sort()`함수는 기본적으로 배열 원소를 차례로 반복해서 비교해서 무엇이 큰지 작은지를 확인하여 소팅하는데,   
`Math.random() - 0.5`는 음수와 양수 둘 중 하나를 결과로 출력하기 때문에, 해당 정렬함수는 무작위로 요소를 정렬하게 된다.  
활용도 간단하고 코드도 짧지만, 나는 이 방법을 사용하지 않았다.   

**그 이유는 ??!**  

모던 자바 스크립트 튜토리얼에 나와있는 설명을 보면, sort() 메소드는 셔플을 위해 만들어진 메소드가 아니기 때문에 균일한 빈도로 랜덤정렬을 시킬수 없다고 한다. 그렇기 때문에 이를 고려하여, 보다 균일한 빈도수로 랜덤한 배열을 얻어내기위해 `피셔 에이츠 셔플 알고리즘 (Fisher-Yates Shuffle)` 사용을 추천하고 있다.

### 피셔 에이츠 셔플 알고리즘 (Fisher-Yates Shuffle)을 사용하여 배열 요소 무작위로 섞기

```javascript
// 리스트의 요소 순서들을 무작위로 바꾸어주는 함수 --> 피셔-예이츠 셔플(Fisher-Yates shuffle)
function shuffle(array) {
  for (let index = array.length - 1; index > 0; index--) {
    // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
    const randomPosition = Math.floor(Math.random() * (index + 1));
    // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
    const temporary = array[index];
    array[index] = array[randomPosition];
    array[randomPosition] = temporary;
  }
```

이름은 그럴듯 하지만, 코드를 보면 알 수 있듯 과정은 간단하다.  
배열의 끝 요소부터 시작해, 하나씩 앞으로 나아가면서 random함수로 구현한 무작위 인덱스와 해당 인덱스의 요소를 바꿔치기 하는것이다.  
sort() 를 사용하는 것에 비해 성능적으로도 더 효율적이라고 하는데.. 
사실 나는 무지성 코딩을 하였기 때문에,, 과연 이런 성능적 효율을 얻었을지는 의문이다 .. ㅎ (코드리뷰해주세여~)

## 3. 콘솔로 값을 입력받아 사용하기!

나는 JS 언어에 아직 많이 낯선 편인데, 사용하다보니 콘솔을 통해 값을 입력받는데에 그렇게 친절한 언어가 아닌 것 같다고 느꼈다..  
level3 풀이를 하면서 조의 최대인원을 입력받아 조를 짜고 싶었기에, 콘솔을 통해 값을 입력받는 법을 찾아보게 되었다.  

코드의 주석을 보면 알 수 있겠지만, 나는 readline이라는 내장 모듈을 사용했다.  

```javascript

rl.on("line", function (line) {
  teamMemberCount = Number(line);
  buildTeam();
  rl.close();
});
```

여기서 중요한건 line 과  close() 이다.  
line은 한 줄이 입력되는 이벤트, close는 입력이 끝났음을 알려주는 명령어이다.   
readline모듈의  rl객체는 event-driven 객체이기 때문에 가장 마지막에 rl.close(); 를 통해 입력이 끝났음을 알려주어야한다.  
또한 사용자에게 값을 입력 받은 뒤에 buildTeam() 함수를 실행할 수 있도록 rl.on() 안에서 해당 함수가 실행되도록 해주었다.  

조를 짜는 프로그램은, 입력받은 수가 있어야만 가능하기 때문에 로직의 순서가 더욱 중요하다!  
파이썬 같은 언어였다면 아무 걱정없이 순서대로 주르륵 코딩하면 되겠지만,  
우리는 골때리는 JS를 사용하기 때문에!  
Js의 event-driven 라는 특징을 매번 염두에 두고 코드를 짜야한다 ㅠ

---

## 참고 사이트

- **배열 셔플하기**  
  [sort()와 셔플 알고리즘 설명](https://ko.javascript.info/task/shuffle)  
  [sort()와 셔플 알고리즘 설명2](https://taesung1993.tistory.com/54 ) 
  [sort함수를 활용한 배열 셔플의 원리 설명!](https://forum.freecodecamp.org/t/how-does-math-random-work-to-sort-an-array/151540 ) 

- **sort() 함수**  
  [sort()의 원리](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)  
- **콘솔창에서 값 입력받기**  
  [readline 모듈을 사용해 값 입력받기](https://bluehorn07.tistory.com/49)

