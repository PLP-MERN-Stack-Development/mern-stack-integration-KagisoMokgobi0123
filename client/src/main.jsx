import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react"; // Import ClerkProvider
import { PostProvider } from "./context/PostContext";

// Pages
import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import CreateEditPost from "./components/CreateEditPost";

// Navbar (if needed)
import Navbar from "./components/Navbar";

import "./index.css";

// Get the Clerk Frontend API from environment variable
const clerkFrontendApi = import.meta.env.VITE_CLERK_FRONTEND_API;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider frontendApi={clerkFrontendApi}>
      {/* Wrap the app with ClerkProvider */}
      <PostProvider>
        <BrowserRouter>
          <Navbar /> {/* Navbar uses Clerk hooks */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<SinglePost />} />
            <Route path="/create-post" element={<CreateEditPost />} />
            <Route path="/edit-post/:id" element={<CreateEditPost />} />
          </Routes>
        </BrowserRouter>
      </PostProvider>
    </ClerkProvider>
  </React.StrictMode>
);
