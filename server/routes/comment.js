import express from "express";
import { body } from "express-validator";
import {
  createComment,
  getComments,
} from "../controllers/commentController.js";

import { withAuth } from "@clerk/clerk-sdk-node";

// Create the router instance
const router = express.Router();

// Public Route to get comments for a post
router.get("/:postId", getComments);

// Protected Route to add a comment (requires Clerk authentication)
router.post(
  "/:postId",
  withAuth(), // Use the 'withAuth' middleware from Clerk for authentication
  [body("content").notEmpty().withMessage("Comment content is required")],
  createComment
);

export default router;
