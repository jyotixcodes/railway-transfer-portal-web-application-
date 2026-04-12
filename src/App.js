import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PostTransfer from './pages/PostTransfer';
import SearchTransfer from './pages/SearchTransfer';
import AdminPanel from './pages/AdminPanel';
import Profile from './pages/Profile';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />
        <Route path="/post-transfer" element={
          <PrivateRoute><PostTransfer /></PrivateRoute>
        } />
        <Route path="/search" element={
          <PrivateRoute><SearchTransfer /></PrivateRoute>
        } />
        <Route path="/admin" element={
          <PrivateRoute><AdminPanel /></PrivateRoute>
        } />
        <Route path="/profile" element={
        <PrivateRoute><Profile /></PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;