const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io  = socketio(server);
const path = require('path');
const users = {};
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,"public")));

app.get('/',function(req,res){
    res.render("index");
})

io.on("connection",function(socket){
    console.log("User got connected");
    socket.on("message",function(msg,username){
        socket.broadcast.emit("message",msg,username);
    })
    socket.on("name",function(name){
        socket.broadcast.emit("name",name);
        users[socket.id] = name;
        console.log(users[socket.id],users);
    })
})
io.on("disconnect",function(socket){
    socket.on("disconnection",function(name){
        console.log("The user",name,"got disconnected");
        socket.broadcast.emit("disconnection",name);
    })
})

server.listen(3000,function(){
    console.log("Server listening at port 3000...")
})