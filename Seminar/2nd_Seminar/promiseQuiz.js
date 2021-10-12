const members = require("./members");

const getOnline = (members) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const onlineList = members.filter(
        (member) => member.location === "online"
      );
      resolve(onlineList);
    }, 500);
  });
};

const getOffline = (members) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const offlineList = members.filter(
        (member) => member.location === "offline"
      );
      resolve(offlineList);
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

// promise Chaining으로 구현
getOnline(members)
  .then((x) => getOB(x))
  .then(console.log);
getOffline(members).then(getYB).then(console.log);

// Async & Await 으로 구현
const getOnlineOBWithAsync = async (members) => {
  const onlineMembers = await getOnline(members);
  const onlineOBMembers = await getOB(onlineMembers);
  console.log(onlineOBMembers);
};

const getOfflineYBWithAsync = async (members) => {
  const offlineMembers = await getOffline(members);
  const offlineYBMembers = await getYB(offlineMembers);
  console.log(offlineYBMembers);
};

getOnlineOBWithAsync(members);
getOfflineYBWithAsync(members);
