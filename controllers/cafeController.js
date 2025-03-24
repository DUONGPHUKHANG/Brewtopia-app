const cafeService = require("../services/cafeService");

const createCafe = async (req, res) => {
  try {
    const cafe = await cafeService.createCafe(req.body);
    res.status(201).json(cafe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCafes = async (req, res) => {
  try {
    const cafes = await cafeService.getAllCafes();
    res.status(200).json(cafes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCafeById = async (req, res) => {
  try {
    const cafe = await cafeService.getCafeById(req.params.id);
    res.status(200).json(cafe);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateCafe = async (req, res) => {
  try {
    const cafe = await cafeService.updateCafe(req.params.id, req.body);
    res.status(200).json({ message: "Đã cập nhật thành công" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCafe = async (req, res) => {
  try {
    const cafe = await cafeService.deleteCafe(req.params.id);
    res.status(200).json({ message: "Đã xóa quán cafe", cafe });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getCafesNearby = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance } = req.query;
    const cafes = await cafeService.getCafesNearby(
      longitude,
      latitude,
      maxDistance
    );
    res.status(200).json(cafes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = {
  createCafe,
  getCafes,
  getCafeById,
  updateCafe,
  deleteCafe,
  getCafesNearby,
};
