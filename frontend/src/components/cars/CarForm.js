import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';

const CarForm = ({ car, onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    carName: car?.carName || '',
    brand: car?.brand || '',
    model: car?.model || '',
    manufactureYear: car?.manufactureYear || '',
    licensePlate: car?.licensePlate || '',
    price: car?.price || '',
    count: car?.count || '',
    status: car?.status || '',
    color: car?.color || '',
    specifications: car?.specifications || '',
    warrantyPeriod: car?.warrantyPeriod || '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(car?.imageUrl ? `http://localhost:8080${car.imageUrl}` : '');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setError('Chỉ hỗ trợ file ảnh JPEG, PNG hoặc GIF');
        return;
      }

      setImageFile(file);
      console.log('Selected file:', file, 'Type:', file.type, 'Size:', file.size);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        console.log('Base64 preview:', reader.result.substring(0, 50));
      };
      reader.onerror = () => {
        setError('Lỗi khi đọc file ảnh');
      };
      reader.readAsDataURL(file);
    } else {
      setError('Vui lòng chọn một file ảnh hợp lệ');
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    } else {
      console.warn('File input ref is not available');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!imageFile && !car?.imageUrl) {
      setError('Vui lòng chọn một file ảnh');
      return;
    }

    try {
      await onSubmit(formData, imageFile);
      setSuccess('Thêm xe thành công!');
      setFormData({
        carName: '',
        brand: '',
        model: '',
        manufactureYear: '',
        licensePlate: '',
        price: '',
        count: '',
        status: '',
        color: '',
        specifications: '',
        warrantyPeriod: '',
      });
      setImageFile(null);
      setImagePreview('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Hình Ảnh</label>
        {imagePreview ? (
          <div className="mt-2 relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg"
              onError={(e) => {
                console.error('Image load error:', e);
                setError('Không thể tải ảnh');
              }}
            />
            <button
              type="button"
              onClick={handleRemoveImage}
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
                ref={fileInputRef}
              />
            </label>
          </div>
        )}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-1">{success}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tên Xe</label>
        <input
          type="text"
          name="carName"
          value={formData.carName}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Hãng Xe</label>
        <select
          name="brand"
          value={formData.brand}
          onChange={handleInputChange}
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
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tồn Kho</label>
        <input
          type="number"
          name="count"
          value={formData.count}
          onChange={handleInputChange}
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