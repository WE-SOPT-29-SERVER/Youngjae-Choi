const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
numbers.sort(() => -0.5);
console.log(numbers);
numbers.sort(() => -0.3);
console.log(numbers);
numbers.sort(() => -0.1);
console.log(numbers);
// for (let i = 0; i < 100; i++) {
//   //   console.log(Math.random() - 0.5);
//   shuffle(numbers);
//   console.log(numbers);
// }

// function shuffle(array) {
//   array.sort(() => Math.random() - 0.5);
// }
// shuffle(numbers);
// console.log(numbers);
