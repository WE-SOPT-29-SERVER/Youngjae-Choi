const promise = new Promise(function (resolve, reject) {
  const age = 25;
  if (age > 20) {
    resolve(age);
  } else {
    reject(new Error("나이가 너무 어립니다"));
  }
});

promise
  // Fulfilled일 시 값 : resolve()안에 있으며, .then()으로 전달
  .then((resolvedData) => {
    console.log(resolvedData);
  })
  // Rejected일 시 값 : reject()안에 있으며, .catch()로 전달
  .catch((err) => {
    console.log(err);
  });
