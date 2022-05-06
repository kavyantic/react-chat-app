var path = require('path');
var cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(require('./routes'));

app.get('/home',(req,res)=>{
    console.log('touched');
})
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})


  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
  
  
  server.listen(8000, () => {
    console.log('listening on *:8000');
  });
