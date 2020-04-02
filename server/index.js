const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const { createChat } = require('./utils/creators')

let usernames = []
let messages = [];

io.on('connection', socket => {

    console.log(`[server] connected ${socket.id}`);

    socket.on('login', ({ username }) => {
        console.log(`[server] login: ${username}`);
        usernames.push(username);
        socket.username = username;

        console.log(usernames)

        io.emit('users.login', usernames);
    });

    socket.on('disconnect', () => {
        const { username } = socket;
        if (username) {
            console.log(`[server] disconnected: ${username}`);
            usernames = usernames.filter(u => u !== username)
        }

        io.emit('users.disconnect', usernames);
    });

    socket.on('logout', () => {
        const { username } = socket;
        if (username) {
            console.log(`[server] logout: ${username}`);
            usernames = usernames.filter(u => u !== username)
            delete socket['username'];

            io.emit('users.logout', { username });
        }
    });

    socket.on('message', (text) => {
        console.log(`[server] message: ${text}`);
        const message = {
            id: messages.length,
            text,
            username: socket.username,
        };
        messages.push(message);

        io.emit('messages.new', { message });
    });

    socket.on('initChat', () => {
        const initialChat = createChat()
        io.emit('initChat.true', initialChat)
    })

});


const API_PORT = 5000;

server.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));