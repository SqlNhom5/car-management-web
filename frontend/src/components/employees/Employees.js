import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import Modal from '../shared/Modal';
import EmployeeForm from './EmployeeForm';
import DeleteConfirmation from '../shared/DeleteConfirmation';
import EmployeeTable from './EmployeeTable';

const Employees = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useData();

  const stats = {
    total: employees.length,
    admin: employees.filter(e => e.role === "Quản Trị").length,
    sales: employees.filter(e => e.role === "Bán Hàng").length,
    warehouse: employees.filter(e => e.role === "Kho").length
  };

  const handleAdd = (formData) => {
    try {
      addEmployee(formData);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleEdit = (formData) => {
    try {
      updateEmployee({ ...selectedEmployee, ...formData });
      setIsEditModalOpen(false);
      setSelectedEmployee(null);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDelete = () => {
    try {
      deleteEmployee(selectedEmployee.id);
      setIsDeleteModalOpen(false);
      setSelectedEmployee(null);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm nhân viên..."
          className="w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="w-5 h-5 mr-1" />
          Thêm Nhân Viên
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatsCard title="Tổng Nhân Viên" value={stats.total} subtext="Tất cả nhân viên trong hệ thống" />
        <StatsCard title="Quản Trị" value={stats.admin} subtext="Nhân viên quản trị hệ thống" />
        <StatsCard title="Bán Hàng" value={stats.sales} subtext="Nhân viên bán hàng" />
        <StatsCard title="Kho" value={stats.warehouse} subtext="Nhân viên kho" />
      </div>

      <EmployeeTable 
        employees={employees}
        onEdit={(employee) => {
          setSelectedEmployee(employee);
          setIsEditModalOpen(true);
        }}
        onDelete={(employee) => {
          setSelectedEmployee(employee);
          setIsDeleteModalOpen(true);
        }}
      />

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        title="Thêm Nhân Viên Mới"
      >
        <EmployeeForm 
          onSubmit={handleAdd}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)}
        title="Sửa Thông Tin Nhân Viên"
      >
        <EmployeeForm 
          employee={selectedEmployee}
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
          message={`Bạn có chắc chắn muốn xóa nhân viên ${selectedEmployee?.name}?`}
          onConfirm={handleDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

const StatsCard = ({ title, value, subtext }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-gray-500 text-sm mb-2">{title}</h3>
    <p className="text-2xl font-semibold mb-2">{value}</p>
    <p className="text-sm text-gray-500">{subtext}</p>
  </div>
);

export default Employees;
