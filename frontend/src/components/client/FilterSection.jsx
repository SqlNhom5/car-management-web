import React from 'react';
import './styles/FilterSection.css';

const FilterSection = ({ onFilterChange, filters }) => {
    const handlePriceChange = (e) => {
        onFilterChange({
            ...filters,
            priceRange: [parseInt(e.target.value), filters.priceRange[1]]
        });
    };

    const handleBrandChange = (e) => {
        onFilterChange({
            ...filters,
            selectedBrand: e.target.value
        });
    };

    const handleTypeChange = (e) => {
        onFilterChange({
            ...filters,
            selectedType: e.target.value
        });
    };

    const brands = ['Toyota', 'Honda', 'Mazda', 'Hyundai', 'Kia', 'VinFast'];
    const types = ['Sedan', 'SUV', 'Hatchback', 'Electric'];

    return (
        <div className="filter-section">
            <h2>Bộ lọc</h2>
            <div className="filter-group">
                <label>Khoảng giá:</label>
                <div className="price-range">
                    <span>{filters.priceRange[0].toLocaleString('vi-VN')} VNĐ</span>
                    <input
                        type="range"
                        min="0"
                        max="2000000000"
                        step="100000000"
                        value={filters.priceRange[0]}
                        onChange={handlePriceChange}
                    />
                    <span>{filters.priceRange[1].toLocaleString('vi-VN')} VNĐ</span>
                </div>
            </div>

            <div className="filter-group">
                <label>Hãng xe:</label>
                <select
                    value={filters.selectedBrand}
                    onChange={handleBrandChange}
                >
                    <option value="all">Tất cả</option>
                    {brands.map((brand) => (
                        <option key={brand} value={brand.toLowerCase()}>
                            {brand}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>Loại xe:</label>
                <select
                    value={filters.selectedType}
                    onChange={handleTypeChange}
                >
                    <option value="all">Tất cả</option>
                    {types.map((type) => (
                        <option key={type} value={type.toLowerCase()}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default FilterSection; 