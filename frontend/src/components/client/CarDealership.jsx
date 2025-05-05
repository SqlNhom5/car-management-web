import React, { useState } from 'react';
import Header from './Header';
import CarList from './CarList';
import FilterSection from './FilterSection';
import './styles/CarDealership.css';

const CarDealership = () => {
    const [filters, setFilters] = useState({
        priceRange: [0, 2000000000],
        selectedBrand: 'all',
        selectedType: 'all'
    });

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="car-dealership">
            <Header />
            <div className="main-content">
                <FilterSection
                    onFilterChange={handleFilterChange}
                    filters={filters}
                />
                <CarList filters={filters} />
            </div>
        </div>
    );
};

export default CarDealership;