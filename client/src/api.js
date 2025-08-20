import axios from "axios";

// Support both localhost and production environments
const API_URL = process.env.REACT_APP_API_URL || 
  (window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://internportal-vr68.onrender.com');

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export default api;


