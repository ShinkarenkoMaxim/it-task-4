import axios from 'axios';

export const loginUser = (data: any) => {
  return axios.post('/api/account/login', data);
};

export const signupUser = (data: any) => {
  return axios.post('/api/account/signup', data);
};

export const getUsers = () => {
  return axios.get('/api/users');
};

export const deleteUsers = (usersIds: number[]) => {
  return axios.post('/api/users/delete', { ids: usersIds });
};

export const blockUsers = (usersIds: number[]) => {
  return axios.post('/api/users/block', { ids: usersIds });
};

export const unblockUsers = (usersIds: number[]) => {
  return axios.post('/api/users/unblock', { ids: usersIds });
};
