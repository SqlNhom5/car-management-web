import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import Modal from '../shared/Modal';
import CarForm from './CarForm';
import DeleteConfirmation from '../shared/DeleteConfirmation';
import CarTable from './CarTable';
import CarFilter from './CarFilter';
import Pagination from '../shared/Pagination';

const Cars = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('Tất Cả Hãng Xe');
  const [currentPage, setCurrentPage] = useState(0);
  const { cars, totalPages, fetchCars, addCar, updateCar, deleteCar } = useData();
  const PAGE_SIZE = 10; // Define constant page size

  useEffect(() => {
    fetchCars(currentPage, PAGE_SIZE);
  }, [currentPage]); // Re-fetch when page changes

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.carName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === 'Tất Cả Hãng Xe' || car.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  const handleAdd = async (formData, imageFile) => {
    try {
      console.log('Adding car with data:', formData); // Debug log
      console.log('Image file:', imageFile); // Debug log
      
      const result = await addCar(formData, imageFile);
      if (result) {
        setIsAddModalOpen(false);
        await fetchCars(0, PAGE_SIZE);
        setCurrentPage(0);
        alert('Thêm xe thành công!');
      }
    } catch (error) {
      console.error('Failed to add car:', error);
      alert(`Thêm xe không thành công: ${error.message}`);
    }
  };

  const handleEdit = async (formData, imageFile) => {
    try {
      const result = await updateCar({ ...selectedCar, ...formData }, imageFile);
      if (result) {
        setIsEditModalOpen(false);
        setSelectedCar(null);
        await fetchCars(currentPage, PAGE_SIZE);
      }
    } catch (error) {
      console.error('Failed to update car:', error);
      alert('Cập nhật xe không thành công: ' + error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const success = await deleteCar(selectedCar.carId);
      if (success) {
        setIsDeleteModalOpen(false);
        setSelectedCar(null);
        await fetchCars(currentPage, PAGE_SIZE);
      }
    } catch (error) {
      console.error('Failed to delete car:', error);
      alert('Xóa xe không thành công: ' + error.message);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage - 1); // Convert 1-based to 0-based
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
        cars={cars}
        onEdit={(car) => {
          setSelectedCar(car);
          setIsEditModalOpen(true);
        }}
        onDelete={(car) => {
          setSelectedCar(car);
          setIsDeleteModalOpen(true);
        }}
      />

      <div className="mt-4">
        <Pagination
          currentPage={currentPage + 1} // Convert 0-based to 1-based for display
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

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