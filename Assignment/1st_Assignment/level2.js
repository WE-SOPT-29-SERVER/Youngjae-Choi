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