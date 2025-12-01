import axios from "axios";
import { useAuth } from "@clerk/clerk-react"; // Clerk React SDK hook

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach Clerk token (from Clerk React SDK)
api.interceptors.request.use(
  async (config) => {
    try {
      // Get the current user session
      const { getToken } = useAuth(); // Clerk's useAuth hook
      const token = await getToken(); // Clerk session token (this is the equivalent of `getAuthToken`)

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.warn("No Clerk token available", err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.errors?.[0]?.msg ||
      error.message ||
      "Unknown error";
    return Promise.reject(new Error(message));
  }
);

// ------------------------
// Post API services
// ------------------------
export const postService = {
  getAllPosts: async (page = 1, limit = 10, category = null) => {
    let url = `/posts?page=${page}&limit=${limit}`;
    if (category) url += `&category=${category}`;
    const res = await api.get(url);
    return res.data;
  },

  getPost: async (id) => {
    const res = await api.get(`/posts/${id}`);
    return res.data;
  },

  createPost: async (postData) => {
    const res = await api.post("/posts", postData);
    return res.data;
  },

  updatePost: async (id, postData) => {
    const res = await api.put(`/posts/${id}`, postData);
    return res.data;
  },

  deletePost: async (id) => {
    const res = await api.delete(`/posts/${id}`);
    return res.data;
  },

  addComment: async (postId, commentData) => {
    const res = await api.post(`/comments/${postId}`, commentData);
    return res.data;
  },

  searchPosts: async (query) => {
    const res = await api.get(`/posts/search?q=${query}`);
    return res.data;
  },
};

// ------------------------
// Category API services
// ------------------------
export const categoryService = {
  getAllCategories: async () => {
    const res = await api.get("/categories");
    return res.data;
  },

  createCategory: async (categoryData) => {
    const res = await api.post("/categories", categoryData);
    return res.data;
  },
};

export default api;
