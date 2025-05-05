import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { formatPrice } from '../../utils/formatters';

const SaleForm = ({ sale, onSubmit, onCancel }) => {
  const { cars, customers } = useData();
  const [formData, setFormData] = useState({
    customer: '',
    car: '',
    value: '',
    status: 'Chờ Thanh Toán',
    ...sale
  });

  // Lọc xe còn hàng
  const availableCars = cars.filter(car => car.quantity > 0);

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(formData);
    }}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Khách Hàng</label>
          <select
            value={formData.customer}
            onChange={(e) => setFormData({...formData, customer: e.target.value})}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          >
            <option value="">Chọn khách hàng</option>
            {customers.map(customer => (
              <option key={customer.id} value={customer.name}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Xe</label>
          <select
            value={formData.car}
            onChange={(e) => {
              const selectedCar = cars.find(car => car.name === e.target.value);
              setFormData({
                ...formData, 
                car: e.target.value,
                value: selectedCar ? selectedCar.price : ''
              });
            }}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          >
            <option value="">Chọn xe</option>
            {availableCars.map(car => (
              <option key={car.id} value={car.name}>
                {car.name} - {formatPrice(car.price)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Giá Trị</label>
          <input
            type="number"
            value={formData.value}
            onChange={(e) => setFormData({...formData, value: e.target.value})}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Trạng Thái</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="Chờ Thanh Toán">Chờ Thanh Toán</option>
            <option value="Đã Thanh Toán">Đã Thanh Toán</option>
            <option value="Đã Hủy">Đã Hủy</option>
          </select>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {sale ? 'Cập Nhật' : 'Thêm'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SaleForm;
