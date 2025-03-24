const chatService = require("../services/chatService");

// Tạo phòng chat mới (user 1:1, group chat, chat với chủ quán)
const createChatRoom = async (req, res) => {
  try {
    const { participants, isGroupChat, name } = req.body;
    const chatRoomData = {
      participants,
      isGroupChat,
      name: isGroupChat ? name : null, // Với 1:1 chat, không cần tên
      admin: isGroupChat ? req.user._id : null, // Với group chat, user tạo phòng sẽ là admin
    };
    const chatRoom = await chatService.createChatRoom(chatRoomData);
    res.status(201).json(chatRoom);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi tạo phòng chat", error: error.message });
  }
};

// Lấy danh sách phòng chat mà user tham gia
const getChatRooms = async (req, res) => {
  try {
    const rooms = await chatService.getChatRooms(req.user._id);
    res.status(200).json(rooms);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi lấy phòng chat", error: error.message });
  }
};

// Gửi tin nhắn trong phòng chat
const sendMessage = async (req, res) => {
  try {
    const { roomId, message, messageType } = req.body;
    const messageData = {
      chatRoom: roomId,
      sender: req.user._id,
      message,
      messageType: messageType || "text",
    };
    const chatMessage = await chatService.sendMessage(messageData);
    io.to(messageData.chatRoom).emit("receiveMessage", chatMessage);
    res.status(201).json(chatMessage);
  } catch (error) {
    res.status(500).json({ message: "Lỗi gửi tin nhắn", error: error.message });
  }
};

// Lấy danh sách tin nhắn theo phòng chat
const getMessages = async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await chatService.getMessages(roomId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy tin nhắn", error: error.message });
  }
};
module.exports = {
  createChatRoom,
  getChatRooms,
  sendMessage,
  getMessages,
};
