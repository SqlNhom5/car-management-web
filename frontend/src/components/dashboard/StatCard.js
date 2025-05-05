import React from 'react';

const StatCard = ({ title, value, change, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          {icon}
        </div>
      </div>
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <div className="flex items-center space-x-2">
        <p className="text-2xl font-semibold">{value}</p>
      </div>
      <p className="text-sm text-green-500 mt-2">{change}</p>
    </div>
  );
};

export default StatCard;
