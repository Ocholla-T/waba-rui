import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from '@pages/dashboard'
import { Register } from '@pages/register'
import './index.scss'
import { Login } from '@pages/login'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="auth/register" element={<Register />} />
        <Route path="auth/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
