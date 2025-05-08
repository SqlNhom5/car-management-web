import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Heart, Calendar } from 'lucide-react';
import { getToken } from '../../contexts/localStorageService';

const ClientLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const token = getToken(); 
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleLogin = () => {
    // Ví dụ: chuyển hướng đến trang đăng nhập
    window.location.href = '/login'; // Thay bằng đường dẫn thực tế
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/client" className="text-xl font-bold">Car Dealership</Link>
              <div className="flex space-x-4">
                <Link to="/client/cars" className="hover:text-blue-200">Danh sách xe</Link>
                <Link to="/client/favorites" className="hover:text-blue-200">
                  <Heart className="w-4 h-4 inline mr-1" /> Yêu thích
                </Link>
                <Link to="/client/appointment" className="hover:text-blue-200">
                  <Calendar className="w-4 h-4 inline mr-1" /> Đặt lịch hẹn
                </Link>
              </div>
            </div>
            <button
              onClick={token ? handleLogout : handleLogin}
              className="hover:text-blue-200"
            >
              {token ? 'Đăng Xuất' : 'Đăng Nhập'}
            </button>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-8 px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default ClientLayout;
