const authService = require("../services/authService");
const User = require("../models/User");

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
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
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

    // **Lưu token vào cookies đúng cách**
    res.cookie("token", token, {
      httpOnly: true, // Chặn JavaScript đọc cookie (bảo mật)
      secure: process.env.NODE_ENV === "production", // Chỉ hoạt động trên HTTPS nếu production
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    });
    res.status(200).json({ status: "success", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Xác thực tài khoản bằng email + mã xác thực
const verifyUser = async (req, res) => {
  try {
    const { email, code } = req.body; // Người dùng chỉ cần nhập email + code
    const user = await authService.verifyUserByEmail(email, code);
    res.status(200).json({
      message: "Tài khoản đã được xác thực thành công!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
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
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const response = await authService.forgotPassword(email);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Đặt lại mật khẩu bằng token
const resetPassword = async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;
    const response = await authService.resetPassword(email, token, newPassword);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { displayName, emails, photos, provider } = req.user;

    const { user, token } = await authService.socialLogin({
      name: displayName,
      email: emails[0].value,
      avatar: photos[0].value,
      provider,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ status: "success", token, user });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

const facebookLogin = async (req, res) => {
  try {
    const { displayName, emails, photos, provider } = req.user;

    const { user, token } = await authService.socialLogin({
      name: displayName,
      email: emails[0].value,
      avatar: photos[0].value,
      provider,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ status: "success", token, user });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
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
