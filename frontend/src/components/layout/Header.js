import React from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const getTitleFromPath = (pathname) => {
    switch (pathname) {
      case '/dashboard':
        return 'Tổng Quan';
      case '/cars':
        return 'Quản Lý Xe';
      case '/customers':
        return 'Quản Lý Khách Hàng';
      case '/sales':
        return 'Quản Lý Bán Hàng';
      case '/employees':
        return 'Quản Lý Nhân Viên';
      default:
        return '';
    }
  };

  return (
    <header className="bg-white shadow">
      <div className="p-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          {getTitleFromPath(location.pathname)}
        </h1>
      </div>
    </header>
  );
};

export default Header;