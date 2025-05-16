const express = require("express");
const {
  createCafe,
  getCafes,
  getCafeById,
  updateCafe,
  deleteCafe,
  // getCafeMenu,
} = require("../controllers/cafeController");
const { authenticateUser } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");
const upload = require("../middlewares/upload"); // middleware upload

const router = express.Router();

router.get("/:id", getCafeById);
router.get("/", getCafes);
// router.get("/:cafeId/menu", getCafeMenu);
router.post(
  "/",
  authenticateUser,
  authorizeRoles(["admin"]),
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "citizenIdImage", maxCount: 1 },
  ]),
  createCafe
);
router.put(
  "/:id",
  authenticateUser,
  authorizeRoles(["admin"]),
  upload.fields([
    { name: "citizenIdImage", maxCount: 1 },
    { name: "image", maxCount: 1 }, // ✅ thêm dòng này
  ]),
  updateCafe
);
router.delete("/:id", authenticateUser, authorizeRoles(["admin"]), deleteCafe);

module.exports = router;
