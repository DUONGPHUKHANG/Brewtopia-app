const authService = require("../services/authService");
const User = require("../models/User");
const setCookie = require("../utils/setCookie");

// Đăng ký tài khoản
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body; // Nhận thêm role từ request

    // Kiểm tra xem tất cả trường dữ liệu đã nhập hay chưa
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Vui lòng điền đầy đủ thông tin!" });
    }

    // Gọi service để đăng ký user
    const user = await authService.registerUser({
      name,
      email,
      password,
      role,
    });

    res.status(201).json({
      message: "Đăng ký thành công! Vui lòng kiểm tra email để xác thực.",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(401).json({ message: "User not found" });

    const token = authService.generateToken(user);
    setCookie(res, token);
    res.status(200).json({ status: "success", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await authService.verifyUserByEmail(email, code);
    res.status(200).json({
      message: "Tài khoản đã được xác thực thành công!",
      user: {
        _id: user._id,
        name: user.name,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;
    await authService.resendVerificationCodeService(email);
    res.status(200).json({ message: "Mã xác thực mới đã được gửi" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Đặt lại mật khẩu bằng token
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const response = await authService.resetPassword(token, newPassword);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const googleLogin = async (req, res) => {
  try {
    const user = req.user;
    // Tạo token
    const token = authService.generateToken(user);
    setCookie(res, token);
    res.status(200).json({ status: "success", token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

const facebookLogin = async (req, res) => {
  try {
    const user = req.user;
    // Tạo token
    const token = authService.generateToken(user);
    setCookie(res, token); // Đặt cookie
    res.status(200).json({ status: "success", token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Vui lòng nhập email!" });
    }

    // Gọi service để tạo token và gửi email
    const response = await authService.sendResetPasswordEmail(email);
    res
      .status(200)
      .json({ message: "Email đặt lại mật khẩu đã được gửi!", response });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  verifyUser,
  resendVerificationCode,
  forgotPassword,
  resetPassword,
  googleLogin,
  facebookLogin,
};
