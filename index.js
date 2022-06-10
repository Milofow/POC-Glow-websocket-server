const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors')
app.use(cors())



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


server.listen(3001, () => {
    console.log("Websocket server is running on port 3001")
});
