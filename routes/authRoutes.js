const express = require("express");
const passport = require("passport");
const {
  register,
  login,
  verifyUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verification", verifyUser);
router.post("/resend-verification", verifyUser);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    res.json({ token: req.user.token });
  }
);
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  (req, res) => {
    res.json({ token: req.user.token });
  }
);

module.exports = router;
