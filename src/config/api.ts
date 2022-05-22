import axios from 'axios';
const URL = process.env.REACT_APP_API_BASE_URL

const tokenLocalStorage = localStorage.getItem('React_token')

const instance = axios.create({
  baseURL: `${URL}`
});
instance.defaults.headers.common['Authorization'] = `Bearer ${tokenLocalStorage}`;

export default instance