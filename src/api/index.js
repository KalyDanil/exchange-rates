import axios from 'axios';
import { toast } from 'react-toastify';

export const api = axios.create();

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
);

export const getExchangeRateReq = async (body) => {
  try {
    const res = await api.get('https://www.cbr-xml-daily.ru/daily_json.js');
    return res;
  } catch (err) {
    toast(err.message);
  }
};