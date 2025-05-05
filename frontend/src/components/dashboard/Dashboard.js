import React from 'react';
import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useData } from '../../contexts/DataContext';
import { formatPrice } from '../../utils/formatters';

const Dashboard = () => {
  const { sales, cars, customers, employees } = useData();

  // Tính toán thống kê
  const stats = {
    totalRevenue: sales.reduce((sum, sale) => {
      const value = typeof sale.value === 'string' 
        ? Number(sale.value.replace(/[^0-9.-]+/g,""))
        : sale.value;
      return sum + value;
    }, 0),
    inventory: cars.reduce((sum, car) => sum + car.quantity, 0),
    totalOrders: sales.length,
    newCustomers: customers.filter(customer => 
      new Date(customer.joinDate).getMonth() === new Date().getMonth()
    ).length
  };

  // Dữ liệu cho biểu đồ doanh số
  const salesData = Array.from({ length: 6 }, (_, i) => {
    const month = new Date();
    month.setMonth(month.getMonth() - (5 - i));
    const monthSales = sales.filter(sale => 
      new Date(sale.date).getMonth() === month.getMonth()
    );
    return {
      month: `T${month.getMonth() + 1}`,
      sales: monthSales.reduce((sum, sale) => {
        const value = typeof sale.value === 'string' 
          ? Number(sale.value.replace(/[^0-9.-]+/g,""))
          : sale.value;
        return sum + value;
      }, 0)
    };
  });

  // Dữ liệu cho biểu đồ tồn kho
  const inventoryData = Object.entries(
    cars.reduce((acc, car) => {
      acc[car.brand] = (acc[car.brand] || 0) + car.quantity;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#8884D8'];

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Tổng Doanh Thu"
          value={formatPrice(stats.totalRevenue)}
          change="+20.1% so với tháng trước"
          icon={<DollarSign className="w-6 h-6" />}
        />
        <StatCard
          title="Tồn Kho"
          value={stats.inventory}
          change="+12% so với tháng trước"
          icon={<Package className="w-6 h-6" />}
        />
        <StatCard
          title="Đơn Hàng"
          value={stats.totalOrders}
          change="+8.2% so với tháng trước"
          icon={<ShoppingCart className="w-6 h-6" />}
        />
        <StatCard
          title="Khách Hàng Mới"
          value={stats.newCustomers}
          change="+12.5% so với tháng trước"
          icon={<Users className="w-6 h-6" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Doanh Số Theo Tháng</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => formatPrice(value)}
              />
              <Bar dataKey="sales" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Tồn Kho Theo Hãng</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={inventoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {inventoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-blue-100 rounded-lg">
        {icon}
      </div>
    </div>
    <h3 className="text-gray-500 text-sm">{title}</h3>
    <div className="flex items-center space-x-2">
      <p className="text-2xl font-semibold">{value}</p>
    </div>
    <p className="text-sm text-green-500 mt-2">{change}</p>
  </div>
);

export default Dashboard;
