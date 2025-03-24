const nodemailer = require("nodemailer");

const sendEmail = async (to, verificationCode, user) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject: "Mã Xác Thực Email",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
        <h2 style="color: #333; text-align: center;">🔐 Mã Xác Thực Email</h2>
        <p style="font-size: 16px; color: #555;">Chào <strong>${user}</strong>,</p>
        <p style="font-size: 16px; color: #555;">Cảm ơn bạn đã đăng ký tài khoản tại App Coffee. Vui lòng sử dụng mã dưới đây để xác thực tài khoản của bạn:</p>
        <div style="font-size: 24px; font-weight: bold; text-align: center; color: #007BFF; padding: 10px; background-color: #fff; border-radius: 5px; border: 1px dashed #007BFF;">
          ${verificationCode}
        </div>
        <p style="font-size: 16px; color: #555;">Mã này sẽ hết hạn sau <strong>10 phút</strong>.</p>
        <hr style="margin: 20px 0;">
        <p style="font-size: 14px; color: #999; text-align: center;">© 2024 App Coffee. All rights reserved.</p>
      </div>
    `,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
