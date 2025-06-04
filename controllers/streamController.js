const {
  getActives,
  getHistorys,
  endStreams,
} = require("../services/streamService");

const getActive = async (req, res) => {
  try {
    const all = await getActives();
    res.status(200).json({ message: "tìm thấy thành công", data: all });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

const getHistory = async (req, res) => {
  try {
    const all = await getHistorys();
    res.status(200).json({ message: "tìm thấy thành công", data: all });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

const endStream = async (req, res) => {
  try {
    const channelId = req.body.channelId;
    const all = await endStreams(channelId);
    res
      .status(200)
      .json({ message: "kết thúc buổi live thành công", data: all });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
module.exports = { getActive, getHistory, endStream };
