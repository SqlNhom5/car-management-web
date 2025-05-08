import React from 'react';
import CarFilter from '../components/cars/CarFilter';
import CarTable from '../components/cars/CarTable';
import { useCars } from '../hooks/useCars';

const CarListPage = () => {
  const { 
    cars, 
    searchTerm, 
    setSearchTerm, 
    selectedBrand, 
    setSelectedBrand,
    selectedStatus, 
    setSelectedStatus,
    filteredCars 
  } = useCars();

  return (
    <>
      <CarFilter 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedBrand={selectedBrand}
        onBrandChange={setSelectedBrand}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />
      
      <div className="mt-6">
        <CarTable cars={filteredCars} />
      </div>
    </>
  );
};

export default CarListPage;