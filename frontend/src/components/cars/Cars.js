import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import Modal from '../shared/Modal';
import CarForm from './CarForm';
import DeleteConfirmation from '../shared/DeleteConfirmation';
import CarTable from './CarTable';
import CarFilter from './CarFilter';
import Pagination from './Pagination';

const Cars = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('Tất Cả Hãng Xe');
  const { cars, addCar, updateCar, deleteCar, currentPage, setCurrentPage, totalPages } = useData();

  // Debug: Log context values to verify
  console.log('DataContext values:', { cars, currentPage, setCurrentPage, totalPages });

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.carName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === 'Tất Cả Hãng Xe' || car.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  const handleAdd = async (formData, imageFile) => {
    try {
      await addCar(formData, imageFile);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Failed to add car:', error);
    }
  };

  const handleEdit = async (formData, imageFile) => {
    try {
      await updateCar({ ...selectedCar, ...formData }, imageFile);
      setIsEditModalOpen(false);
      setSelectedCar(null);
    } catch (error) {
      console.error('Failed to update car:', error);
    }
  };

  const handleDelete = () => {
    deleteCar(selectedCar.carId);
    setIsDeleteModalOpen(false);
    setSelectedCar(null);
  };

  return (
    <div className="p-4">
      <CarFilter 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedBrand={selectedBrand}
        onBrandChange={setSelectedBrand}
        onAddClick={() => setIsAddModalOpen(true)}
      />

      <CarTable 
        cars={filteredCars}
        onEdit={(car) => {
          setSelectedCar(car);
          setIsEditModalOpen(true);
        }}
        onDelete={(car) => {
          setSelectedCar(car);
          setIsDeleteModalOpen(true);
        }}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        title="Thêm Xe Mới"
      >
        <CarForm 
          onSubmit={handleAdd}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)}
        title="Sửa Thông Tin Xe"
      >
        <CarForm 
          car={selectedCar}
          onSubmit={handleEdit}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>

      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        title="Xác Nhận Xóa"
      >
        <DeleteConfirmation 
          message={`Bạn có chắc chắn muốn xóa xe ${selectedCar?.carName}?`}
          onConfirm={handleDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Cars;