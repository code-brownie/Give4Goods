import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const Navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(() => {

    const authToken = localStorage.getItem('authToken');
    return !!authToken;
  });
  const MySwal = withReactContent(Swal)
  const showMessage_success = (message) => {
    MySwal.fire({
      title: <strong>Good job!</strong>,
      html: <i>{message}</i>,
      icon: 'success'
    })
  };
  const showMessage_danger = (message) => {
    MySwal.fire({
      title: <strong>Not Verified!</strong>,
      html: <i>{message}</i>,
      icon: 'error'
    })
  };
  const handleLogin = () => {
    setIsLoggedIn(true);

    Navigate('/product');
  };
  const handleSignIn = () => {
    setIsLoggedIn(true);
    Navigate('/product');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');

    Navigate('/');
  };
  const [foundProduct, setFoundProduct] = useState(false);
  const handleFoundProduct = (value) => {
    setFoundProduct(value)

  }
  return (
    <AuthContext.Provider value={{ showMessage_success, showMessage_danger, isLoggedIn, handleLogin, handleLogout, handleSignIn, handleFoundProduct, foundProduct }}>
      {children}
    </AuthContext.Provider>
  );
};
