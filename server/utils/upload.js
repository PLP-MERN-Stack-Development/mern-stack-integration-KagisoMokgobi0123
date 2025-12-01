import multer from "multer";
import path from "path";

// Define file storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(process.cwd(), "uploads");

    // Ensure the folder exists (use createUploadFolder for this)
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate a unique filename using original name and current timestamp
    const fileExtension = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

// Initialize multer with file size limit and file types
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
  fileFilter: function (req, file, cb) {
    // Only accept image files (you can customize this based on your needs)
    const fileTypes = /jpeg|jpg|png|gif|pdf/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      return cb(null, true);
    } else {
      cb(
        new Error("Invalid file type. Only JPEG, PNG, GIF, or PDF are allowed.")
      );
    }
  },
}).single("file"); // Use .single() for single file upload. You can use .array() for multiple files.

export { upload };
