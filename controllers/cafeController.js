const cafeService = require("../services/cafeService");

const createCafe = async (req, res) => {
  try {
    const { body, user } = req;

    const cafe = await cafeService.createCafe({
      ...body,
      owner: user.id, // 👈 Chính xác! user.id là ObjectId của người dùng
    });

    res.status(201).json(cafe);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

//  const business = await businessService.createBusiness(body, user.id, files);

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
    res.status(200).json({ message: "Đã cập nhật thành công", cafe });
  } catch (error) {
    console.log(error);
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
const getCafeMenu = async (req, res) => {
  try {
    const { cafeId } = req.params;

    const menu = await cafeService.getCafeMenu(cafeId);
    if (!menu) {
      return res.status(404).json({ message: "Quán cafe không tồn tại" });
    }

    res.status(200).json({ menu });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

module.exports = {
  createCafe,
  getCafes,
  getCafeById,
  updateCafe,
  deleteCafe,
  getCafesNearby,
  getCafeMenu,
};
