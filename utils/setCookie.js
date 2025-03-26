const setCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true, // Chặn JavaScript đọc cookie (bảo mật)
    secure: process.env.NODE_ENV === "production", // Chỉ hoạt động trên HTTPS nếu production
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
  });
};

module.exports = setCookie;
