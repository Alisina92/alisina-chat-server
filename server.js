const express = require("express")();
const http = require('http').server(express);
const io = require('socket.io')(http);
const cors = require('cors');
const app = express();

app.use(cors())

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!"
}

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage]


app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket){
 socket.on('chat',function(msg){
   io.emit('chat',msg);
 });
 });
io.on('disconnect',function(){
  console.log("user disconnected");
});      
  
http.listen(3000,function(){
     console.log("listening on the localhost3000");
});


