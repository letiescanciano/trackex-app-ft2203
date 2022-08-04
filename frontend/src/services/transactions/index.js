import axios from 'axios';

export const transactionsAPI = {
  all: () => axios.get('http://localhost:3001/transactions'),
  create: data => axios.post('http://localhost:3001/transactions', data),
  update: data =>
    axios.put(`http://localhost:3001/transactions/${data.id}`, data),
  delete: id => axios.delete(`http://localhost:3001/transactions/${id}`),
};
