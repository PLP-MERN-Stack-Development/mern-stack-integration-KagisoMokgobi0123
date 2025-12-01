// server/controllers/commentController.js
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import { validationResult } from "express-validator";

// Get all comments for a post
export const getComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comments = await Comment.find({ post: post._id })
      .populate("user", "name") // Populating user data for each comment
      .sort({ createdAt: -1 });

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch comments", error });
  }
};

// Create a new comment (requires authentication)
export const createComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Get the authenticated user's ID directly from req.auth (from Clerk middleware)
    const userId = req.auth.userId; // The userId comes from the Clerk Express middleware

    const comment = new Comment({
      text,
      post: post._id,
      user: userId, // Directly assign userId here
    });

    await comment.save();

    return res.status(201).json(comment);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create comment", error });
  }
};
