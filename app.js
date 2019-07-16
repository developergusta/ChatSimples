var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clients = {};

var online = [];



app.set('view engine', 'html');
app.use(express.static(__dirname + '/assets'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
  
});

//SocketIO vem aqui

http.listen(80, function(){
  console.log('listening on port 80');
});

io.on("connection", function (client) {
 
client.on("join", function(name){
    
   
    console.log("Joined: " + name);
    clients[client.id] = name;
    online.push(name);
    
    client.emit("update", "You have connected to the server.");  
    var msg = name + " has joined the server.";
    var dados = {"pessoas" : online , "nome": name, "mensagem" : msg };
   
    client.broadcast.emit("update", dados);
    
  });

client.on("send", function(msg){
  
  
  
  console.log("Message: " + msg);
    client.broadcast.emit("chat", clients[client.id], msg);
  
});
  
client.on("disconnect", function(){
    
  
  
    console.log("Disconnect");
    io.emit("update", clients[client.id] + " has left the server.");
    delete clients[client.id];
  
  });
});
