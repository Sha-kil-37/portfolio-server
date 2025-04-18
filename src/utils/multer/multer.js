//
'use strict'
const multer = require("fastify-multer");
const path = require("path");
//
const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const extName = path.extname(file.originalname);
    if (
      extName === ".jpg" ||
      extName === ".jpeg" ||
      extName === ".png" ||
      extName === ".pdf"
    ) {
      cb(null, true);
    } else {
      cb(new Error("File type not allowed!"), false);
    }
  },
  limits: {
    fileSize: 10000000, // 10.MB
  },
});
//
module.exports = upload;
//
