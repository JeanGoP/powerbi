import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import React from 'react';

  //{/*
  // Protección de la consola del navegador
// const protectConsole = () => {
//   // Deshabilitar console.log, console.warn, console.error en producción
//   if (process.env.NODE_ENV === 'production') {
//     console.log = () => {};
//     console.warn = () => {};
//     console.error = () => {};
//     console.info = () => {};
//     console.debug = () => {};
//   }
// }
// // Deshabilitar herramientas de desarrollador
// const disableDevTools = () => {
//   // Detectar si las herramientas de desarrollador están abiertas
//   const devtools = {
//     open: false,
//     orientation: null
//   };
  
//   const threshold = 160;
  
//   const emitEvent = (isOpen, orientation) => {
//     window.dispatchEvent(new CustomEvent('devtoolschange', {
//       detail: {
//         isOpen,
//         orientation
//       }
//     }));
//   };
  
//   setInterval(() => {
//     const widthThreshold = window.outerWidth - window.innerWidth > threshold;
//     const heightThreshold = window.outerHeight - window.innerHeight > threshold;
//     const orientation = widthThreshold ? 'vertical' : 'horizontal';
    
//     if (
//       !(heightThreshold && widthThreshold) &&
//       ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)
//     ) {
//       if ((!devtools.open) || (devtools.orientation !== orientation)) {
//         emitEvent(true, orientation);
//       }
//       devtools.open = true;
//       devtools.orientation = orientation;
//     } else {
//       if (devtools.open) {
//         emitEvent(false, orientation);
//       }
//       devtools.open = false;
//       devtools.orientation = orientation;
//     }
//   }, 500);
// }

    
//     // Escuchar el evento de cambio de herramientas de desarrollador
//     window.addEventListener('devtoolschange', (e) => {
//       if (e.detail.isOpen) { 
//         if (typeof sessionStorage !== 'undefined') {
//           sessionStorage.clear();
//         }
//         if (typeof localStorage !== 'undefined') {
//           sessionStorage.removeItem('SessionToken');
//           sessionStorage.removeItem('Usuario');
//           sessionStorage.removeItem('nombreusuario');
//         }
//         // Redirigir al login (ajustar la ruta según tu app)
//        window.location.href = '#/login'; 
//          alert('No está permitido usar las herramientas de desarrollador. Su sesión ha sido cerrada.');

//         // Bloquear toda la página para evitar cualquier interacción
//        let overlay = document.createElement('div');
//        overlay.style.position = 'fixed';
//        overlay.style.top = '0';
//        overlay.style.left = '0';
//        overlay.style.width = '100vw';
//        overlay.style.height = '100vh';
//        overlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
//        overlay.style.zIndex = '99999';
//        overlay.style.display = 'flex';
//        overlay.style.alignItems = 'center';
//        overlay.style.justifyContent = 'center';
//        overlay.style.color = 'white';
//        overlay.style.fontSize = '2rem';
//         overlay.style.fontFamily = 'Arial, sans-serif';
//        overlay.innerText = 'Acceso bloqueado por uso de herramientas de desarrollador.';

//         // Evitar cualquier evento de click o teclado
//         overlay.addEventListener('click', (e) => e.stopPropagation());
//         overlay.addEventListener('mousedown', (e) => e.stopPropagation());
//          overlay.addEventListener('mouseup', (e) => e.stopPropagation());
//         overlay.addEventListener('keydown', (e) => e.stopPropagation());
//          overlay.addEventListener('keyup', (e) => e.stopPropagation());

//         document.body.appendChild(overlay);
//        }
//     });

    
  
  
//   // Deshabilitar clic derecho
//   document.addEventListener('contextmenu', (e) => {
//     e.preventDefault();
//    return false;
//   });
  
// // Deshabilitar teclas de acceso directo
//   document.addEventListener('keydown', (e) => {
//     // F12
//     if (e.keyCode === 123) {
//       e.preventDefault();
//       return false;
//     }
//      // Ctrl+Shift+I
//     if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
//       e.preventDefault();
//       return false;
//     }
//         /// Ctrl+Shift+J
//     if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
//         e.preventDefault();
//       return false;
//     }
//     // Ctrl+U
//     if (e.ctrlKey && e.keyCode === 85) {
//       e.preventDefault();
//       return false;
//     }
//   });
  
//    disableDevTools();
 
 
//  protectConsole();
 
//   // */}

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <App />
  // </StrictMode>,
)
