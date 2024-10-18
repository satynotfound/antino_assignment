import axios from 'axios';

const API_BASE_URL = 'http://localhost:3002/api/v1'; 

export const fetchPosts = async () => {
  const response = await axios.get(`${API_BASE_URL}/getData`);
  return response.data;
};

export const createPost = async (postData) => {
  const response = await axios.post(`${API_BASE_URL}/create`, postData);
  return response.data;
};