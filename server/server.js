import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import { withAuth } from "@clerk/clerk-sdk-node"; // Use Clerk's built-in middleware
import postRoutes from "./routes/post.js";
import categoryRoutes from "./routes/category.js";
import commentRoutes from "./routes/comment.js";
import errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";
import { createUploadFolder } from "./utils/createUploadFolder.js";

dotenv.config();

// Initialize Clerk SDK with your secret key from the .env
// Clerk initialization is handled via withAuth middleware in the routes
const app = express();

// Middleware setup
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Ensure upload folder exists
createUploadFolder();

// Use Clerk's built-in authentication middleware for specific routes (i.e. protected routes)
app.use("/api/posts", withAuth(), postRoutes); // Protect all post routes
app.use("/api/categories", withAuth(), categoryRoutes); // Protect category routes as well
app.use("/api/comments", withAuth(), commentRoutes); // Protect comment routes

// Static file serving for uploaded files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

// Start the server only after database connection
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
  });
});
