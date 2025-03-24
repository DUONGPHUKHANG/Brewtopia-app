const express = require("express");
const {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  updateReview,
  getReviewsByCafe,
} = require("../controllers/reviewController");
const { authenticateUser } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.post("/", authenticateUser, createReview);
router.put("/:id", authenticateUser, updateReview);
router.delete(
  "/:id",
  authenticateUser,
  authorizeRoles(["admin"]),
  deleteReview
);
router.post("/cafe/:cafeId", getReviewsByCafe);

module.exports = router;
