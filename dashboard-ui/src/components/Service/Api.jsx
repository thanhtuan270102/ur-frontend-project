import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // baseURL cho tất cả các yêu cầu
  timeout: 10000, // thời gian timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;