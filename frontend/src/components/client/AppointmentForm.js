import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { formatPrice } from '../../utils/formatters';
import { Calendar, Clock } from 'lucide-react';

const AppointmentForm = () => {
  const { carId } = useParams();
  const { cars, addAppointmentAndCustomer } = useData();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    note: ''
  });

  useEffect(() => {
    const selectedCar = cars.find(c => c.carId === Number(carId));
    if (!selectedCar || selectedCar.count === 0) {
      navigate('/client/cars');
      return;
    }
    setCar(selectedCar);
  }, [carId, cars, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!formData.name || !formData.phone || !formData.email || !formData.date || !formData.time) {
        alert('Vui lòng điền đầy đủ thông tin');
        return;
      }

      addAppointmentAndCustomer(formData, carId );
      
      navigate('/client/cars');
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra khi đặt lịch hẹn');
    }
  };

  if (!car) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Đặt lịch xem xe</h1>
      
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="flex gap-4 mb-4">
          <img 
            src={`http://localhost:8080${car.imageUrl}`} 
            alt={car.carName} 
            className="w-32 h-32 object-cover rounded"
          />
          <div>
            <h2 className="text-xl font-semibold">{car.carName}</h2>
            <p className="text-red-600 font-bold">{formatPrice(car.price)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full border rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full border rounded-md p-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ngày hẹn</label>
              <div className="relative">
                <Calendar className="absolute left-2 top-2.5 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="w-full border rounded-md p-2 pl-9"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Giờ hẹn</label>
              <div className="relative">
                <Clock className="absolute left-2 top-2.5 w-5 h-5 text-gray-400" />
                <input
                  type="time"
                  value={formData.time}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                  className="w-full border rounded-md p-2 pl-9"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
            <textarea
              value={formData.note}
              onChange={e => setFormData({...formData, note: e.target.value})}
              className="w-full border rounded-md p-2 h-32"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Đặt lịch hẹn
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
