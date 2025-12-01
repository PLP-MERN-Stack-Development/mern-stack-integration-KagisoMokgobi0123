import React from "react";
import { usePosts } from "../hooks/usePosts";
import PostCard from "./PostCard";

const PostList = ({ category, search }) => {
  const { posts, loading, error } = usePosts(1, category, search);

  if (loading) return <p className="text-center mt-4">Loading posts...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;
  if (!posts.length) return <p className="text-center mt-4">No posts found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
