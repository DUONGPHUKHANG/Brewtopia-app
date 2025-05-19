const PointPurchase = require("../models/PointPurchase");
const User = require("../models/User");

const createPointPurchase = async ({ userId, points, amount }) => {
  try {
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Validate input
    if (!Number.isInteger(points) || points <= 0) {
      throw new Error("Points must be a positive integer");
    }
    if (!Number.isInteger(amount) || amount <= 0) {
      throw new Error("Amount must be a positive integer");
    }

    // Create purchase
    const purchase = new PointPurchase({
      user: userId,
      points,
      amount,
      status: "pending",
    });

    await purchase.save();
    return { id: purchase._id, points, amount, status: purchase.status };
  } catch (error) {
    console.error(`Create PointPurchase error: ${error.message}`);
    throw error;
  }
};

const getPointPurchases = async (userId) => {
  try {
    const purchases = await PointPurchase.find({ user: userId }).select(
      "_id points amount status"
    );
    return purchases;
  } catch (error) {
    console.error(`Get PointPurchases error: ${error.message}`);
    throw error;
  }
};

module.exports = {
  createPointPurchase,
  getPointPurchases,
};
