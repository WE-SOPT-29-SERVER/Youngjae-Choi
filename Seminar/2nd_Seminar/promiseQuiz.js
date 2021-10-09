const members = require("./members");
// import members from "./members.js";

const getOnline = (members) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const OnlineList = members.filter(
        (member) => member.location === "online"
      );
      resolve(OnlineList);
    }, 500);
  });
};

const getOffline = (members) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const OfflineList = members.filter(
        (member) => member.location === "offline"
      );
      resolve(OfflineList);
    }, 500);
  });
};

const getYB = (members) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const YBList = members.filter((member) => member.group === "YB");
      resolve(YBList);
    }, 500);
  });
};

const getOB = (members) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const OBList = members.filter((member) => member.group === "OB");
      resolve(OBList);
    }, 500);
  });
};

getOnline(members).then(getOB).then(console.log);

// getYB().then().then();
