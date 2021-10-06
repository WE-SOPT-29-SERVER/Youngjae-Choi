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

let allMemberCount = members.length;

const getYB = (members) => {
  let YBs = [];
  members.forEach((member) => {
    if (member.group == "YB") {
      YBs.push(member);
    }
  });
  return YBs;
};

const getOB = (members) => {
  let OBs = [];
  members.forEach((member) => {
    if (member.group == "OB") {
      OBs.push(member);
    }
  });
  return OBs;
};

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

const YBList = getYB(members);
const OBList = getOB(members);
shuffle(YBList);
shuffle(OBList);
const YBcount = YBList.length;
const OBcount = OBList.length;

let teams;

console.log("서버 파트 총 인원 : ", allMemberCount);
console.log("서버 파트 OB 인원 : ", OBList.length);
console.log("서버 파트 YB 인원 : ", YBList.length);

const { type } = require("os");
const readline = require("readline");

// 인터페이스 객체를 만들자.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let teamMemberCount; // 조의 최대인원을 정해보자
rl.on("line", function (line) {
  teamMemberCount = Number(line);
  buildTeam();
  rl.close();
});

const buildTeam = () => {
  // Math.ceil = 소수점 이하 올림
  // Math.floor = 소수점 이하 버림
  // Math.round = 소수점 이하 반올림

  let groupCount = Math.ceil(allMemberCount / teamMemberCount);
  console.log("그룹의 수 : ", groupCount);

  teams = new Array(groupCount);
  surplus = new Array();
  for (let i = 0; i < groupCount; i++) {
    teams[i] = new Array();
  }

  for (let i = 0; i < OBcount; i++) {
    teams[i % groupCount].push(OBList[i]);
  }

  for (let i = 0; i < YBcount; i++) {
    if (teams[i % groupCount].length != teamMemberCount) {
      console.log("YBList[i] : ", YBList[i]);
      teams[i % groupCount].push(YBList[i]);
    } else {
      surplus.push(YBList[i]);
    }
  }

  if (surplus.length != 0) {
    console.log("surplus : ", surplus);
    for (let i = 0; i < groupCount; i++) {
      if (teams[i].length < teamMemberCount && surplus.length != 0) {
        console.log("현재 surplus : ", surplus.length);
        teams[i].push(surplus[0]);
        surplus.pop();
      }
    }
  }
  console.log(teams);
};

/**
 * 우선 변수 두개 만들어 YB,OB. 그리고 소팅해서 리스트를 만든다.
 * 랜덤 함수를 화용해서 위에 만든 OB,YB 리스트의 요소들을 섞어준다.
 *
 * 원하는 조별 최대 인원을 정수로 입력받는다, 그럼 총 몇개의 조가 짜여지는지 알 수 있다.
 * 그럼 그 조의 개수만큼 빈 배열을 만든다.
 *
 * 이후 OB 먼저 각 조에 배치하고, 이어서 YB들을 이어서 조에 차례로 배치해준다.
 * 만일 해당 조의 최다 인원이 다 차 있는 경우에는, 자리가 남은 곳에 YB 인원을 배치시킨다.
 */
