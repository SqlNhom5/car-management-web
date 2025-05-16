import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useData } from '../../contexts/DataContext';
import { formatPrice } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Pagination from '../cars/Pagination';

const CarList = () => {
  const { cars, favorites, toggleFavorite, carsCurrentPage, setCarsCurrentPage, carsTotalPages, fetchCarsWithFilters, carsLoading, carsError } = useData();
  const [priceRange, setPriceRange] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState('Tất cả');
  const [selectedSeats, setSelectedSeats] = useState('Tất cả');
  const [selectedModel, setSelectedModel] = useState('Tất cả');
  const [maxPrice, setMaxPrice] = useState(0);
  const [filters, setFilters] = useState({
    priceMax: undefined,
    brand: 'Tất cả',
    seats: 'Tất cả',
    model: 'Tất cả',
  });

  // Debounce function for API calls
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Debounced fetch function
  const debouncedFetchCars = useCallback(
    debounce((filters, page) => {
      fetchCarsWithFilters(filters, page);
    }, 500),
    [fetchCarsWithFilters]
  );

  // Initial fetch without filters to populate options
  useEffect(() => {
    fetchCarsWithFilters({}, 0);
  }, [fetchCarsWithFilters]);

  // Update filters and fetch when they change
  useEffect(() => {
    const newFilters = {
      priceMax: priceRange > 0 ? priceRange : undefined,
      brand: selectedBrand,
      seats: selectedSeats,
      model: selectedModel,
    };
    setFilters(newFilters);
    debouncedFetchCars(newFilters, carsCurrentPage);
  }, [priceRange, selectedBrand, selectedSeats, selectedModel, carsCurrentPage, debouncedFetchCars]);

  // Update maxPrice when cars change
  useEffect(() => {
    if (cars && cars.length > 0) {
      const newMaxPrice = Math.max(...cars.map(car => car.price), 0);
      setMaxPrice(newMaxPrice);
      if (priceRange === 0) {
        setPriceRange(newMaxPrice);
      }
    } else {
      setMaxPrice(0);
      if (priceRange === 0) setPriceRange(0);
    }
  }, [cars, priceRange]);

  // Memoize filter options to prevent recalculating on every render
  const brands = useMemo(() => {
    return cars && cars.length > 0 ? ['Tất cả', ...[...new Set(cars.map(car => car.brand))].sort()] : ['Tất cả'];
  }, [cars]);

  const seats = useMemo(() => {
    return cars && cars.length > 0 ? ['Tất cả', ...[...new Set(cars.map(car => car.numberOfSeats))].sort((a, b) => a - b)] : ['Tất cả'];
  }, [cars]);

  const models = useMemo(() => {
    return cars && cars.length > 0 ? ['Tất cả', ...[...new Set(cars.map(car => car.model))].sort()] : ['Tất cả'];
  }, [cars]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Danh sách xe</h1>
      <div className="flex gap-6">
        {/* Bộ lọc (sidebar bên trái) */}
        <div className="w-64 bg-white rounded-lg p-4 h-fit">
          <h2 className="text-lg font-bold mb-4">Bộ lọc</h2>
          <div className="space-y-4">
            {/* Lọc theo giá */}
            <div>
              <p className="mb-2">
                Khoảng giá: {priceRange > 0 ? formatPrice(priceRange) : 'Tất cả'}
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  step="1000"
                  value={priceRange}
                  onChange={(e) => {
                    setPriceRange(Number(e.target.value));
                    setCarsCurrentPage(0);
                  }}
                  className="w-full"
                  disabled={maxPrice === 0 || carsLoading}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>0đ</span>
                <span>{formatPrice(maxPrice)}</span>
              </div>
            </div>
            {/* Lọc theo hãng xe */}
            <div>
              <p className="mb-2">Hãng xe:</p>
              <select
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  setCarsCurrentPage(0);
                }}
                disabled={brands.length <= 1 || carsLoading}
              >
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            {/* Lọc theo số chỗ */}
            <div>
              <p className="mb-2">Số chỗ:</p>
              <select
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedSeats}
                onChange={(e) => {
                  setSelectedSeats(e.target.value);
                  setCarsCurrentPage(0);
                }}
                disabled={seats.length <= 1 || carsLoading}
              >
                {seats.map(seat => (
                  <option key={seat} value={seat}>{seat}</option>
                ))}
              </select>
            </div>
            {/* Lọc theo model */}
            <div>
              <p className="mb-2">Loại xe:</p>
              <select
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedModel}
                onChange={(e) => {
                  setSelectedModel(e.target.value);
                  setCarsCurrentPage(0);
                }}
                disabled={models.length <= 1 || carsLoading}
              >
                {models.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* Danh sách xe */}
        <div className="flex-1">
          {carsLoading ? (
            <div className="text-center py-8 text-gray-500">
              Đang tải danh sách xe...
            </div>
          ) : carsError ? (
            <div className="text-center py-8 text-red-500">
              Lỗi khi tải danh sách xe: {carsError}
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Không tìm thấy xe phù hợp với tiêu chí tìm kiếm
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map(car => (
                  <CarCard key={car.carId} car={car} />
                ))}
              </div>
              <Pagination
                currentPage={carsCurrentPage}
                totalPages={carsTotalPages}
                onPageChange={setCarsCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CarCard = ({ car }) => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useData();
  const isFavorite = favorites.some((fav) => fav.carId === car.carId);

  const handleBooking = () => {
    if (car.count > 0) {
      navigate(`/client/appointment/${car.carId}`);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden">
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
          <Heart
            className={`w-5 h-5 ${isFavorite
                ? 'fill-red-500 text-red-500'
                : 'fill-gray-500 text-gray-500'
              }`}
          />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{car.carName}</h3>
        <p className="text-red-600 font-bold text-xl mb-4">
          {formatPrice(car.price)}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">{car.brand}</span>
          <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">{car.model}</span>
          <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">+3 more</span>
        </div>
        <div className="flex justify-between">
          {car.count > 0 ? (
            <button
              onClick={handleBooking}
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
};

export default CarList;