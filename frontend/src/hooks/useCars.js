import { useState } from 'react';
import { carData } from '../data/carData';

export const useCars = () => {
  const [cars] = useState(carData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('Tất Cả Hãng Xe');
  const [selectedStatus, setSelectedStatus] = useState('Tất Cả Trạng Thái');

  // Filter cars based on search term, brand, and status
  const filteredCars = cars.filter(car => {
    // Search term filter
    const matchesSearch = 
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Brand filter
    const matchesBrand = 
      selectedBrand === 'Tất Cả Hãng Xe' || 
      car.brand === selectedBrand;
    
    // Status filter
    const matchesStatus = 
      selectedStatus === 'Tất Cả Trạng Thái' || 
      (selectedStatus === 'Còn Hàng' && car.quantity > 0) ||
      (selectedStatus === 'Hết Hàng' && car.quantity === 0);
    
    return matchesSearch && matchesBrand && matchesStatus;
  });

  return {
    cars,
    searchTerm,
    setSearchTerm,
    selectedBrand,
    setSelectedBrand,
    selectedStatus,
    setSelectedStatus,
    filteredCars
  };
};