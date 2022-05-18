require('dotenv').config()
const path = require('path');
const CLIENT_DIR = path.join(__dirname, 'client') || process.env.CLIENT_DIR
const indexHtml = path.join(CLIENT_DIR+'/index.html')
process.env.root = __dirname

const passport = require('passport');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const socketConf = require('./sockets')
const mongoose = require('mongoose')
const session = require('express-session');
const sharedsession = require("express-socket.io-session");

const authUserSocketMid = require('./sockets/middlewares/authUser');
const { runInNewContext } = require('vm');
let mongoUrl = process.env.PORT ? process.env.PRODUCTION_DB_URL : process.env.LOCAL_DB_URL
var conn = mongoose.connect(mongoUrl)
require('./models/Users')
require('./models/Chats')
const sessionMiddleware = session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
});

// express app config
app.use(sessionMiddleware)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport');
app.use('/api/v1',require('./routes/v1'));
app.use(express.static(CLIENT_DIR));


app.get('/*',(req,res)=>{
  res.send('done')
  console.log(req.cookies)
  console.log(req.user);
  // res.sendFile(indexHtml)
})

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
const userSocket = io.of('/user') 
userSocket.use(wrap(sessionMiddleware));
userSocket.use(wrap(passport.initialize()))
userSocket.use(wrap(passport.session()))


// io.use(sharedsession(sessionMiddleware));
userSocket.on('connection',(socket)=>{
  console.log(socket.request.user);
  console.log('An authenticated user connected');
   socket.on('helo',(data)=>{
    socket.request.session.reload()
    // console.log(socket.rooms);
    // socket.emit('logo')
    // io.sockets.to(socket.id).emit('logo','sdf')
    console.log(socket.id,' to ',data.id);

    socket.to(data.id).emit('logo');
  })
  
  socket.on('disconnect', () => {
    // console.log('Authenticated user disconnected');
  });
})






io.on('connection', (socket) => {
  console.log('A unknown client connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });



  
  
  server.listen(8000, () => {
    console.log('listening on *:8000');
  });
