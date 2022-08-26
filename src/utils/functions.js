import axios from 'axios';

export const getConfig = (token) => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export const isAuthenticated = () => {
  const token = sessionStorage.getItem('token');

  return axios.get(`${process.env.REACT_APP_HOST_URL}/api/auth/verify`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
