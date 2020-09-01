const io = require("socket.io")(8000)
const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined',name=> {  //socket on when recieve any event
        // console.log("New User",name)
         users[socket.id]=name;    // new userjoines and its name is his id
        socket.broadcast.emit("user-joined",name); // msg to all except the user

    })
    socket.on("send", message=>{  //when someone send msg
socket.broadcast.emit("recieve",{message: message, name: users[socket.id]})  //socket broadcast to send any msg
    })
    socket.on("disconnect", message=>{  //when someone send msg
socket.broadcast.emit('left', users[socket.id])  //socket broadcast to send any msg
delete users[socket.id];
    })
})