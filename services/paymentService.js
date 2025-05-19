const PayOS = require("@payos/node");
const { clientId, apiKey, checksumKey } = require("../config/payos");
const Payment = require("../models/Payment");
const payos = new PayOS(clientId, apiKey, checksumKey);
// 🏡 Tạo quán cafe mới
const createPaymentLink = async (orderData) => {
  const { userId, amount } = orderData;

  const orderCodeGene = Math.floor(Date.now() / 10000);
  const description = `Order ID ${orderCodeGene}`;

  const payment = new Payment({
    user: userId,
    amount,
    orderCode: orderCodeGene,
  });

  const paymentData = {
    amount,
    orderCode: orderCodeGene,
    description: description,
    returnUrl: process.env.PAYOS_WEBHOOK_URL,
    cancelUrl: process.env.PAYOS_WEBHOOK_URL,
  };

  const paymentLink = await payos.createPaymentLink(paymentData);
  payment.paymentLinkId = paymentLink.paymentLinkId;
  await payment.save();
  return paymentLink;
};

const confirmWebhook = async (webhookUrl) => {
  return await payos.confirmWebhook(webhookUrl);
};
const handleWebhook = async (webhookData) => {
  const { orderCode, status } = webhookData;
  // Tìm và cập nhật trạng thái giao dịch
  const payment = await Payment.findOne({ orderCode: orderCode });
  if (!payment) {
    throw new Error("Payment not found");
  }
  payment.status = status === "PAID" ? "PAID" : "CANCELLED";
  await payment.save();
  return payment;
};
const getPaymentInfo = async (orderCode) => {
  const payment = await Payment.findOne({ orderCode });
  if (!payment) {
    throw new Error("Payment not found");
  }
  return payment;
};

module.exports = {
  confirmWebhook,
  createPaymentLink,
  handleWebhook,
  getPaymentInfo,
};
