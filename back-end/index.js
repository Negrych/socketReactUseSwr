const express = require('express');
const http = require('http');  // Додали http модуль
const { Server } = require('socket.io');
const cors = require('cors'); // Додали пакет cors

let count = 0;

const app = express();
app.use(cors())
const server = http.createServer(app);  // Створюємо HTTP сервер з вашим express додатком

const io = new Server(server,{cors:{origin:'*'}});  // Передаємо сервер в конструктор Socket.IO

io.on('connection', (socket) => {
    // console.log('__________________________________');
    // console.log(socket.handshake.query.userId);
    // console.log('________________________________________');

    socket.emit('message:get-all',{message:count})

    socket.on('message:create', (data) => {
        count = count + 1;
        //Відправить зміни тілки тому клієнту який ініціалізував зміни
        // socket.emit('message:get-all', { message: count });

        io.emit('message:get-all', { message: count }); // Відправляємо подію всім підключеним клієнтам
    });
});

server.listen(4000, () => {
    console.log(`Server has started on PORT 4000`);
});
