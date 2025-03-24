const express = require("express");
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const { authenticateUser } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/:id", getEventById);
router.get("/", getEvents);
router.put("/:id", authenticateUser, authorizeRoles(["admin"]), updateEvent);
router.post("/", authenticateUser, authorizeRoles(["admin"]), createEvent);
router.delete("/:id", authenticateUser, authorizeRoles(["admin"]), deleteEvent);

module.exports = router;
