import axios from 'axios';

const clientApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_SERVER_URL || 'http://localhost:3000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getInference = async (formData: FormData) => {
  return clientApi.post('/inference', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};