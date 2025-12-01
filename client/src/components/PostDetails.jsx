import React from "react";
import { usePost } from "../hooks/usePost";
import Comments from "./Comments";

const PostDetails = ({ postId }) => {
  const { post, loading, error } = usePost(postId);

  if (loading) return <p className="text-center mt-4">Loading post...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;
  if (!post) return <p className="text-center mt-4">Post not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      {post.featuredImage && (
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-auto mb-4 rounded"
        />
      )}
      <p className="text-gray-700 mb-4">{post.content}</p>
      <p className="text-sm text-gray-500 mb-4">
        <strong>Category:</strong> {post.category?.name}
      </p>
      <Comments postId={post._id} />
    </div>
  );
};

export default PostDetails;
