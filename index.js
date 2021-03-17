require("dotenv").config();
require("./connect-mongodb");
const express = require("express");
const bodyParser = require("body-parser");
const authService = require("./authService");
const routers = require("./routers/index");
const eventRouter = require("./routers/eventRoutes");
const guestRouter = require("./routers/guestRoutes");
const ticketRouter = require("./routers/ticketRoutes");
// const hbs = require('nodemailer-handlebars');
// const cors = require('cors');
// const expbs = require('express-handlebars')

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.static("public"));

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// app.use(cors)
app.use(bodyParser.json());
// app.use('/api/v1/user', authService.authenticateToken);

app.use(routers);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/guests", guestRouter);
app.use("/api/v1/tickets", ticketRouter);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status(404);
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    stack: err.stack,
  });
  // res.render('error', { error: err })
});

app.listen(PORT, (err) => {
  err
    ? console.error(err.message)
    : console.log(`Server listening on port: ${PORT}`);
});
