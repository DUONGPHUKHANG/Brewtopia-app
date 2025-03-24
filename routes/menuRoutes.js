const express = require("express");
const {
  createMenuItem,
  getMenuItems,
  getMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuController");
const { authenticateUser } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

const router = express.Router();

// Lấy danh sách món của một quán theo cafeId
router.get("/:cafeId", getMenuItems);

// Lấy thông tin chi tiết của 1 món theo ID
router.get("/item/:id", getMenuItem);

// Tạo món mới (chỉ admin)
router.post("/", authenticateUser, authorizeRoles(["admin"]), createMenuItem);

// Cập nhật món (chỉ admin)
router.put("/:id", authenticateUser, authorizeRoles(["admin"]), updateMenuItem);

// Xóa món (chỉ admin)
router.delete(
  "/:id",
  authenticateUser,
  authorizeRoles(["admin"]),
  deleteMenuItem
);

module.exports = router;
