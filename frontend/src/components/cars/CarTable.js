import React, { useState, useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import { formatPrice } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';
import Pagination from '../cars/Pagination';

const CarTable = ({ cars, onEdit, onDelete, searchTerm, selectedBrand }) => {
  const { fetchCarsWithFilters, carsCurrentPage, setCarsCurrentPage, carsTotalPages, carsLoading, carsError } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching cars for page:", carsCurrentPage, "with filters:", { searchTerm, brand: selectedBrand });
    fetchCarsWithFilters({ searchTerm, brand: selectedBrand }, carsCurrentPage);
  }, [carsCurrentPage, fetchCarsWithFilters, searchTerm, selectedBrand]);

  const handleEdit = (car) => {
    onEdit(car);
    navigate(`/admin/cars/edit/${car.carId}`);
  };

  const handleDelete = async (car) => {
    if (window.confirm('Bạn có chắc muốn xóa xe này?')) {
      onDelete(car);
    }
  };

  if (carsLoading) {
    return <div className="text-center py-8 text-gray-500">Đang tải danh sách xe...</div>;
  }

  if (carsError) {
    return <div className="text-center py-8 text-red-500">Lỗi khi tải danh sách xe: {carsError}</div>;
  }

  if (cars.length === 0) {
    return <div className="text-center py-8 text-gray-500">Không có xe nào trong danh sách</div>;
  }

  console.log("Rendering CarTable with cars:", cars.length, "pages:", carsTotalPages);

  return (
    <div>
      {/* Bảng */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hình Ảnh
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên Xe
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hãng Xe
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Giá Bán
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tồn Kho
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao Tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cars.map((car) => (
              <tr key={car.carId}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {car.imageUrl ? (
                    <img
                      src={`http://localhost:8080${car.imageUrl}`}
                      alt={car.carName}
                      className="h-16 w-24 object-cover rounded"
                      onError={(e) => {
                        console.error(`Cannot load image for ${car.carName}:`, e);
                        e.target.src = 'https://via.placeholder.com/96x64?text=No+Image';
                      }}
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/96x64?text=No+Image"
                      alt="No Image"
                      className="h-16 w-24 object-cover rounded"
                    />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{car.carName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{car.brand}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatPrice(car.price)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{car.count}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-center space-x-2">
                    <button onClick={() => handleEdit(car)} className="text-blue-600 hover:text-blue-800">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 012.828 0L20 4.586 15.414 9.172a2 2 0 01-2.828 0L8 4.586z" />
                      </svg>
                    </button>
                    <button onClick={() => handleDelete(car)} className="text-red-600 hover:text-red-800">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang được tách ra và thêm khoảng cách */}
      {cars.length > 0 && (
        <div className="mt-6">
          <Pagination
            currentPage={carsCurrentPage}
            totalPages={carsTotalPages}
            onPageChange={setCarsCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default CarTable;