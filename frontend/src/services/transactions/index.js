import axios from 'axios';
const token = localStorage.getItem('token');

const BASE_URL = process.env.REACT_APP_API_URL;

const service = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
export const transactionsAPI = {
  all: () => service.get('/transactions'),
  create: data => service.post('/transactions', data),
  update: data => service.put(`/transactions/${data.id}`, data),
  delete: id => service.delete(`/transactions/${id}`),
};
