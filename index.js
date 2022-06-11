const PORT = process.env.PORT || 8000;
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, { 
    cors: {
        origin: '*',
    }
 });

io.on("connection", (socket) => {
  console.log("connected!")
});

httpServer.listen(PORT);