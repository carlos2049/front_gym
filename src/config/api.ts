import axios from 'axios';
import { appApiBaseUrl } from './index'

export default axios.create({
  baseURL: appApiBaseUrl,
  headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
});
