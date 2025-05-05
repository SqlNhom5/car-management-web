import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Login from './pages/Login';
import CarManagementLayout from './components/layout/CarManagementLayout';
import Dashboard from './components/dashboard/Dashboard';
import Cars from './components/cars/Cars';
import Customers from './components/customers/Customers';
import Sales from './components/sales/Sales';
import Employees from './components/employees/Employees';
import CarDealership from './components/client/CarDealership';
import CarDetail from './components/client/CarDetail';
import './App.css';

// Component để bảo vệ các route yêu cầu đăng nhập
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <CarManagementLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="cars" element={<Cars />} />
              <Route path="customers" element={<Customers />} />
              <Route path="sales" element={<Sales />} />
              <Route path="employees" element={<Employees />} />
            </Route>
            <Route
              path="/client"
              element={
                <ProtectedRoute>
                  <CarDealership />
                </ProtectedRoute>
              }
            />
            <Route path="/client/car/:id" element={<ProtectedRoute><CarDetail /></ProtectedRoute>} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;