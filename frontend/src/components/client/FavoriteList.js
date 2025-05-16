import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { formatPrice } from '../../utils/formatters';
import Pagination from '../shared/Pagination';

const FavoriteList = () => {
  const { cars, favorites, toggleFavorite } = useData();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const favoriteCars = cars.filter(car => 
    favorites.some(fav => fav.carId === car.carId)
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFavorites = favoriteCars.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(favoriteCars.length / itemsPerPage);

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
        <h3 className="font-bold text-lg mb-2">{car.name}</h3>
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Xe Yêu Thích</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentFavorites.map(car => carContent(car))}
      </div>

      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default FavoriteList;
