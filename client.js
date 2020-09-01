const socket=io('http://localhost:8000')

const form=document.getElementById('snd')
const msgip=document.getElementById('msginp')
const messagec=document.querySelector(".container")

var audio=new Audio("ding.mp3")

const append=(message, position)=>{
const messageelement=document.createElement("div");
messageelement.innerText= message;
messageelement.classList.add("message");
messageelement.classList.add(position);
messagec.append(messageelement);
if (position == "left") {
    audio.play();
}
}
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const message=msgip.value;
    append(`You:${message}`,'right')
    socket.emit("send",message)
    msgip.value=" "
    

})

const name=prompt("Enter Your Name");
socket.emit('new-user-joined',name);

socket.on("user-joined", name=>{
append(`${name} joined the chat`,"right");
})
socket.on("recieve", data=>{
append(`${data.name}: ${data.message}`,"left");
})
socket.on("left", name=>{
append(`${name} left the chat `,"left");
})