const express = require("express");
const router = express.Router();

const {
  addItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");
const { authenticateUser } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");
const { uploadFields } = require("../middlewares/upload"); // Import uploadFields

// Thêm món Item
router.post(
  "/:id",
  authenticateUser,
  authorizeRoles(["admin"]),
  uploadFields("itemMenu-images", [{ name: "image", maxCount: 1 }]),
  addItem
);

// Cập nhật Item
router.put("/:id", authenticateUser, authorizeRoles(["admin"]), updateItem);

// Xoá Item
router.delete("/:id", authenticateUser, authorizeRoles(["admin"]), deleteItem);

module.exports = router;
