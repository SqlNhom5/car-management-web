import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Modal from '../shared/Modal';
import CustomerForm from './CustomerForm';
import DeleteConfirmation from '../shared/DeleteConfirmation';
import CustomerTable from './CustomerTable';
import { useData } from '../../contexts/DataContext';
import { formatPhoneNumber } from '../../utils/formatters';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useData();

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleAdd = (formData) => {
    addCustomer(formData);
    setIsAddModalOpen(false);
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (formData) => {
    updateCustomer({
      ...formData,
      phone: formatPhoneNumber(formData.phone)
    });
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    if (selectedCustomer) {
      deleteCustomer(selectedCustomer.id);
      setIsDeleteModalOpen(false);
      setSelectedCustomer(null);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm khách hàng..."
          className="w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="w-5 h-5 mr-1" />
          Thêm Khách Hàng
        </button>
      </div>

      <CustomerTable 
        customers={filteredCustomers}
        onEdit={handleEdit}
        onDelete={(customer) => {
          setSelectedCustomer(customer);
          setIsDeleteModalOpen(true);
        }}
      />

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        title="Thêm Khách Hàng Mới"
      >
        <CustomerForm 
          onSubmit={handleAdd}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)}
        title="Sửa Thông Tin Khách Hàng"
      >
        <CustomerForm 
          customer={selectedCustomer}
          onSubmit={handleEditSubmit}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>

      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        title="Xác Nhận Xóa"
      >
        <DeleteConfirmation 
          message={`Bạn có chắc chắn muốn xóa khách hàng ${selectedCustomer?.name}?`}
          onConfirm={handleDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Customers;
