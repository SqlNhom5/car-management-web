import React, { useState, useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import { formatPrice } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

const CarList = () => {
  const { cars } = useData();
  const maxPrice = Math.max(...cars.map(car => car.price));
  const [filteredCars, setFilteredCars] = useState(cars);
  const [priceRange, setPriceRange] = useState(maxPrice);
  const [selectedBrand, setSelectedBrand] = useState('Tất cả');
  const [selectedSeats, setSelectedSeats] = useState('Tất cả');
  const [selectedModel, setSelectedModel] = useState('Tất cả');

  useEffect(() => {
    let result = [...cars];

    // Lọc xe có giá nhỏ hơn hoặc bằng giá đã chọn
    result = result.filter(car => car.price <= priceRange);

    // Lọc theo hãng xe
    if (selectedBrand !== 'Tất cả') {
      result = result.filter(car => car.brand === selectedBrand);
    }

    // Lọc theo số chỗ
    if (selectedSeats !== 'Tất cả') {
      result = result.filter(car => car.numberOfSeats === Number(selectedSeats));
    }

    // Lọc theo model
    if (selectedModel !== 'Tất cả') {
      result = result.filter(car => car.model === selectedModel);
    }

    setFilteredCars(result);
  }, [cars, priceRange, selectedBrand, selectedSeats, selectedModel]);

  // Tạo danh sách hãng xe duy nhất từ dữ liệu
  const brands = [...new Set(cars.map(car => car.brand))].sort();
  const brandOptions = ['Tất cả', ...brands.filter(brand => brand !== 'Tất cả')];
  // Tạo danh sách số chỗ duy nhất từ dữ liệu
  const seats = ['Tất cả', ...new Set(cars.map(car => car.numberOfSeats))].sort((a, b) => a - b);
  // Tạo danh sách model duy nhất từ dữ liệu (tương tự như hãng xe)
  const models = [...new Set(cars.map(car => car.model))].sort();
  const modelOptions = ['Tất cả', ...models.filter(model => model !== 'Tất cả')];

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
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full"
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
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                {brandOptions.map(brand => (
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
                onChange={(e) => setSelectedSeats(e.target.value)}
              >
                {seats.map(seat => (
                  <option key={seat} value={seat}>{seat}</option>
                ))}
              </select>
            </div>

            {/* Lọc theo model (thêm vào dưới cùng) */}
            <div>
              <p className="mb-2">Loại xe:</p>
              <select
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
              >
                {modelOptions.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Danh sách xe */}
        <div className="flex-1">
          {filteredCars.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Không tìm thấy xe phù hợp với tiêu chí tìm kiếm
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map(car => (
                <CarCard key={car.carId} car={car} />
              ))}
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
  const isFavorite = favorites.includes(car.carId);

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
            className={`w-5 h-5 ${favorites.some((fav) => fav.carId === car.carId)
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