import axios from 'axios';

export const transactionsAPI = {
  all: () => {
    return axios.get('http://localhost:3001/transactions');
  },
  create: data => {
    return axios.post('http://localhost:3001/transactions', data);
  },
};
