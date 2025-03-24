module.exports = (socket, io) => {
  socket.on("sendMessage", ({ chatId, senderId, message }) => {
    io.to(chatId).emit("receiveMessage", { senderId, message });
  });

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });
};
