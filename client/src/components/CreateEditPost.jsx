import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostForm from "./PostForm";
import { postService } from "../services/api";

const CreateEditPost = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      postService
        .getPost(id)
        .then((data) => setPostData(data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (formData) => {
    if (id) {
      await postService.updatePost(id, formData);
    } else {
      await postService.createPost(formData);
    }
  };

  if (loading) return <p className="text-center mt-4">Loading post data...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <PostForm postData={postData} onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateEditPost;
