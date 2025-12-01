import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { postService } from "../services/api"; // API service
import { useUser } from "@clerk/clerk-react"; // Clerk hook

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const { user } = useUser();

  useEffect(() => {
    postService.getPost(id).then((data) => setPost(data));
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      const commentData = {
        content: comment,
        userId: user.id,
      };
      await postService.addComment(id, commentData);
      setComment("");
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <div>
        <h3>Comments</h3>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
            required
          />
          <button type="submit">Submit</button>
        </form>

        {post.comments.map((comment) => (
          <div key={comment._id}>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SinglePost;
