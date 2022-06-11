const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const INDEX = "index.html";

app.use(cors())
app.use((req, res) => res.sendFile(INDEX, { root: __dirname }))

const server = http.createServer(app)

const io = new Server(server, { 
    cors: {
        origin: "*",
        methods: "*"
    }
})


io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`)
    
    socket.on("weather", (data) => {
        console.log(data)
        socket.broadcast.emit("callback", data)
    })
})


server.listen(PORT, () => {
    console.log(`Websocket server is running on port ${PORT}`)
});






