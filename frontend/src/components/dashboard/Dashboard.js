import React from 'react';
import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useData } from '../../contexts/DataContext';
import { formatPrice } from '../../utils/formatters';

const Dashboard = () => {
  const { cars, customers, appointments } = useData();

  // Calculate statistics
  const stats = {
    totalCars: cars.length,
    totalCustomers: customers.length,
    totalAppointments: appointments.length,
    availableCars: cars.reduce((sum, car) => sum + (car.count || 0), 0),
  };

  // Prepare data for charts
  const brandDistribution = Object.entries(
    cars.reduce((acc, car) => {
      acc[car.brand] = (acc[car.brand] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const appointmentStats = {
    pending: appointments.filter(a => a.status === 'Pending').length,
    confirmed: appointments.filter(a => a.status === 'Confirmed').length,
    cancelled: appointments.filter(a => a.status === 'Cancelled').length
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Tổng Xe"
          value={stats.totalCars}
          icon={<Package className="w-6 h-6 text-blue-600" />}
          change="Tổng số xe hiện có"
        />
        <StatCard
          title="Xe Còn Hàng"
          value={stats.availableCars}
          icon={<ShoppingCart className="w-6 h-6 text-green-600" />}
          change="Số xe còn trong kho"
        />
        <StatCard
          title="Khách Hàng"
          value={stats.totalCustomers}
          icon={<Users className="w-6 h-6 text-purple-600" />}
          change="Tổng số khách hàng"
        />
        <StatCard
          title="Lịch Hẹn"
          value={stats.totalAppointments}
          icon={<DollarSign className="w-6 h-6 text-yellow-600" />}
          change="Tổng số lịch hẹn"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Brand Distribution Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Phân Bố Theo Hãng Xe</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={brandDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {brandDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Appointment Status Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Trạng Thái Lịch Hẹn</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { name: 'Chờ xác nhận', value: appointmentStats.pending },
              { name: 'Đã xác nhận', value: appointmentStats.confirmed },
              { name: 'Đã hủy', value: appointmentStats.cancelled }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, change }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-gray-100 rounded-lg">
        {icon}
      </div>
    </div>
    <h3 className="text-gray-500 text-sm">{title}</h3>
    <p className="text-2xl font-semibold mb-2">{value}</p>
    <p className="text-sm text-gray-600">{change}</p>
  </div>
);

export default Dashboard;
