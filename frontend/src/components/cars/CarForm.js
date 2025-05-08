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
    note: car?.note || '',
    warrantyPeriod: car?.warrantyPeriod || '',
    numberOfSeats: car?.numberOfSeats || '',
    fuel: car?.fuel || '',
    gear: car?.gear || ''
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
    console.log('handleImageChange triggered, file:', file);
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setError('Chỉ hỗ trợ file ảnh JPEG, PNG hoặc GIF');
        console.error('Invalid file type:', file.type);
        return;
      }

      setImageFile(file);
      console.log('Selected file:', file.name, 'Type:', file.type, 'Size:', file.size);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        console.log('Image preview set, base64:', reader.result.substring(0, 50));
      };
      reader.onerror = () => {
        setError('Lỗi khi đọc file ảnh');
        console.error('FileReader error');
      };
      reader.readAsDataURL(file);
    } else {
      setError('Vui lòng chọn một file ảnh hợp lệ');
      console.error('No file selected');
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      console.log('Image removed, file input reset');
    } else {
      console.warn('File input ref is not available');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    console.log('handleSubmit triggered, formData:', formData, 'imageFile:', imageFile);

    if (!imageFile && !car?.imageUrl) {
      setError('Vui lòng chọn một file ảnh');
      console.error('No image provided for new car');
      return;
    }

    try {
      await onSubmit(formData, imageFile);
      setSuccess(car ? 'Cập nhật xe thành công!' : 'Thêm xe thành công!');
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
      console.error('Submit error:', error.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Phần ảnh */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Hình Ảnh</label>
          {imagePreview ? (
            <div className="mt-2 relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full max-w-xs h-32 object-cover rounded-lg"
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
              <label className="flex flex-col items-center justify-center w-full max-w-xs h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
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

        {/* Phần thông tin xe - Sử dụng grid với 3 cột */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tên Xe</label>
            <input
              type="text"
              name="carName"
              value={formData.carName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Hãng Xe</label>
            <select
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
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
            <label className="block text-sm font-medium text-gray-700">Model</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700">Số chỗ</label>
            <input
              type="number"
              name="numberOfSeats"
              value={formData.numberOfSeats}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div> 

          <div>
            <label className="block text-sm font-medium text-gray-700">Giá Bán</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
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
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Nhiên liệu</label>
            <input
              type="text"
              name="fuel"
              value={formData.fuel}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Hộp số</label>
            <input
              type="text"
              name="gear"
              value={formData.gear}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          
        </div>

        {/* Thông số kỹ thuật - Đặt riêng với chiều cao ngắn hơn */}
        <div>
            <label className="block text-sm font-medium text-gray-700">Mô tả</label>
            <input
              type="text"
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

        {/* Nút hành động */}
        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {car ? 'Cập Nhật' : 'Thêm'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarForm;