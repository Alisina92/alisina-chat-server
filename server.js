const express = require("express");


const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.urlencoded({extended:false}));

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

app.post('/messages',function(request,response){
  const message = request.body;
  message.id = messages.length;
  messages.push(message);
});

app.get('/messages',function(request,response){
  response.send(JSON.stringify(messages));
});
app.delete('messages/:messagesId',function(request,response){
     response.delete(messages.prams)
}
  
           );
app.listen(process.env.PORT);