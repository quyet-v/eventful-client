import axios from 'axios';

export const isAuthenticated = () => {
  const token = sessionStorage.getItem('token');

  return axios.get(`${process.env.REACT_APP_HOST_URL}/api/auth/verify`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postApiCall = async (url, info) => fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
  body: JSON.stringify(info),
});

export const postCallNoBody = async (url) => fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
});

export const putApiCall = async (link, info) => fetch(link, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
  body: JSON.stringify(info),
});

export const deleteApiCall = async (link) => fetch(link, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
});

export const getApiCall = async (url) => fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },

});
