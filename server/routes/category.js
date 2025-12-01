import express from "express";
import { body } from "express-validator";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { withAuth } from "@clerk/clerk-sdk-node"; // Assuming 'withAuth' is the correct export

const router = express.Router();

// Validation middleware for creating/updating posts
const validatePost = [
  body("title").notEmpty().withMessage("Title is required"),
  body("content").notEmpty().withMessage("Content is required"),
  body("category").notEmpty().withMessage("Category is required"),
];

// Public Routes
router.get("/", getPosts); // Get all posts (public)
router.get("/:slug", getPost); // Get post by slug (public)

// Protected Routes (requires Clerk authentication)
router.post(
  "/",
  withAuth(), // Clerk authentication middleware (replacing clerkExpressWithAuth)
  validatePost, // Validation middleware for post creation
  createPost
);

router.put(
  "/:id",
  withAuth(), // Clerk authentication middleware
  validatePost, // Optional: validation on update, same as creation
  updatePost
);

router.delete("/:id", withAuth(), deletePost); // Clerk authentication middleware

export default router;
