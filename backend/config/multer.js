const multer = require('multer');
// import path module


// Define the multer storage configuration
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    // Customize your destination logic here
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/files"); // Update destination folder
  },
  filename: (req, file, cb) => {
    // Customize your filename logic here
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const fileName = name + "-" + Date.now() + "-GC-" + "." + extension;
    cb(null, fileName);
  },
});

const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "application/pdf": "pdf", // Add MIME type for PDF
};

module.exports = {
  storage: multer({ storage: storageConfig }),
  MIME_TYPE: MIME_TYPE,
};
