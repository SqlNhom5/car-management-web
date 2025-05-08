import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Login from './pages/Login';
import CarManagementLayout from './components/layout/CarManagementLayout';
import ClientLayout from './components/client/ClientLayout';
import Dashboard from './components/dashboard/Dashboard';
import Cars from './components/cars/Cars';
import Customers from './components/customers/Customers';
import Sales from './components/sales/Sales';
import Employees from './components/employees/Employees';
import CarList from './components/client/CarList';
import FavoriteList from './components/client/FavoriteList';
import AppointmentForm from './components/client/AppointmentForm';
import AppointmentManagement from './components/appointments/AppointmentManagement';
import CarDetail from './components/client/CarDetail';
import Register from './pages/Register';
import { getToken } from './contexts/localStorageService';

// ProtectedRoute cho Admin: Yêu cầu vai trò admin
const ProtectedAdminRoute = ({ children }) => {
  const getUserRole = () => {
    const token = getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub === 'admin' || payload.scope === 'ROLE_ADMIN' ? 'admin' : null;
    } catch (error) {
      console.error('Lỗi khi giải mã token:', error);
      return null;
    }
  };

  const userRole = getUserRole();

  if (!userRole || userRole !== 'admin') {
    return <Navigate to="/client/cars" replace />;
  }

  return children;
};

// ProtectedRoute cho Client: Chỉ yêu cầu có token
const ProtectedClientRoute = ({ children }) => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Admin Routes */}
            <Route
              path="/"
              element={
                <ProtectedAdminRoute>
                  <CarManagementLayout />
                </ProtectedAdminRoute>
              }
            >
              <Route index element={<Navigate to="/client/cars" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="cars" element={<Cars />} />
              <Route path="customers" element={<Customers />} />
              <Route path="employees" element={<Employees />} />
              <Route path="appointments" element={<AppointmentManagement />} />
            </Route>

            {/* Client Routes */}
            <Route path="/client" element={<ClientLayout />}>
              <Route index element={<Navigate to="/client/cars" replace />} />
              <Route path="cars" element={<CarList />} />
              <Route path="cars/:carId" element={<CarDetail />} />

              {/* Yêu cầu token cho Favorites */}
              <Route
                path="favorites"
                element={
                  <ProtectedClientRoute>
                    <FavoriteList />
                  </ProtectedClientRoute>
                }
              />

              {/* Yêu cầu token cho Appointment */}
              <Route
                path="appointment/:carId"
                element={
                  <ProtectedClientRoute>
                    <AppointmentForm />
                  </ProtectedClientRoute>
                }
              />
            </Route>

            {/* Redirect unknown routes to /client */}
            <Route path="*" element={<Navigate to="/client" replace />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;