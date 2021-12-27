const sum = require("./sum");
const calculator = require("./calculator");

const result = sum(1, 3);
console.log("sum result : ", result);

const addResult = calculator.add(1, 3);
const subtractResult = calculator.subtract(1, 3);
const multiplyResult = calculator.multiply(1, 3);
const divideResult = calculator.divide(1, 3);

console.log(
  "result : ",
  addResult,
  subtractResult,
  multiplyResult,
  divideResult
);
