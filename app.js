var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// var indexRouter = require("./routes/index");
var dishRouter = require("./routes/dishRouter");
var promotionRouter = require("./routes/promotionRoute");
var leaderRouter = require("./routes/leaderRoute");
var toppingRouter = require("./routes/toppingRouter");
var cakeRouter = require("./routes/cakeRouter");

var app = express();
const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/ConFusion";
const connect = mongoose.connect(url);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);

app.use("/dishes", dishRouter);
app.use("/toppings", toppingRouter);
app.use("/cakes", cakeRouter);
app.use("/promotions", promotionRouter);
app.use("/leaders", leaderRouter);

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

connect.then(
  (db) => {
    console.log("Connected correctly to the server");
  },
  (err) => {
    console.log(err);
  }
);

module.exports = app;
