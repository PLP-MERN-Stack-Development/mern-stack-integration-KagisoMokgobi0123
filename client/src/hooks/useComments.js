import { useState, useEffect } from "react";
import { postService } from "../services/api";

export const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const post = await postService.getPost(postId);
      setComments(post.comments || []);
    } catch (err) {
      setError(err.message || "Failed to fetch comments");
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (text) => {
    const commentData = { text };
    try {
      const updatedComments = await postService.addComment(postId, commentData);
      setComments(updatedComments);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return { comments, addComment, loading, error };
};
