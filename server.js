const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const socketHandlers = require("./socket.io/index"); // Gọi đúng file index.js của socket.io

require("dotenv").config();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Khởi tạo `io` chỉ trong `socket.io/index.js`
const io = socketHandlers(server);
app.set("socketio", io); // Lưu `io` vào app để sử dụng sau này

// Inject `io` vào `req` để sử dụng trong controller/service
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Import Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/cafes", require("./routes/cafeRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/likes", require("./routes/likeRoutes"));
app.use("/api/shares", require("./routes/shareRoutes"));
// app.use("/api/chat", require("./routes/chatRoutes"));
// app.use("/api/aiChat", require("./routes/aiChatRoutes"));

// Khởi động Server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
