const chatService = require("../services/chatService");

// Tạo phòng chat mới (user 1:1, group chat, chat với chủ quán)
const createChatRoom = async (req, res) => {
  try {
    const { participants, isGroupChat, name } = req.body;

    // Kiểm tra và xử lý participants cho phòng chat 1:1
    let finalParticipants = participants;
    if (!isGroupChat) {
      // Đảm bảo chỉ có 1 người dùng khác trong participants
      if (!participants || participants.length !== 1) {
        return res
          .status(400)
          .json({ message: "Phòng chat 1:1 cần đúng 1 userId khác" });
      }
      // Thêm ID của người dùng hiện tại vào participants
      finalParticipants = [req.user.id, ...participants];
    }

    // Kiểm tra participants có hợp lệ không
    if (!finalParticipants || finalParticipants.length < 2) {
      return res.status(400).json({ message: "Cần ít nhất 2 người tham gia" });
    }

    const chatRoomData = {
      participants: finalParticipants,
      isGroupChat,
      name: isGroupChat ? name : null,
      admin: isGroupChat ? req.user.id : null,
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
    console.log(roomId, message, messageType);

    const messageData = {
      chatRoom: roomId,
      sender: req.user.id,
      message,
      messageType: messageType || "text",
    };
    const chatMessage = await chatService.sendMessage(messageData);
    // io.to(messageData.chatRoom).emit("receiveMessage", chatMessage);
    res.status(201).json(chatMessage);
  } catch (error) {
    const phongdaucac = console.log("ngu như bò");
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
