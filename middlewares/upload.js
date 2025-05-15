const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudiNary = require("../config/cloudinary");
const { v4: uuidv4 } = require("uuid");

const storage = new CloudinaryStorage({
  cloudinary: cloudiNary,
  params: {
    folder: "menu",
    format: async (req, file) => "webp", // Lưu dưới định dạng WEBP
    public_id: (req, file) => uuidv4(), // Tạo tên file duy nhất bằng UUID
  },
});

const fileFilter = (req, file, cb) => {
  console.log(
    "Đang xử lý file:",
    file.originalname,
    "với mimetype:",
    file.mimetype
  );
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.mimetype)) {
    return cb(new Error("Chỉ chấp nhận file ảnh JPG, PNG, WEBP!"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

// console.log(upload);

module.exports = upload;
