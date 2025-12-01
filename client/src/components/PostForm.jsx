import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postService } from "../services/api"; // API service
import { useUser } from "@clerk/clerk-react"; // Clerk hook

const PostForm = ({ postId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (postId) {
      // Fetch existing post if postId is provided
      postService.getPost(postId).then((data) => {
        setTitle(data.title);
        setContent(data.content);
      });
    }
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      content,
      author: user?.firstName, // Use user data from Clerk
    };

    try {
      if (postId) {
        await postService.updatePost(postId, postData);
      } else {
        await postService.createPost(postData);
      }
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Error creating post", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Post Content"
        required
      />
      <button type="submit">{postId ? "Update" : "Create"} Post</button>
    </form>
  );
};

export default PostForm;
