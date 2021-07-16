const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const socket=io();
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
//Get username and room form URL
const {username,room}=Qs.parse(location.search,{
	ignoreQueryPrefix:true
});
socket.emit('joinroom',{username,room});
socket.on('message',message=>
{
	console.log(message)
	outputMessage(message);
     // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
})
socket.on('roomUsers',({room,users})=>
{
outputRoomName(room);
outputUsers(users);
})



chatForm.addEventListener('submit', (e)=>
{
e.preventDefault();
 let msg = e.target.elements.msg.value;
 //emit mesage to server

 console.log("submittiung");

 socket.emit('chatMessage', msg);
 e.target.elements.msg.value="";
 e.target.elements.msg.focus();
})
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML=`<p class="meta"> ${message.username} <span>${message.time}</span></p>
  <p class="text">
  ${message.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../index.html';
  } 
});