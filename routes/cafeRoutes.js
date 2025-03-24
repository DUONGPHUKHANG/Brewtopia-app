const express = require("express");
const {
  createCafe,
  getCafes,
  getCafeById,
  updateCafe,
  deleteCafe,
} = require("../controllers/cafeController");
const { authenticateUser } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/:id", getCafeById);
router.get("/", getCafes);
router.post("/", authenticateUser, authorizeRoles(["admin"]), createCafe);
router.put("/:id", authenticateUser, authorizeRoles(["admin"]), updateCafe);
router.delete("/:id", authenticateUser, authorizeRoles(["admin"]), deleteCafe);

module.exports = router;
