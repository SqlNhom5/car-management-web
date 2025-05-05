import React from 'react';
import { ChevronLeft, Car, Users, ShoppingBag, UserCircle, LogOut } from 'lucide-react';
import NavItem from './NavItem';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  const navItems = [
    {
      id: 'dashboard',
      to: '/dashboard',
      title: 'Tổng Quan',
      icon: (
        <div className="w-6 h-6 flex items-center justify-center">
          <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
            <div className="bg-white"></div>
            <div className="bg-white"></div>
            <div className="bg-white"></div>
            <div className="bg-white"></div>
          </div>
        </div>
      ),
    },
    { id: 'cars', to: '/cars', title: 'Quản Lý Xe', icon: <Car className="w-6 h-6" /> },
    { id: 'customers', to: '/customers', title: 'Quản Lý Khách Hàng', icon: <Users className="w-6 h-6" /> },
    { id: 'sales', to: '/sales', title: 'Quản Lý Bán Hàng', icon: <ShoppingBag className="w-6 h-6" /> },
    { id: 'employees', to: '/employees', title: 'Quản Lý Nhân Viên', icon: <UserCircle className="w-6 h-6" /> },
  ];

  return (
    <div className="w-64 bg-blue-900 text-white min-h-screen flex flex-col">
      <div className="p-4 flex items-center justify-between border-b border-blue-800">
        <div className="flex items-center space-x-3">
          <UserCircle className="w-8 h-8" />
          <div>
            <p className="font-medium">Nguyễn Văn A</p>
            <p className="text-sm text-blue-300">Admin</p>
          </div>
        </div>
        <ChevronLeft className="w-6 h-6 cursor-pointer hover:text-blue-300" />
      </div>

      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {navItems.map(item => (
            <NavItem
              key={item.id}
              to={item.to}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </ul>
      </nav>

      <div className="border-t border-blue-800">
        <div className="p-4 flex items-center space-x-3 hover:bg-blue-800 cursor-pointer transition-colors"
          onClick={handleLogout}
        >
          <LogOut className="w-6 h-6" />
          <span>Đăng Xuất</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;