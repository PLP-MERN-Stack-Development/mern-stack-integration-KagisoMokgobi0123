import Category from "../models/Category.js";
import { validationResult } from "express-validator";

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch categories", error });
  }
};

// Create a new category (requires authentication)
export const createCategory = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name } = req.body;

    // Check if name is provided
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    // Create a new category
    const category = new Category({ name });
    await category.save();

    return res.status(201).json(category);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to create category", error });
  }
};
