/**
 * 우선 YB,OB를 구분하여 리스트를 만든다.
 * 랜덤 함수를 활용하여 위에 만든 OB,YB 리스트의 순서을 섞어준다.
 *
 * 원하는 조별 최대 인원을 정수로 입력받는다!
 * 그럼 총 몇개의 조가 짜여지는지 알 수 있는데, 그 조의 개수만큼 빈 배열을 만든다.
 *
 * 이후 OB 먼저 각 조에 배치하고, 이어서 YB들을 이어서 조에 차례로 배치해준다.
 * 만일 해당 조의 최다 인원이 다 차 있는 경우에는, 자리가 남은 곳에 YB 인원을 배치시킨다.
 */

// members 데이터 import
import members from "./members.js";

// 입력값을 받기 위해 "readline" 모듈을 import 해준다.
import readline from "readline";

// 입력값을 받기 위한 인터페이스 객체
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// // 서버 파트 멤버 데이터
// const members = [
//   { name: "강한희", part: "Server", group: "OB" },
//   { name: "고성용", part: "Server", group: "OB" },
//   { name: "구건모", part: "Server", group: "YB" },
//   { name: "권세훈", part: "Server", group: "YB" },
//   { name: "김영권", part: "Server", group: "YB" },
//   { name: "김은지", part: "Server", group: "YB" },
//   { name: "김진욱", part: "Server", group: "YB" },
//   { name: "김희빈", part: "Server", group: "OB" },
//   { name: "남지윤", part: "Server", group: "YB" },
//   { name: "문규원", part: "Server", group: "YB" },
//   { name: "박나희", part: "Server", group: "OB" },
//   { name: "박정현", part: "Server", group: "YB" },
//   { name: "박현지", part: "Server", group: "OB" },
//   { name: "변주현", part: "Server", group: "OB" },
//   { name: "서호영", part: "Server", group: "OB" },
//   { name: "설지원", part: "Server", group: "YB" },
//   { name: "손시형", part: "Server", group: "YB" },
//   { name: "안준영", part: "Server", group: "OB" },
//   { name: "장서현", part: "Server", group: "OB" },
//   { name: "오예원", part: "Server", group: "OB" },
//   { name: "이다은", part: "Server", group: "OB" },
//   { name: "이동근", part: "Server", group: "YB" },
//   { name: "이솔", part: "Server", group: "OB" },
//   { name: "이승헌", part: "Server", group: "YB" },
//   { name: "이정은", part: "Server", group: "YB" },
//   { name: "이제준", part: "Server", group: "YB" },
//   { name: "정설희", part: "Server", group: "OB" },
//   { name: "조윤서", part: "Server", group: "OB" },
//   { name: "조재호", part: "Server", group: "YB" },
//   { name: "조찬우", part: "Server", group: "YB" },
//   { name: "주어진사랑", part: "Server", group: "YB" },
//   { name: "주효식", part: "Server", group: "YB" },
//   { name: "채정아", part: "Server", group: "OB" },
//   { name: "최영재", part: "Server", group: "OB" },
//   { name: "최유림", part: "Server", group: "YB" },
//   { name: "최진영", part: "Server", group: "YB" },
//   { name: "허유정", part: "Server", group: "YB" },
// ];

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

// filter를 사용하여 YB, OB를 구분해준다.
let YBList = members.filter((member) => member.group == "YB");
let OBList = members.filter((member) => member.group == "OB");

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
  //   그렇게 생성된 배열은 다음과 같다
  // teams = [[1조],[2조],[3조],[4조]...]

  // OB, YB의 비율을 최대한 맞추어야하기 떄문에 우선 각 조마다 골고루 OB를 뿌려준다.
  // OB의 인원들을 하나하나 차례로 그룹에 넣어주고, 그룹보다 인원이 많은 경우가 당연히 많으니 모든 조에 OB가 한명씩 찼다면
  // 다시 1조부터 차례로 넣어주도록 하였다.
  for (let i = 0; i < OBcount; i++) {
    teams[i % groupCount].push(OBList[i]);
  }

  // 자신의 차례지만, 조에 들어가지 못하는 인원들을 위한 배열을 선언했다
  // 해당 배열의 사용은 아래에서 설명할 예정!
  let surplus = new Array();

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
