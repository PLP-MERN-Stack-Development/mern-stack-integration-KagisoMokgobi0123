import express from "express";
import { body } from "express-validator";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { withAuth } from "@clerk/clerk-sdk-node"; // Updated import

const router = express.Router();

// Validation and Auth Middleware
router.get("/", getPosts); // Get all posts (public)
router.get("/:slug", getPost); // Get post by slug (public)

// Create, Update, Delete (requires Clerk authentication)
router.post(
  "/",
  withAuth(), // Ensure that the user is authenticated using Clerk middleware
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required"),
    body("category").notEmpty().withMessage("Category is required"),
  ],
  createPost
);

router.put(
  "/:id",
  withAuth(), // Ensure that the user is authenticated using Clerk middleware
  updatePost
);

router.delete("/:id", withAuth(), deletePost); // Ensure that the user is authenticated using Clerk middleware

export default router;
