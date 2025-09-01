import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // Django API root
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Optional: for cookie/session auth
});

export default axiosInstance;
