import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Mail, Phone } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { formatDate } from '../../utils/formatters';
import Pagination from '../cars/Pagination';

const AppointmentManagement = () => {
  const {
    appointments,
    updateAppointmentStatus,
    appointmentsCurrentPage,
    setAppointmentsCurrentPage,
    appointmentsTotalPages,
    appointmentsLoading,
    appointmentsError
  } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tất cả');

  useEffect(() => {
    console.log('Current appointments:', appointments);
  }, [appointments]);

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await updateAppointmentStatus(appointmentId, newStatus);
    } catch (error) {
      console.error('Failed to update appointment status:', error);
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      (appointment.customerName || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'Tất cả' || appointment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (appointmentsLoading) {
    return <div className="text-center py-8 text-gray-500">Đang tải dữ liệu...</div>;
  }

  if (appointmentsError) {
    return <div className="text-center py-8 text-red-500">Lỗi: {appointmentsError}</div>;
  }

  if (appointments.length === 0) {
    return <div className="text-center py-8 text-gray-500">Không có lịch hẹn nào</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
          className="w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Tất cả">Tất cả trạng thái</option>
          <option value="Pending">Chờ xác nhận</option>
          <option value="Confirmed">Đã xác nhận</option>
          <option value="Cancelled">Đã hủy</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thông tin khách hàng</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Liên hệ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian hẹn</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ghi chú</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.appointmentId}>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{appointment.customerName}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-y-1 flex-col">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      {appointment.phone}
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      {appointment.mail}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(appointment.createdAt)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {appointment.appointmentDate}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500 max-w-xs overflow-hidden">
                    {appointment.notes || 'Không có ghi chú'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                    appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    appointment.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {appointment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <select
                    className="border border-gray-300 rounded px-2 py-1"
                    value={appointment.status}
                    onChange={(e) => handleStatusChange(appointment.appointmentId, e.target.value)}
                  >
                    <option value="Pending">Chờ xác nhận</option>
                    <option value="Confirmed">Xác nhận</option>
                    <option value="Cancelled">Hủy</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAppointments.length > 0 && (
        <div className="mt-6">
          <Pagination
            currentPage={appointmentsCurrentPage}
            totalPages={appointmentsTotalPages}
            onPageChange={setAppointmentsCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default AppointmentManagement;
