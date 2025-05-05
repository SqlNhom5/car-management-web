import React from 'react';
import './styles/CarCard.css';

const CarCard = ({ car, onViewDetails }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    return (
        <div className="car-card">
            <img src={car.image} alt={car.name} className="car-image" />
            <div className="car-info">
                <h3>{car.name}</h3>
                <p className="price">{formatPrice(car.price)}</p>
                <div className="car-details">
                    <span className="brand">{car.brand}</span>
                    <span className="type">{car.type}</span>
                </div>
                <div className="features">
                    {car.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="feature-tag">
                            {feature}
                        </span>
                    ))}
                    {car.features.length > 3 && (
                        <span className="feature-tag">+{car.features.length - 3} more</span>
                    )}
                </div>
                <button className="view-details" onClick={onViewDetails}>
                    Xem chi tiết
                </button>
            </div>
        </div>
    );
};

export default CarCard; 