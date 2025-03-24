const { Server } = require("socket.io");
const likeHandler = require("./handlers/likeHandler");
const shareHandler = require("./handlers/shareHandler");

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🔗 Client connected:", socket.id);

    // Truyền `socket` và `io` vào các handler
    likeHandler(socket, io);
    shareHandler(socket, io);

    socket.on("disconnect", () => {
      console.log("🔌 Client disconnected:", socket.id);
    });
  });

  return io; // Trả về `io` để sử dụng trong app
};
