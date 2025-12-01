import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition p-4 mb-4">
      {post.featuredImage && (
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-48 object-cover mb-2"
        />
      )}
      <h2 className="text-xl font-bold mb-2">
        <Link to={`/post/${post._id}`} className="hover:text-blue-600">
          {post.title}
        </Link>
      </h2>
      <p className="text-gray-700">{post.content.substring(0, 100)}...</p>
      <p className="text-sm text-gray-500 mt-2">
        <strong>Category:</strong> {post.category?.name || "Uncategorized"}
      </p>
      <Link
        to={`/post/${post._id}`}
        className="inline-block mt-2 text-blue-600 hover:underline"
      >
        Read More
      </Link>
    </div>
  );
};

export default PostCard;
