import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "uploads");

export const createUploadFolder = () => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log("Upload folder created at:", uploadDir);
  }
};
