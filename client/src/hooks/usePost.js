import { useState, useEffect } from "react";
import { postService } from "../services/api";

export const usePost = (id) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const data = await postService.getPost(id);
        setPost(data);
      } catch (err) {
        setError(err.message || "Failed to fetch post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return { post, loading, error };
};
