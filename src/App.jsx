import React, { useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './scss/app.scss';

import { motion } from 'framer-motion';
import { useFollowPointer } from './use-follow-pointer';

function App() {
  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref);

  return (
    <div className="wrapper">
      <div className="container">
        <motion.div
          ref={ref}
          className="box"
          animate={{ x, y }}
          transition={{
            type: 'spring',
            damping: 3,
            stiffness: 50,
            restDelta: 0.001,
          }}
        />

        <Routes>
          <Route export path="/" element={<HomePage />} />
          <Route export path="/login" element={<LoginPage />} />
          <Route export path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
