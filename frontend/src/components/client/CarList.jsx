import React from 'react';
import { useNavigate } from 'react-router-dom';
import CarCard from './CarCard';
import { cars } from '../../data/cars';
import './styles/CarList.css';

const CarList = ({ filters }) => {
    const navigate = useNavigate();

    const handleViewDetails = (carId) => {
        navigate(`/client/car/${carId}`);
    };

    const filteredCars = cars.filter(car => {
        // Lọc theo giá
        const priceInRange = car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1];

        // Lọc theo hãng xe
        const brandMatch = filters.selectedBrand === 'all' ||
            car.brand.toLowerCase() === filters.selectedBrand;

        // Lọc theo loại xe
        const typeMatch = filters.selectedType === 'all' ||
            car.type.toLowerCase() === filters.selectedType;

        return priceInRange && brandMatch && typeMatch;
    });

    return (
        <div className="car-list">
            <h2>Danh sách xe</h2>
            {filteredCars.length === 0 ? (
                <div className="no-results">
                    Không tìm thấy xe phù hợp với bộ lọc
                </div>
            ) : (
                <div className="car-grid">
                    {filteredCars.map((car) => (
                        <CarCard
                            key={car.id}
                            car={car}
                            onViewDetails={() => handleViewDetails(car.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CarList; 