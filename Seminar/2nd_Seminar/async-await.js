// promise를 반환하는 두개의 함수
// resolve시 '함수이름 : 인자'를 반환한다
let asyncFunc1 = (msg) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`func1: ${msg}`);
    }, 1000);
  });
};

let asyncFunc2 = (msg) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`func2: ${msg}`);
    }, 2000);
  });
};

// Promise를 사용하는 방법
const promiseMain = () => {
  asyncFunc1("Hello")
    .then((result) => {
      console.log(result);
      return asyncFunc2("world");
    })
    .then((result) => {
      console.log(result);
    });
};

// Async & Await을 사용하는 방법
const asyncMain = async () => {
  let result = await asyncFunc2("Hello");
  console.log(result);

  result = await asyncFunc2("world");
  console.log(result);
};

// promiseMain();
asyncMain();
