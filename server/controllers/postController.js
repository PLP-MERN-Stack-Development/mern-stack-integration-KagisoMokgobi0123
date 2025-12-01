import Post from "../models/Post.js";
import Category from "../models/Category.js";
import { validationResult } from "express-validator";

// Get all posts with pagination and optional category filtering
export const getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    const query = category ? { category } : {}; // Filter by category if provided

    const posts = await Post.find(query)
      .populate("category", "name") // Populate category name
      .skip((page - 1) * limit) // Pagination logic
      .limit(parseInt(limit)) // Limit the number of posts per page
      .sort({ createdAt: -1 }); // Sort by creation date in descending order

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch posts", error });
  }
};

// Get a single post by its slug or ID
export const getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate(
      "category",
      "name"
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch post", error });
  }
};

// Create a new post (requires authentication)
export const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, content, category } = req.body;

    // Get the authenticated user's ID directly from req.auth (from clerkExpressWithAuth)
    const userId = req.auth.userId;

    // Get the category from the database
    const categoryData = await Category.findById(category);
    if (!categoryData) {
      return res.status(400).json({ message: "Invalid category" });
    }

    // Create the post
    const post = new Post({
      title,
      content,
      category: categoryData._id,
      user: userId, // Save the user ID from the authenticated user
    });

    await post.save();

    return res.status(201).json(post);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create post", error });
  }
};

// Update an existing post (requires authentication)
export const updatePost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, content, category } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user is authorized to update the post
    const userId = req.auth.userId; // Get the authenticated user's ID from req.auth
    if (post.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Update the post fields
    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;

    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update post", error });
  }
};

// Delete a post (requires authentication)
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user is authorized to delete the post
    const userId = req.auth.userId; // Get the authenticated user's ID from req.auth
    if (post.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await post.remove();
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete post", error });
  }
};

// Search posts by query
export const searchPosts = async (req, res) => {
  try {
    const { q } = req.query;
    const posts = await Post.find({ title: { $regex: q, $options: "i" } }) // Case-insensitive search
      .populate("category", "name")
      .sort({ createdAt: -1 }); // Sort by creation date

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Search failed", error });
  }
};
