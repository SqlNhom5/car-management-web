"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ArrowUpRight, Car, DollarSign, ShoppingCart, Users } from "lucide-react"

// Dữ liệu mẫu cho biểu đồ
const salesData = [
  { name: "T1", sales: 4000 },
  { name: "T2", sales: 3000 },
  { name: "T3", sales: 5000 },
  { name: "T4", sales: 4500 },
  { name: "T5", sales: 6000 },
  { name: "T6", sales: 5500 },
]

const inventoryData = [
  { name: "Toyota", value: 30 },
  { name: "Honda", value: 25 },
  { name: "Ford", value: 20 },
  { name: "BMW", value: 15 },
  { name: "Mercedes", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function Dashboard() {
  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold tracking-tight text-blue-950">Tổng Quan</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Doanh Thu</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.045.231.000 ₫</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500">+20,1%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tồn Kho</CardTitle>
            <Car className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500">+12,5%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đơn Hàng</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500">+8,2%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Khách Hàng Mới</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500">+15,3%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-0">
        <TabsList className="bg-white border mb-4">
          <TabsTrigger value="overview">Tổng Quan</TabsTrigger>
          <TabsTrigger value="sales">Doanh Số</TabsTrigger>
          <TabsTrigger value="inventory">Tồn Kho</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 border-none shadow-md">
              <CardHeader>
                <CardTitle>Doanh Số Theo Tháng</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => new Intl.NumberFormat("vi-VN").format(value) + " ₫"} />
                    <Legend />
                    <Bar dataKey="sales" name="Doanh số" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-3 border-none shadow-md">
              <CardHeader>
                <CardTitle>Tồn Kho Theo Hãng</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={inventoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {inventoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => new Intl.NumberFormat("vi-VN").format(value) + " xe"} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Xu Hướng Doanh Số</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => new Intl.NumberFormat("vi-VN").format(value) + " ₫"} />
                  <Legend />
                  <Line type="monotone" dataKey="sales" name="Doanh số" stroke="#3b82f6" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Phân Bố Tồn Kho</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={inventoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {inventoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => new Intl.NumberFormat("vi-VN").format(value) + " xe"} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
