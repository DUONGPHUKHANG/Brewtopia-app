const express = require("express");
const { likeOrUnlike, getLikes } = require("../controllers/likeController");
const { authenticateUser } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/:id", getLikes);
router.post("/", authenticateUser, likeOrUnlike);

module.exports = router;
