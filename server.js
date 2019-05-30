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
let messages = [welcomeMessage]


app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.post('/messages',function(request,response){
  const message = request.body;
  if(message== undefined && null){
     return res.status(400) 
  }
  message.id = messages.length;
  
  messages.push(message);
});

app.get('/messages',function(request,response){
  response.send(JSON.stringify(messages));
});
app.delete('/messages/:messageId',function(request,response){
     const messageId = request.params.messageId;
     messages = messages.filter(message=>{ 
     return message.id!= messageId;
       
});
}
  
  
           );
app.listen(process.env.PORT);