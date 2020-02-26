const multer = require("multer");
const path = require("path");

const filter = (req, file, cb) => {
  const mimetype = file.mimetype;
  if (mimetype === "image/jpeg" || mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "/..", "/public/uploads/"));
  },
  filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: filter,
  limits: 1024 * 1024
});

module.exports = upload;
