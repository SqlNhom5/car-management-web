import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cars } from '../../data/cars';
import './styles/CarDetail.css';

const CarDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const car = cars.find(car => car.id === parseInt(id));

    if (!car) {
        return (
            <div className="car-detail">
                <button className="back-button" onClick={() => navigate(-1)}>
                    ← Quay lại
                </button>
                <div className="error-message">
                    Không tìm thấy thông tin xe
                </div>
            </div>
        );
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    return (
        <div className="car-detail">
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Quay lại
            </button>
            <div className="car-detail-content">
                <div className="car-detail-image">
                    <img src={car.image} alt={car.name} />
                </div>
                <div className="car-detail-info">
                    <h1>{car.name}</h1>
                    <p className="price">{formatPrice(car.price)}</p>

                    <div className="car-specifications">
                        <h2>Thông số kỹ thuật</h2>
                        <div className="spec-grid">
                            <div className="spec-item">
                                <span className="spec-label">Động cơ:</span>
                                <span className="spec-value">{car.specifications.engine}</span>
                            </div>
                            <div className="spec-item">
                                <span className="spec-label">Công suất:</span>
                                <span className="spec-value">{car.specifications.power}</span>
                            </div>
                            <div className="spec-item">
                                <span className="spec-label">Hộp số:</span>
                                <span className="spec-value">{car.specifications.transmission}</span>
                            </div>
                            <div className="spec-item">
                                <span className="spec-label">Tiêu hao nhiên liệu:</span>
                                <span className="spec-value">{car.specifications.fuelConsumption || car.specifications.range}</span>
                            </div>
                            <div className="spec-item">
                                <span className="spec-label">Số chỗ ngồi:</span>
                                <span className="spec-value">{car.specifications.seatingCapacity}</span>
                            </div>
                            <div className="spec-item">
                                <span className="spec-label">Màu sắc:</span>
                                <span className="spec-value">{car.specifications.color}</span>
                            </div>
                        </div>
                    </div>

                    <div className="car-features">
                        <h2>Tính năng</h2>
                        <div className="features-grid">
                            {car.features.map((feature, index) => (
                                <div key={index} className="feature-item">
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="car-description">
                        <h2>Mô tả</h2>
                        <p>{car.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetail; 