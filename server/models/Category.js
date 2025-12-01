// server/models/Category.js
import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 3,
      maxlength: 50,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to generate slug
categorySchema.pre("save", function (next) {
  if (this.isNew || this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
