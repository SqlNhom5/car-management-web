import React, { useState } from 'react';
import { Plus, DollarSign, ShoppingCart, CheckCircle, Clock } from 'lucide-react';
import Modal from '../shared/Modal';
import SaleForm from './SaleForm';
import DeleteConfirmation from '../shared/DeleteConfirmation';
import SalesTable from './SalesTable';
import { useData } from '../../contexts/DataContext';
import { formatPrice } from '../../utils/formatters';

const Sales = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Tất Cả');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const { sales, addSale, updateSale, deleteSale } = useData();

  const stats = {
    totalRevenue: sales.reduce((sum, sale) => {
      const value = typeof sale.value === 'string' 
        ? Number(sale.value.replace(/[^0-9.-]+/g,""))
        : sale.value;
      return sum + value;
    }, 0),
    totalOrders: sales.length,
    completedOrders: sales.filter(sale => sale.status === 'Đã Thanh Toán').length,
    pendingOrders: sales.filter(sale => sale.status === 'Chờ Thanh Toán').length
  };

  const filteredSales = sales.filter(sale => {
    const matchesSearch = 
      sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.car.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      selectedStatus === 'Tất Cả' || 
      sale.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleAdd = (formData) => {
    addSale(formData);
    setIsAddModalOpen(false);
  };

  const handleEdit = (formData) => {
    updateSale({
      ...formData,
      value: formatPrice(Number(formData.value))
    });
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    if (selectedSale) {
      deleteSale(selectedSale.id);
      setIsDeleteModalOpen(false);
      setSelectedSale(null);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm đơn hàng..."
          className="w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="w-5 h-5 mr-1" />
          Tạo Đơn Hàng
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatsCard
          icon={<DollarSign className="w-6 h-6 text-green-600" />}
          title="Tổng Doanh Thu"
          value={`${stats.totalRevenue.toLocaleString('vi-VN')}đ`}
          trend="+20.1% so với tháng trước"
        />
        <StatsCard
          icon={<ShoppingCart className="w-6 h-6 text-blue-600" />}
          title="Tổng Đơn Hàng"
          value={stats.totalOrders}
          trend="+12 đơn hàng mới"
        />
        <StatsCard
          icon={<CheckCircle className="w-6 h-6 text-green-600" />}
          title="Đã Thanh Toán"
          value={stats.completedOrders}
          trend={`${((stats.completedOrders/stats.totalOrders)*100).toFixed(1)}% tổng đơn hàng`}
        />
        <StatsCard
          icon={<Clock className="w-6 h-6 text-yellow-600" />}
          title="Chờ Thanh Toán"
          value={stats.pendingOrders}
          trend={`${((stats.pendingOrders/stats.totalOrders)*100).toFixed(1)}% tổng đơn hàng`}
        />
      </div>

      <div className="mb-6 flex gap-4">
        <select
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="Tất Cả">Tất Cả Trạng Thái</option>
          <option value="Đã Thanh Toán">Đã Thanh Toán</option>
          <option value="Chờ Thanh Toán">Chờ Thanh Toán</option>
          <option value="Đã Hủy">Đã Hủy</option>
        </select>
      </div>

      <SalesTable 
        sales={filteredSales} 
        onEdit={(sale) => {
          setSelectedSale(sale);
          setIsEditModalOpen(true);
        }}
        onDelete={(sale) => {
          setSelectedSale(sale);
          setIsDeleteModalOpen(true);
        }}
      />

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        title="Tạo Đơn Hàng Mới"
      >
        <SaleForm 
          onSubmit={handleAdd}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)}
        title="Sửa Đơn Hàng"
      >
        <SaleForm 
          sale={selectedSale}
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
          message={`Bạn có chắc chắn muốn xóa đơn hàng ${selectedSale?.id}?`}
          onConfirm={handleDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

const StatsCard = ({ icon, title, value, trend }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-gray-100 rounded-lg">
        {icon}
      </div>
    </div>
    <h3 className="text-gray-500 text-sm">{title}</h3>
    <div className="flex items-center space-x-2">
      <p className="text-2xl font-semibold">{value}</p>
    </div>
    <p className="text-sm text-green-500 mt-2">{trend}</p>
  </div>
);

const SummaryCard = ({ title, value, trend }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-gray-500 text-sm mb-2">{title}</h3>
    <p className="text-2xl font-semibold mb-2">{value}</p>
    <p className="text-sm text-green-500">{trend}</p>
  </div>
);

export default Sales;
