const express = require("express");
const {
  createComment,
  getComments,
  deleteComment,
} = require("../controllers/commentController");
const { authenticateUser } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getComments);
router.post("/", authenticateUser, createComment);
router.delete("/:id", authenticateUser, deleteComment);

module.exports = router;
