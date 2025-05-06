import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const CarForm = ({ car, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    carName: car?.carName || '',
    brand: car?.brand || '',
    price: car?.price || '',
    count: car?.count || '',
    imageUrl: car?.imageUrl || ''
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Hình Ảnh</label>
        {formData.imageUrl ? (
          <div className="mt-2 relative">
            <img 
              src={formData.imageUrl} 
              alt="Preview" 
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => setFormData({ ...formData, imageUrl: '' })}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="mt-2">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">Click để tải ảnh lên</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tên Xe</label>
        <input
          type="text"
          value={formData.carName}
          onChange={(e) => setFormData({ ...formData, carName: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Hãng Xe</label>
        <select
          value={formData.brand}
          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        >
          <option value="">Chọn hãng xe</option>
          <option value="Toyota">Toyota</option>
          <option value="Honda">Honda</option>
          <option value="Ford">Ford</option>
          <option value="BMW">BMW</option>
          <option value="Mercedes">Mercedes</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Giá Bán</label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tồn Kho</label>
        <input
          type="number"
          value={formData.count}
          onChange={(e) => setFormData({ ...formData, count: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
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
          {car ? 'Cập Nhật' : 'Thêm'}
        </button>
      </div>
    </form>
  );
};

export default CarForm;
