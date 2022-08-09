import axios from 'axios';

const token = localStorage.getItem('token');
console.log('token', token);

const BASE_URL = 'http://localhost:3001';
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
