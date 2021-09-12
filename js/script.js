const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageinput = document.getElementById('msg');
const messagecontainer = document.querySelector('.container');
const ting = new Audio('../ting.mp3')
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    if(position != 'right'){
        ting.play();
    }
    container.append(messageElement);
}
const Name = prompt("Enter your name to join");

socket.emit('new-user-joined', Name);

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = msg.value;
    append(`you: ${message}`, "right");
    socket.emit('send', message);
    msg.value = "";
});
socket.on('user-joined', name=>{
    append(`${name} joined the chat`, 'left');
});

socket.on('receive', data=>{
    append(`${data.name}: ${data.message}` , 'left');
});

socket.on('left', data=>{
    append(`${data} left the chat` , 'left');
});
