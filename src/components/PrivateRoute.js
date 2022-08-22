/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/functions';

function PrivateRoute({ children }) {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated()
      .then(() => {
        setAuth(true);
      })
      .catch(() => {
        navigate('/');
      });
  }, []);

  return auth ? children : null;
}

export default PrivateRoute;
