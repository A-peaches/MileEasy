import axios from 'axios';

const baseURL = process.env.VUE_APP_API_URL || '/api';

console.log('Creating axios instance with baseURL:', baseURL);

const instance = axios.create({
  baseURL: baseURL,
});

export default instance;