import React, { createContext, useState, useEffect } from "react";

export const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch posts and categories
      const postsData = await postService.getAllPosts();
      setPosts(postsData);
      const categoriesData = await postService.getAllCategories();
      setCategories(categoriesData);
    };
    fetchData();
  }, []);

  return (
    <PostContext.Provider value={{ posts, categories }}>
      {children}
    </PostContext.Provider>
  );
};

// Correct export
export { PostProvider }; // This is key
