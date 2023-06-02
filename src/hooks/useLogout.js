/* eslint-disable quote-props, no-console */

import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/userContext.jsx';

export default function useLogout(boolean) {
  const { userData, setUserData } = useContext(UserContext);
  const [logout, setLogout] = useState(boolean);
  const navigate = useNavigate();

  async function tryToLogout() {
    const token = JSON.parse(localStorage.getItem('linkr_token'));
    const userId = userData.id;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/signout/${userId}`, {}, config);
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem('linkr_token');
      setUserData(null);
      navigate('/');
    }
  }

  if (logout) return tryToLogout();

  const handleLogout = (newBoolean) => setLogout(newBoolean);

  return { logout, handleLogout };
}