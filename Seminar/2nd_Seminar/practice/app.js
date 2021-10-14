const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Route 폴더들을 import 하는 구간
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

// app이라는 변수에 express의 모든 것을 담아준다.
// 여기서부터 express가 시작된다!
const app = express();

// view engine setup
// set은 설정할때 사용하는거, (하지만 우라는 거의 안쓸것)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// use는 middleware 를 사용할 떄 쓰는 것.
// 우리는 이걸 제일 많이 쓸 예정.
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
// app.js에서 export 되는 app이라는 객체는 express 를 담고 있다. (app = express())
// 현재 express는  위에 잔뜩 use 해놓은 미들웨어들을 적용한 상태이다.
// 다양한 미들웨어가 적용된 express가 export 되고
// /bin/www 에서 import되어 서버를 띄우는 것
