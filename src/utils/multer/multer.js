//
const multer = require("fastify-multer");
const path = require("path");
//
const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const extName = path.extname(file.originalname);
    if (extName == ".jpg" || extName == ".jpeg" || extName == ".png") {
      cb(null, true);
    } else {
      cb(new Error("File type not allowed!"), false);
    }
  },
  limits: {
    fileSize: 3000000, // 3.MB
  },
});
//
module.exports = upload;
//
