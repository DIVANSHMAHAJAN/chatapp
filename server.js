if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express=require('express');
const app=express();
const http=require('http');
const path=require('path');
const socketio = require('socket.io');
const server=http.createServer(app);
const io = socketio(server);
const formatMessage=require('./utils/messages');
app.use(express.static(path.join(__dirname,'public')));
const botname='CHATCORD BOT';
const {userjoin,currentuser,userleave,
	getRoomUsers}=require('./utils/users');
io.on('connection',socket=>
{
	socket.on('joinroom',({username,room})=>
	{
const user=userjoin(socket.id,username,room);
socket.join(user.room);
socket.emit('message',formatMessage(botname,'Welcome to ChatCord!'));
socket.broadcast.to(user.room).emit('message',formatMessage(botname,` ${username} has joined chat `));
//send user info
io.to(user.room).emit('roomUsers',{
	room:user.room,
	users:getRoomUsers(user.room)
})
	})
	

    
    //listen for chat-msg
    socket.on('chatMessage',msg=>
    {
    	 const user = currentuser(socket.id);
          console.log(user);
    io.to(user.room).emit('message', formatMessage(user.username, msg));
    })
    	//discoonect
    	socket.on('disconnect',()=>
    {
    	 const user = userleave(socket.id);
    	 if(user)
    	 {
    	io.to(user.room).emit('message',formatMessage(botname,`${user.username}  has left`));
        io.to(user.room).emit('roomUsers',{
	room:user.room,
	users:getRoomUsers(user.room)
})
    }})
})

const port = process.env.PORT || 4000;

server.listen(port,()=>
{
	console.log("jhjh");
})