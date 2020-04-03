const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const { createChat, createUser } = require('./utils/creators')

let connectedUsers = {}
let messages = [];
let initialChat = createChat()

io.on('connection', socket => {

    console.log(`[server] connected ${socket.id}`);

    socket.on('login', ({ username }) => {
        console.log(`[server] login: ${username}`);

        const user = createUser({ name: username, socketId: socket.id, })
        socket.username = user.name
        connectedUsers = addUser(connectedUsers, user)

        io.emit('users.login', connectedUsers);
    });

    socket.on('disconnect', () => {
        console.log(`[server] disconnected: ${socket.username}`);

        connectedUsers = removeUser(connectedUsers, socket.username)

        io.emit('users.disconnect', connectedUsers); 
    });

    socket.on('logout', () => {
        console.log(`[server] logout: ${socket.username}`);

        connectedUsers = removeUser(connectedUsers, socket.username)

        io.emit('users.logout', connectedUsers); 

    });

    socket.on('message', ({ message, chatId }) => {
        console.log(`[server] message: ${message}`);

        const messageCreate = {
            id: messages.length,
            message,
            username: socket.username,
            chatId: chatId
        };
        messages.push(messageCreate);

        io.emit('messages.new', messageCreate);
    });

    socket.on('initChat', () => {
        io.emit('initChat.true', initialChat)
    })

    socket.on('private.message', ({ user, sender }) => {
        if(user.name in connectedUsers){
            const receiverSocket = connectedUsers[user.name].socketId
            const newChat = createChat({ name:`${user.name} & ${sender}`, users:[user.name, sender] })
            socket.to(receiverSocket).emit('private.chat', newChat)
            socket.emit("private.chat", newChat)
		}
    })

});

function addUser(userList, user) {
    let newList = Object.assign({}, userList)
    newList[user.name] = user
    return newList
}


function removeUser(userList, username){
    let newList = Object.assign({}, userList)
    delete newList[username]
    return newList
}


const API_PORT = 5000;

server.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));