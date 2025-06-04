const express = require("express");
const router = express.Router();
const {
  getActive,
  getHistory,
  endStream,
} = require("../controllers/streamController");
const { authenticateUser } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

router.get("/active", authenticateUser, authorizeRoles(["admin"]), getActive);
router.get("/history", authenticateUser, authorizeRoles(["admin"]), getHistory);
router.post("/end", authenticateUser, authorizeRoles(["admin"]), endStream);

module.exports = router;
