// import './App.css'

import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import UserLogin from './pages/Login';
import Client from './pages/Client';
import Project from './pages/Project';
import AddClient from './pages/AddClient';
import GetProject from './pages/GetProject';
import AddProject from './pages/AddProject';
import EditProject from './pages/EditProject';

// Auth wrapper
import React from 'react';
import Payment from './pages/Payment';
const RequireAuth = ({ children }: { children: React.ReactElement }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};



function App() {
  // Get role from localStorage (set this on login/register)
  const role = localStorage.getItem('role');

  // Role-based dashboard route
  const DashboardRoute = () => {
    if (role === 'admin') return <AdminDashboard />;
    return <Dashboard />;
  };

  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<UserLogin />} />
  <Route path="/dashboard" element={<RequireAuth><DashboardRoute /></RequireAuth>} />
  <Route path="/client" element={<RequireAuth><Client /></RequireAuth>} />
  <Route path="/projects" element={<RequireAuth><GetProject /></RequireAuth>} />
  <Route path="/client/:id/projects" element={<RequireAuth><Project /></RequireAuth>} />
  <Route path="/client/:id/projects/create" element={<RequireAuth><AddProject /></RequireAuth>} />
  <Route path="/add-client" element={<RequireAuth><AddClient /></RequireAuth>} />
  <Route path="/admin/dashboard" element={<RequireAuth><AdminDashboard /></RequireAuth>} />
  <Route path="/payment" element={role === 'admin' ? <RequireAuth><Payment /></RequireAuth> : <Navigate to="/dashboard" replace />} />
  <Route path="/edit-project/:id" element={<RequireAuth><EditProject /></RequireAuth>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
