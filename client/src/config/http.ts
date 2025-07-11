import axios, { type AxiosInstance } from 'axios';
import { envConfig } from './envConfig';
const API_BASE_URL = envConfig.VITE_API_URL || 'http://localhost:5000/api';
const http:AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // Timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});
export default http;