const PointPurchaseService = require("../services/pointPurchaseService");

const createPointPurchase = async (req, res) => {
  try {
    const { points, amount } = req.body;
    const userId = req.user.id;

    if (!points || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await PointPurchaseService.createPointPurchase({
      userId,
      points,
      amount,
    });

    return res.status(201).json(result);
  } catch (error) {
    console.error("Create PointPurchase error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

const getPointPurchases = async (req, res) => {
  try {
    const userId = req.user.id;
    const purchases = await PointPurchaseService.getPointPurchases(userId);
    return res.status(200).json(purchases);
  } catch (error) {
    console.error("Get PointPurchases error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPointPurchase,
  getPointPurchases,
};
