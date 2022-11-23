import axios from 'axios';

export const loginUser = (data: any) => {
  return axios.post('/api/account/login', data);
};

export const signupUser = (data: any) => {
  return axios.post('/api/account/signup', data);
};
