import React, { useRef, useState } from 'react';
import { Route, Routes, HashRouter as BrowserRouter,Navigate,useLocation } from 'react-router-dom';
import {Home} from '../pages/home'
import Navbar from '../componentes/navbar';
import ReportePage from '../pages/reportePage';
import { ToastContainer } from "react-toastify";
import Footer from '../componentes/footer';
import { Login } from '../pages/login';
import ProtectedRoute from '../context/protectedRoute';
import Configuracion from '../pages/configuracion';
function AppRoutesWrapper() {
  const location = useLocation();
  const path = location.pathname.toLowerCase().replace(/\/+$/, '');

  const ocultarLayout = path === '/login';
  
  return (
    <div className="d-flex flex-column min-vh-100">
      {!ocultarLayout && <Navbar /> } 
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={ <ProtectedRoute allowedRoles={["Super Administrador","Consultor","PowerBI"]}><Home /></ProtectedRoute> } />
        <Route path="/reporte" element={<ProtectedRoute allowedRoles={["Super Administrador","Consultor","PowerBI"]}><ReportePage /></ProtectedRoute>} />
        <Route path="/configuracion" element={<ProtectedRoute allowedRoles={["Super Administrador"]}><Configuracion /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      
      {!ocultarLayout && <Footer/> } 
    </div>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <AppRoutesWrapper />
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}

export default AppRoutes;