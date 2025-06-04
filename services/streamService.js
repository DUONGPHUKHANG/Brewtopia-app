// services/userService.js
const LiveHistory = require("../models/LiveHistory");

const getActives = async () => {
  const active = await LiveHistory.find({ isLive: true });
  return active;
};

const getHistorys = async () => {
  const all = await LiveHistory.find({ isLive: false });
  return all;
};

const endStreams = async (channelId) => {
  const stream = await LiveHistory.findOneAndUpdate(
    { channelId, isLive: true },
    { isLive: false, endedAt: new Date() },
    { new: true }
  );
  return stream;
};

module.exports = { getActives, getHistorys, endStreams };
