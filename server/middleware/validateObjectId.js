import mongoose from "mongoose";

export default function validateObjectId(req, res, next) {
  const id = req.params.id || req.params.postId;

  if (id && !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  next();
}
