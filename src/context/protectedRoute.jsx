import React from 'react';
import { Navigate } from 'react-router-dom';

import { useEffect } from 'react';

const ProtectedRoute = ({ children,allowedRoles }) => {

  useEffect(() => {
    if(sessionStorage.getItem('SessionToken') === null){
      window.location.href = "/";
    } 
  }, []);
  const userRole = sessionStorage.getItem("perfil"); 

  return sessionStorage.getItem("SessionToken") != 'undefined'  ? children : <Navigate to="/" />;
};

export default ProtectedRoute;