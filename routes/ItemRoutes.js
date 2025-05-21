const express = require("express");
const router = express.Router();

const {
  addItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");
const { authenticateUser } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");
const upload = require("../middlewares/upload"); // middleware upload

// Lấy Item từ menu
// router.get("/:cafeId", getMenu);
// Thêm món Item
router.post(
  "/:id",
  authenticateUser,
  authorizeRoles(["admin"]),
  upload.fields([{ name: "image", maxCount: 1 }]),
  addItem
);

// Cập nhật Item
router.put("/:id", authenticateUser, authorizeRoles(["admin"]), updateItem);

// Xoá Item
router.delete("/:id", authenticateUser, authorizeRoles(["admin"]), deleteItem);

module.exports = router;
