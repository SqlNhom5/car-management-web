import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ to, title, icon }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => `
          px-4 py-3 flex items-center space-x-3 cursor-pointer transition-colors
          ${isActive ? 'bg-blue-800' : 'hover:bg-blue-800'}
        `}
      >
        {icon}
        <span>{title}</span>
      </NavLink>
    </li>
  );
};

export default NavItem;