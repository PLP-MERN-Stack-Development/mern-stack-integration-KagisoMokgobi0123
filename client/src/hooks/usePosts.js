import { useState, useEffect, useContext } from "react";
import { PostContext } from "../context/PostContext";

export const usePosts = (page = 1, category = null, search = "") => {
  const { posts, fetchPosts, loading, error } = useContext(PostContext);

  useEffect(() => {
    fetchPosts(page, category, search);
  }, [page, category, search]);

  return { posts, loading, error };
};
