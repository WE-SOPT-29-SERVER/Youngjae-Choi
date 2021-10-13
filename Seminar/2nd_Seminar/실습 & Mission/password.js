const fs = require("fs");
const crypto = require("crypto");

const salt = "QxLUF1bglAdeQXbv5PehSMfV11CdYYLmfY6lehjZMQ";
const iterations = 100000;
const keylen = 64;
const digest = "sha512";
// pbkdf2 에서 콜백으로 파일을 생성하도록 함
const callback = (err, derivedKey) => {
  if (err) throw err;
  const hashed = derivedKey.toString("hex");

  fs.writeFile(`hashed.txt`, hashed, (err, data) => {
    if (err) return console.log(err.message);
    console.log(`hashed.txt 생성 완료`);
  });
};

let password;
fs.readFile(`password.txt`, (err, data) => {
  if (err) return console.log(err.message);
  // 파일의 내용(비밀번호)를 받아와서
  password = data;
  // 해싱한뒤 콩백으로 파일을 생성한다.
  crypto.pbkdf2(password, salt, iterations, keylen, digest, callback);
});
