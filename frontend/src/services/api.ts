
import axios from 'axios';

export const backendUrl = 'http://localhost:3000/bookapi/';

export const api = axios.create({
  baseURL: backendUrl,
});