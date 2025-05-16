import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { formatPrice } from '../../utils/formatters';
import Pagination from '../cars/Pagination';

const FavoriteList = () => {
  const { favorites, toggleFavorite, favoritesCurrentPage, setFavoritesCurrentPage, favoritesTotalPages, favoritesLoading, favoritesError } = useData();
  const navigate = useNavigate();

  const carContent = (car) => (
    <div key={car.carId} className="bg-white rounded-lg overflow-hidden">
      <div className="relative">
        <img 
          src={`http://localhost:8080${car.imageUrl}`} 
          alt={car.carName} 
          className="w-full h-48 object-cover cursor-pointer"
          onClick={() => navigate(`/client/cars/${car.carId}`)}
        />
        <button
          onClick={() => toggleFavorite(car.carId)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow hover:bg-gray-100"
        >
          <Heart className="w-5 h-5 fill-red-500 text-red-500" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{car.carName}</h3>
        <p className="text-red-600 font-bold text-xl mb-4">
          {formatPrice(car.price)}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">{car.brand}</span>
        </div>
        <div className="flex justify-between">
          {car.count > 0 ? (
            <button 
              onClick={() => navigate(`/client/appointment/${car.carId}`)}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Đặt lịch hẹn
            </button>
          ) : (
            <span className="px-4 py-2 bg-red-100 text-red-600 rounded-md">
              Hết hàng
            </span>
          )}
          <button 
            onClick={() => navigate(`/client/cars/${car.carId}`)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );

  if (favoritesLoading) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold mb-4">Xe Yêu Thích</h1>
        <p className="text-gray-500">Đang tải danh sách xe yêu thích...</p>
      </div>
    );
  }

  if (favoritesError) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold mb-4">Xe Yêu Thích</h1>
        <p className="text-red-500">Lỗi khi tải danh sách xe yêu thích: {favoritesError}</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold mb-4">Xe Yêu Thích</h1>
        <p className="text-gray-500">Bạn chưa có xe yêu thích nào</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Xe Yêu Thích</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {favorites.map(car => carContent(car))}
      </div>
      <Pagination
        currentPage={favoritesCurrentPage}
        totalPages={favoritesTotalPages}
        onPageChange={setFavoritesCurrentPage}
      />
    </div>
  );
};

export default FavoriteList;