const express = require("express");
const {
  getAllBusinesses,
  getBusinessById,
  createBusiness,
  updateBusiness,
  deleteBusiness,
} = require("../controllers/businessController");
const { authenticateUser } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");
const upload = require("../middlewares/upload"); // middleware upload
const path = require("path");
const router = express.Router();
const cloudinary = require("../config/cloudinary");

// businessRoutes.js
router.post(
  "/",
  authenticateUser,
  authorizeRoles(["admin"]),
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "citizenIdImage", maxCount: 1 },
  ]),
  createBusiness
);

router.get("/", getAllBusinesses);
router.get("/:id", getBusinessById);
router.put(
  "/:id",
  authenticateUser,
  authorizeRoles(["admin"]),
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "citizenIdImage", maxCount: 1 },
  ]),
  updateBusiness
);
router.delete(
  "/:id",
  authenticateUser,
  authorizeRoles(["admin"]),
  deleteBusiness
);

module.exports = router;
