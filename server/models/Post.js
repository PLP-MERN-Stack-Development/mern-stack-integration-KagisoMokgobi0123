// server/models/Post.js
import mongoose from "mongoose";
import slugify from "slugify";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    slug: {
      type: String,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    imageUrl: {
      type: String,
      default: "default-image.jpg",
    },
  },
  { timestamps: true }
);

// Pre-save middleware to generate slug
postSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Post = mongoose.model("Post", postSchema);

export default Post;
