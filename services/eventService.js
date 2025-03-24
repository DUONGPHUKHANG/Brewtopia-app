const Event = require("../models/Event");

const createEvent = async (eventData) => {
  const event = await Event.create(eventData);
  return event;
};

/**
 * Lấy danh sách tất cả sự kiện (sắp xếp theo thời gian tạo giảm dần)
 */
const getEvents = async () => {
  const events = await Event.find().sort({ createdAt: -1 });
  return events;
};

/**
 * Lấy thông tin một sự kiện theo ID
 */
const getEventById = async (id) => {
  const event = await Event.findById(id);
  return event;
};

/**
 * Cập nhật thông tin sự kiện theo ID
 */
const updateEvent = async (id, eventData) => {
  const event = await Event.findByIdAndUpdate(id, eventData, { new: true });
  return event;
};

/**
 * Xóa sự kiện theo ID
 */
const deleteEvent = async (id) => {
  const event = await Event.findByIdAndDelete(id);
  return event;
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
