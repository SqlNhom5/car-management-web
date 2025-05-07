import React, { useState, useEffect } from 'react';
import CarForm from './CarForm';
import CarTable from './CarTable';

const CarTableWrapper = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);

  const fetchCars = async () => {
    try {
      console.log('Fetching cars from API...');
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }
      const response = await fetch('http://localhost:8080/api/cars', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('GET /api/cars status:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('API response:', data);
      if (data.code === 1000 && Array.isArray(data.result)) {
        setCars(data.result);
        console.log('Updated cars state:', data.result);
      } else {
        throw new Error(data.message || 'Invalid API response');
      }
    } catch (err) {
      console.error('Fetch cars error:', err.message);
      setError(err.message);
    }
  };

  useEffect(() => {
    console.log('Initial fetchCars on mount');
    fetchCars();
  }, []);

  const handleCarAdded = (newCar) => {
    console.log('handleCarAdded called with:', newCar);
    fetchCars(); // Reload danh sách xe từ backend
    setShowForm(false);
    setEditingCar(null);
  };

  const handleCarUpdated = (updatedCar) => {
    console.log('handleCarUpdated called with:', updatedCar);
    fetchCars(); // Reload danh sách xe từ backend
    setShowForm(false);
    setEditingCar(null);
  };

  const handleCloseForm = () => {
    console.log('handleCloseForm called');
    fetchCars(); // Reload danh sách xe khi đóng popup
    setShowForm(false);
    setEditingCar(null);
  };

  const handleEdit = (car) => {
    console.log('handleEdit called with:', car);
    setEditingCar(car);
    setShowForm(true);
  };

  const handleDelete = async (car) => {
    try {
      console.log('handleDelete called with:', car);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }
      const response = await fetch(`http://localhost:8080/api/cars/${car.carId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('DELETE /api/cars status:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchCars(); // Reload danh sách xe từ backend
    } catch (err) {
      console.error('Delete car error:', err.message);
      setError(err.message);
    }
  };

  return (
    <div className="p-4">
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={() => {
          console.log('Opening form for new car');
          setEditingCar(null);
          setShowForm(true);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Thêm Xe
      </button>
      {showForm && (
        <CarForm
          car={editingCar}
          onCancel={handleCloseForm}
          onCarAdded={editingCar ? handleCarUpdated : handleCarAdded}
        />
      )}
      <CarTable cars={cars} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default CarTableWrapper;