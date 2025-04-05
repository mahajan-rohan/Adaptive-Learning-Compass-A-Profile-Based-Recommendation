import axios from "axios"; // Ensure axios is installed and imported correctly

const API_URL = process.env.API_URL || "http://localhost:5000/api"; // Use environment variable for backend URL

export const api = {
  // User API calls
  getAllUsers: async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  },
  createUser: async (userData: any) => {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  },
  updateUser: async ({ id, userData }: any) => {
    const response = await axios.put(`${API_URL}/users/${id}`, userData);
    return response.data;
  },
  deleteUser: async (id: any) => {
    const response = await axios.delete(`${API_URL}/users/${id}`);
    return response.data;
  },

  // Post API calls
  getAllPosts: async () => {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  },
  createPost: async (postData: any) => {
    const response = await axios.post(`${API_URL}/posts`, postData);
    return response.data;
  },
  updatePost: async ({ id, postData }: any) => {
    const response = await axios.put(`${API_URL}/posts/${id}`, postData);
    return response.data;
  },
  deletePost: async (id: any) => {
    const response = await axios.delete(`${API_URL}/posts/${id}`);
    return response.data;
  },
};
