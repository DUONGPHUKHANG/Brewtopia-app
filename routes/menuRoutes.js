const express = require("express");
const router = express.Router();
const {
  addMenu,
  getMenu,
  updateMenu,
  deleteMenu,
} = require("../controllers/menuController");
const { authenticateUser } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");
const upload = require("../middlewares/upload");

// Thêm món vào menu
router.post(
  "/:cafeId",
  authenticateUser,
  authorizeRoles(["admin"]),
  upload.fields([{ name: "image", maxCount: 1 }]),
  addMenu
);

// Lấy menu của quán
router.get("/:cafeId", getMenu);

// Cập nhật món
router.put(
  "/item/:itemId",
  authenticateUser,
  authorizeRoles(["admin"]),
  updateMenu
);

// Xoá món
router.delete(
  "/item/:itemId",
  authenticateUser,
  authorizeRoles(["admin"]),
  deleteMenu
);

module.exports = router;
