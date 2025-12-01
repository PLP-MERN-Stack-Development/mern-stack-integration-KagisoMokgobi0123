import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import PostDetails from "../components/PostDetails";
import Footer from "../components/Footer";

const SinglePost = () => {
  const { id } = useParams();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <PostDetails postId={id} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SinglePost;
