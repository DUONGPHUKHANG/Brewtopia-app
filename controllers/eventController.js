const eventService = require("../services/eventService");

/**
 * Controller: Tạo sự kiện mới
 */
const createEvent = async (req, res) => {
  try {
    const event = await eventService.createEvent(req.body);
    res.status(201).json(event);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi tạo sự kiện", error: error.message });
  }
};

/**
 * Controller: Lấy danh sách tất cả sự kiện
 */
const getEvents = async (req, res) => {
  try {
    const events = await eventService.getEvents();
    res.status(200).json(events);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy danh sách sự kiện", error: error.message });
  }
};

/**
 * Controller: Lấy thông tin một sự kiện theo ID
 */
const getEventById = async (req, res) => {
  try {
    const event = await eventService.getEventById(req.params.id);
    if (!event)
      return res.status(404).json({ message: "Sự kiện không tồn tại" });
    res.status(200).json(event);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy thông tin sự kiện", error: error.message });
  }
};

/**
 * Controller: Cập nhật sự kiện theo ID
 */
const updateEvent = async (req, res) => {
  try {
    const event = await eventService.updateEvent(req.params.id, req.body);
    if (!event)
      return res.status(404).json({ message: "Sự kiện không tồn tại" });
    res.status(200).json(event);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi cập nhật sự kiện", error: error.message });
  }
};

/**
 * Controller: Xóa sự kiện theo ID
 */
const deleteEvent = async (req, res) => {
  try {
    const event = await eventService.deleteEvent(req.params.id);
    if (!event)
      return res.status(404).json({ message: "Sự kiện không tồn tại" });
    res.status(200).json({ message: "Xóa sự kiện thành công" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi xóa sự kiện", error: error.message });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
