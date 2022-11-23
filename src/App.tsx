import React, { useState } from 'react';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

export const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleChangeLoggedIn = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="w-full h-full flex justify-center">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" replace={true} />
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <Dashboard />
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route
            path="/login"
            element={<Login onLoggedInChange={handleChangeLoggedIn} />}
          />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
