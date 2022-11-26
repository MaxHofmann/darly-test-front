import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Routes>
      <Route export path="/" element={<HomePage />} />
      <Route export path="/login" element={<LoginPage />} />
      <Route export path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
