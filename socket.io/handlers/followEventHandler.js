const eventService = require("../../services/eventService");

module.exports = (socket, io) => {
  socket.on("followOrUnfollow", async ({ eventId, userId }) => {
    try {
      const event = await eventService.toggleFollowEvent(eventId, userId);

      // Kiểm tra userId hiện tại đã có trong followers chưa
      const isFollowing = event.followers
        .map((id) => id.toString())
        .includes(userId);

      io.emit("follow:update", {
        eventId,
        followChange: isFollowing ? 1 : -1, // Nếu sau toggle là follow thì +1, unfollow thì -1
        followersCount: event.followers.length,
      });

      socket.emit("follow:response", {
        message: isFollowing ? "Đã follow" : "Đã unfollow",
        eventId,
        followersCount: event.followers.length,
      });
    } catch (error) {
      console.error("❌ Lỗi trong followOrUnfollow:", error.message);
      socket.emit("follow:error", { message: error.message });
    }
  });
};
