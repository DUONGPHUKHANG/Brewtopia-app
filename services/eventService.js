const Event = require("../models/Event");

const createEvent = async (eventData) => {
  const event = await Event.create(eventData);
  return event;
};

const getEvents = async () => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    return events;
  } catch (error) {
    throw new Error("Không thể lấy danh sách sự kiện");
  }
};

const getEventById = async (id) => {
  try {
    const event = await Event.findById(id);
    if (!event) throw new Error("Sự kiện không tồn tại");
    return event;
  } catch (error) {
    throw new Error("Không thể lấy thông tin sự kiện");
  }
};

const updateEvent = async (id, eventData) => {
  try {
    const event = await Event.findByIdAndUpdate(id, eventData, { new: true });
    if (!event) throw new Error("Sự kiện không tồn tại");
    return event;
  } catch (error) {
    throw new Error("Không thể cập nhật sự kiện");
  }
};

const deleteEvent = async (id) => {
  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) throw new Error("Sự kiện không tồn tại");
    return { message: "Xóa sự kiện thành công", eventId: id };
  } catch (error) {
    throw new Error("Không thể xóa sự kiện");
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
