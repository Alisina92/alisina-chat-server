const express = require("express");


const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.urlencoded({extended:false}));
app.use(express.json());
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
  if(message.text ===undefined || message.from === undefined){
     return response.status(400);
  }
  message.id = messages.length;
  
  messages.push(message);
});


app.put('/messages/:id',function(request,response){
  const id = request.params.id;
  id = parseInt(id);
  let excistingMessage = messages.find(messages=>{
    return messages.id == id;
  });
   
});

app.get('/messages',function(request,response){
  response.send(JSON.stringify(messages));
});
app.delete('/messages/:messageId',function(request,response){
     const messageId = request.params.messageId;
     messages = messages.filter(message=>{ 
     return message.id!= messageId;
       
});
});

app.get('/messages/search?text=express',function(request,responce){
   const message = request.body;
  if(message.text === 'express'){
     return messages.push(message);
  }else if(message.text !='express'){
   return messages.filter(message);
  }
  });
app.get('/messages/latest',function(request,responce){
 const message = request.body;
  if(message.text>10){
   return messages.filter(message);
  }else{
    return messages.push(message);
  }
});

app.listen(process.env.PORT);