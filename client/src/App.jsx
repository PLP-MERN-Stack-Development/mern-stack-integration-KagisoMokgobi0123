import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react"; // Import from @clerk/clerk-react
import { PostProvider } from "./context/PostContext";

import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import PostForm from "./components/PostForm";

// Accessing the publishable key from .env file
const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <PostProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<SinglePost />} />

            {/* Protected Routes */}
            <Route
              path="/create"
              element={
                <SignedIn>
                  <PostForm
                    onSubmit={(formData) =>
                      import("../services/api").then(({ postService }) =>
                        postService.createPost(formData)
                      )
                    }
                  />
                </SignedIn>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <SignedIn>
                  <PostForm
                    postData={null} // You can fetch post data here if needed
                    onSubmit={(formData) =>
                      import("../services/api").then(({ postService }) =>
                        postService.updatePost(formData)
                      )
                    }
                  />
                </SignedIn>
              }
            />

            {/* Redirect to sign-in if not signed in */}
            <Route
              path="/create"
              element={
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              }
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </PostProvider>
    </ClerkProvider>
  );
}

export default App;
