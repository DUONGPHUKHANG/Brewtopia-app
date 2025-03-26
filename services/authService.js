const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// Hàm gửi email xác thực
const sendVerificationEmail = async (user) => {
  const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();

  // Cập nhật mã xác thực cho user
  user.verificationCode = verificationCode;
  user.verificationExpiresAt = Date.now() + 10 * 60 * 1000; // Hết hạn sau 10 phút
  await user.save();

  // Gửi email xác thực
  await sendEmail(user.email, verificationCode, user.name);
};

const registerUser = async ({ name, email, password, role }) => {
  // Kiểm tra nếu email đã tồn tại
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email đã tồn tại!");

  // Kiểm tra nếu password bị thiếu
  if (!password) throw new Error("Mật khẩu không được để trống!");

  // Mã hóa mật khẩu
  const hashedPassword = await bcrypt.hash(password, 10);

  // Tạo user mới với role (nếu không có thì mặc định là "user")
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    isVerified: false,
    role: role || "user", // Nếu không truyền role thì mặc định là "user"
  });

  // Gửi email xác thực
  await sendVerificationEmail(user);
  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("Tài khoản không tồn tại!");
  if (!(await bcrypt.compare(password, user.password)))
    throw new Error("Mật khẩu không chính xác!");
  if (!user.isVerified) throw new Error("Tài khoản chưa xác thực!");

  return user;
};

// Service xác thực OTP
const verifyUserByEmail = async (email, code) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("Tài khoản không tồn tại!");
  if (user.isVerified) throw new Error("Tài khoản đã được xác thực!");
  if (user.verificationCode !== code)
    throw new Error("Mã xác thực không đúng!");
  if (user.verificationExpiresAt < new Date())
    throw new Error("Mã xác thực đã hết hạn!");

  user.isVerified = true;
  user.verificationCode = null;
  user.verificationExpiresAt = null;
  await user.save();

  return user;
};

const generateToken = (user) => {
  return jwt.sign(
    { email: user.email, id: user.id, role: user.role || "user" },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );
};
// Service gửi lại mã xác thực
const resendVerificationCodeService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) throw new Error("User không tồn tại");

  if (user.isVerified) throw new Error("Tài khoản đã được xác thực");

  return sendVerificationEmail(user);
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Email không tồn tại!");

  // Tạo token đặt lại mật khẩu (random string)
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Mã hóa token trước khi lưu vào database
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Lưu token vào user và đặt thời gian hết hạn (15 phút)
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpiresAt = Date.now() + 15 * 60 * 1000; // 15 phút
  await user.save();

  // Gửi email reset password
  const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}&email=${email}`;
  await sendEmail(
    user.email,
    `Bấm vào link để đặt lại mật khẩu: ${resetLink}`,
    user.name
  );

  return { message: "Đã gửi email đặt lại mật khẩu!", resetLink };
};

const resetPassword = async (email, token, newPassword) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Email không tồn tại!");

  // Mã hóa token để so sánh với database
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  if (
    user.resetPasswordToken !== hashedToken ||
    user.resetPasswordExpiresAt < Date.now()
  ) {
    throw new Error("Token không hợp lệ hoặc đã hết hạn!");
  }

  // Cập nhật mật khẩu mới
  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = null;
  user.resetPasswordExpiresAt = null;
  await user.save();

  return { message: "Mật khẩu đã được cập nhật!" };
};

module.exports = {
  registerUser,
  loginUser,
  sendVerificationEmail,
  verifyUserByEmail,
  resendVerificationCodeService,
  generateToken,
  forgotPassword,
  resetPassword,
};
