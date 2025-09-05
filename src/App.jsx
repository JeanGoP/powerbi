import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { LanguageProvider } from './context/context'

function App() {


  return (
    <>
     <LanguageProvider>
      <AppRoutes />
      </LanguageProvider>
    </>
  )
}

export default App
