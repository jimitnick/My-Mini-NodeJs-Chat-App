const socket = io();

const btn = document.getElementById("send");
const message = document.getElementById("inputBox");
var Mess = document.querySelector("#middle");
var top = document.getElementById("top");
const append =  (message,pos) => {
    const messageElem = document.createElement('div');
    messageElem.innerText = message;
    messageElem.classList.add('message');
    messageElem.classList.add(pos);
    Mess.append(messageElem);
}
const appendName =  (name) => {
    const messageElem = document.createElement('div');
    messageElem.innerText = name;
    top.appendChild(messageElem);
}

var username = prompt("Enter you name : ");
socket.emit("name",username);
socket.on("name",function(name){
    // top.innerText = name;
    append(`${name} joined the chat`, "left");
})
btn.addEventListener('click',function(){
    socket.emit("message",message.value,username); 
    append(`You : ${message.value}`,"right");
    message.value = "";
})

message.addEventListener('keypress',function(event){
    if (event.key == "Enter" && message.value != ""){
        socket.emit("message",message.value,username); 
        append(`You : ${message.value}`,"right");
        message.value = "";
    }
    
})

socket.on("message",function(msg,name){
    console.log("The message from server is",msg);
    append(`${name} : ${msg}`,"left");
})

socket.emit("disconnection",username);
socket.on("disconnection",function(name){
    append(`${name} left the chat`,"left");
})