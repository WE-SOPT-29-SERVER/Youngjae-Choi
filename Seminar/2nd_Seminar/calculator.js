function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

const calculator = {
  add,
  subtract,
  multiply,
  divide,
};

module.exports = calculator;

// 아래와 같이 바로 exports 해주는 것도 가능!
// module.exports = {
//     add,
//     substract,
//     multiply,
//     divide,
//   };
