const payosService = require("../services/paymentService");

const createPayos = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount } = req.body;
    if (!amount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const paymentLink = await payosService.createPaymentLink({
      userId,
      amount,
    });

    res.status(200).json({
      message: "PayOs link created successfully",
      data: paymentLink,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const handleWebhook = async (req, res) => {
  try {
    const webhookData = req.query;
    const payment = await payosService.handleWebhook(webhookData);
    res.status(200).json({
      message: "Webhook processed successfully",
      data: payment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getPaymentInfo = async (req, res) => {
  try {
    const { orderCode } = req.params;
    const payment = await payosService.getPaymentInfo(orderCode);
    res.status(200).json({
      message: "Payment info retrieved successfully",
      data: payment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPayos,
  handleWebhook,
  getPaymentInfo,
};
