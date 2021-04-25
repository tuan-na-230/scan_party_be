require("dotenv").config();
require("./connect-mongodb");
const http = require("http");
const path = require("path")
const express = require("express");
const bodyParser = require("body-parser");
const routers = require("./routers/index");
const eventRouter = require("./routers/eventRoutes");
const guestRouter = require("./routers/guestRoutes");
const ticketRouter = require("./routers/ticketRoutes");
const fileUploadRouter = require("./routers/uploadRoutes");
const ticketTemplateRouter = require("./routers/ticketTemplateRoutes");
const chatHandler = require("./modules/Chat");
const ticketHandler = require("./modules/ticket");

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

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

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.use(routers);
app.use("/api/v1/events",  eventRouter);
app.use("/api/v1/guests", guestRouter);
app.use("/api/v1/tickets", ticketRouter);
app.use("/api/v1/files", fileUploadRouter);
app.use("/api/v1/ticket-template", ticketTemplateRouter);

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
});

const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', socket => {
  console.log('new connect...');
  //run when client disconnects
  socket.on('disconnect', () => {
      io.emit('message', 'A user has left the chart')
  })

  //listen change
  socket.on('updateListMessage', async (chatId, newMessage) => {
      const newListMessage = await chatHandler.updateListMessage(chatId, newMessage);
      io.emit('listChat', newListMessage)
  })

  //get list chart
  socket.on('getListChat' , async (chatId) => {
      const listChat = await chatHandler.getListChat(chatId);
      return io.emit('listChat', listChat);
  })

  socket.on('activeUser', (aliasName) => {
      arrActiveUser.push(aliasName)
  })

  socket.on('scanTicket', async (data) => {
      const guestData = await ticketHandler.ScanTicketReal(data);
      const result = await ticketHandler.getTicketUser(data);
      socket.emit('scanTicket', guestData)
      io.emit('userJoin', result)
  })

  socket.on('userJoin', async (eventId) => {
      const result = await ticketHandler.getTicketUser(eventId);
      io.emit('userJoin', result)
  })
})

server.listen(PORT, function () {
  console.log(`listening on port ${PORT}`)
})