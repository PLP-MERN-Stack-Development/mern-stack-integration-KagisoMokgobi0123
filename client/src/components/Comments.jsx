import React, { useState } from "react";
import { useComments } from "../hooks/useComments";

const Comments = ({ postId }) => {
  const { comments, addComment, loading, error } = useComments(postId);
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await addComment(text);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>

      {loading && <p className="text-gray-500">Loading comments...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4 mb-4">
        {comments.map((c) => (
          <div key={c._id} className="border rounded p-2 bg-gray-50 shadow-sm">
            <p className="text-sm font-semibold">{c.userName || "Anonymous"}</p>
            <p>{c.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <textarea
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          className="border rounded px-3 py-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default Comments;
