"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, FileText, MoreHorizontal, Plus, Printer, Receipt, Search } from "lucide-react"

// Dữ liệu mẫu
const initialOrders = [
  {
    id: "DH-001",
    date: "15/03/2023",
    customer: "Nguyễn Văn An",
    vehicle: "Toyota Camry",
    amount: 1250000000,
    discount: 50000000,
    status: "Đã Thanh Toán",
  },
  {
    id: "DH-002",
    date: "22/04/2023",
    customer: "Trần Thị Bình",
    vehicle: "Honda Accord",
    amount: 1350000000,
    discount: 25000000,
    status: "Chờ Thanh Toán",
  },
  {
    id: "DH-003",
    date: "10/05/2023",
    customer: "Lê Văn Cường",
    vehicle: "Ford Mustang",
    amount: 1750000000,
    discount: 0,
    status: "Đã Thanh Toán",
  },
  {
    id: "DH-004",
    date: "05/06/2023",
    customer: "Phạm Thị Dung",
    vehicle: "BMW 3 Series",
    amount: 2100000000,
    discount: 100000000,
    status: "Đã Hủy",
  },
  {
    id: "DH-005",
    date: "18/07/2023",
    customer: "Hoàng Văn Em",
    vehicle: "Mercedes-Benz C-Class",
    amount: 2250000000,
    discount: 75000000,
    status: "Chờ Thanh Toán",
  },
]

export default function SalesPage() {
  const [orders, setOrders] = useState(initialOrders)
  const [filteredOrders, setFilteredOrders] = useState(initialOrders)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [currentOrder, setCurrentOrder] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [newOrder, setNewOrder] = useState({
    customer: "",
    vehicle: "",
    quantity: 1,
    discount: 0,
    status: "Chờ Thanh Toán",
    amount: 0,
  })

  const tableContainerRef = useRef(null)

  // Áp dụng bộ lọc khi có thay đổi
  useEffect(() => {
    let result = orders

    // Lọc theo từ khóa tìm kiếm
    if (searchTerm) {
      result = result.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.vehicle.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Lọc theo trạng thái
    if (statusFilter !== "all") {
      let status = ""
      switch (statusFilter) {
        case "paid":
          status = "Đã Thanh Toán"
          break
        case "pending":
          status = "Chờ Thanh Toán"
          break
        case "cancelled":
          status = "Đã Hủy"
          break
      }
      result = result.filter((order) => order.status === status)
    }

    setFilteredOrders(result)
  }, [orders, searchTerm, statusFilter])

  const handleAddOrder = () => {
    const today = new Date()
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getFullYear()}`

    const orderToAdd = {
      ...newOrder,
      id: `DH-${(orders.length + 1).toString().padStart(3, "0")}`,
      date: formattedDate,
    }

    setOrders([...orders, orderToAdd])
    setNewOrder({
      customer: "",
      vehicle: "",
      quantity: 1,
      discount: 0,
      status: "Chờ Thanh Toán",
      amount: 0,
    })
    setIsAddDialogOpen(false)
  }

  const openViewDialog = (order) => {
    setCurrentOrder({ ...order })
    setIsViewDialogOpen(true)
  }

  // Hàm tính tổng doanh số
  const calculateTotalSales = () => {
    return orders.reduce((total, order) => total + order.amount, 0)
  }

  // Hàm tính số đơn hàng đang chờ thanh toán
  const calculatePendingOrders = () => {
    return orders.filter((order) => order.status === "Chờ Thanh Toán").length
  }

  // Hàm tính tổng tiền đang chờ thanh toán
  const calculatePendingAmount = () => {
    return orders.filter((order) => order.status === "Chờ Thanh Toán").reduce((total, order) => total + order.amount, 0)
  }

  // Hàm tính giá trị trung bình đơn hàng
  const calculateAverageOrderValue = () => {
    if (orders.length === 0) return 0
    return calculateTotalSales() / orders.length
  }

  // Hàm xử lý khi chọn xe
  const handleVehicleSelect = (value) => {
    let amount = 0
    switch (value) {
      case "Toyota Camry":
        amount = 1250000000
        break
      case "Honda Accord":
        amount = 1350000000
        break
      case "Ford Mustang":
        amount = 1750000000
        break
      case "BMW 3 Series":
        amount = 2100000000
        break
      case "Mercedes-Benz C-Class":
        amount = 2250000000
        break
      default:
        amount = 0
    }
    setNewOrder({ ...newOrder, vehicle: value, amount: amount })
  }

  return (
    <div className="flex-1 space-y-4 p-3 md:p-6 pt-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-blue-950">Quản Lý Bán Hàng</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Tạo Đơn Hàng
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tạo Đơn Hàng Mới</DialogTitle>
              <DialogDescription>Nhập thông tin chi tiết để tạo đơn hàng mới.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="customer">Khách Hàng</Label>
                <Select
                  value={newOrder.customer}
                  onValueChange={(value) => setNewOrder({ ...newOrder, customer: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn khách hàng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nguyễn Văn An">Nguyễn Văn An</SelectItem>
                    <SelectItem value="Trần Thị Bình">Trần Thị Bình</SelectItem>
                    <SelectItem value="Lê Văn Cường">Lê Văn Cường</SelectItem>
                    <SelectItem value="Phạm Thị Dung">Phạm Thị Dung</SelectItem>
                    <SelectItem value="Hoàng Văn Em">Hoàng Văn Em</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicle">Xe</Label>
                <Select value={newOrder.vehicle} onValueChange={handleVehicleSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn xe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Toyota Camry">Toyota Camry - 1.250.000.000 ₫</SelectItem>
                    <SelectItem value="Honda Accord">Honda Accord - 1.350.000.000 ₫</SelectItem>
                    <SelectItem value="Ford Mustang">Ford Mustang - 1.750.000.000 ₫</SelectItem>
                    <SelectItem value="BMW 3 Series">BMW 3 Series - 2.100.000.000 ₫</SelectItem>
                    <SelectItem value="Mercedes-Benz C-Class">Mercedes-Benz C-Class - 2.250.000.000 ₫</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Số Lượng</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newOrder.quantity}
                    onChange={(e) => setNewOrder({ ...newOrder, quantity: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">Giảm Giá</Label>
                  <Input
                    id="discount"
                    type="number"
                    placeholder="0"
                    value={newOrder.discount}
                    onChange={(e) => setNewOrder({ ...newOrder, discount: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment">Trạng Thái Thanh Toán</Label>
                <Select value={newOrder.status} onValueChange={(value) => setNewOrder({ ...newOrder, status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái thanh toán" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Đã Thanh Toán">Đã Thanh Toán</SelectItem>
                    <SelectItem value="Chờ Thanh Toán">Chờ Thanh Toán</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="w-full sm:w-auto">
                Hủy
              </Button>
              <Button type="button" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto" onClick={handleAddOrder}>
                Tạo Đơn Hàng
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Doanh Số</CardTitle>
            <Receipt className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold truncate">
              {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(calculateTotalSales())}
            </div>
            <p className="text-xs text-muted-foreground">+12% so với tháng trước</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đơn Hàng</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{orders.length}</div>
            <p className="text-xs text-muted-foreground">+2 so với tháng trước</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chờ Thanh Toán</CardTitle>
            <Receipt className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold truncate">
              {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(calculatePendingAmount())}
            </div>
            <p className="text-xs text-muted-foreground">{calculatePendingOrders()} đơn hàng đang chờ</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Giá Trị Trung Bình</CardTitle>
            <Receipt className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold truncate">
              {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                calculateAverageOrderValue(),
              )}
            </div>
            <p className="text-xs text-muted-foreground">+5% so với tháng trước</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm đơn hàng..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Tất Cả Trạng Thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất Cả Trạng Thái</SelectItem>
              <SelectItem value="paid">Đã Thanh Toán</SelectItem>
              <SelectItem value="pending">Chờ Thanh Toán</SelectItem>
              <SelectItem value="cancelled">Đã Hủy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border overflow-hidden" ref={tableContainerRef}>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-100">
                <TableRow>
                  <TableHead>Mã Đơn</TableHead>
                  <TableHead>Ngày</TableHead>
                  <TableHead>Khách Hàng</TableHead>
                  <TableHead>Xe</TableHead>
                  <TableHead>Giá Trị</TableHead>
                  <TableHead>Trạng Thái</TableHead>
                  <TableHead className="text-right w-[80px]">Thao Tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-slate-50">
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.vehicle}</TableCell>
                      <TableCell>
                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === "Đã Thanh Toán"
                              ? "default"
                              : order.status === "Chờ Thanh Toán"
                                ? "outline"
                                : "destructive"
                          }
                          className={
                            order.status === "Đã Thanh Toán"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : order.status === "Chờ Thanh Toán"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                : ""
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right p-0 pr-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Mở menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => openViewDialog(order)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Xem Chi Tiết
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Printer className="mr-2 h-4 w-4" />
                              In Hóa Đơn
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      Không tìm thấy đơn hàng nào phù hợp với điều kiện tìm kiếm
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Dialog xem chi tiết đơn hàng */}
      {currentOrder && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Chi Tiết Đơn Hàng</DialogTitle>
              <DialogDescription>Thông tin chi tiết về đơn hàng {currentOrder.id}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Mã Đơn Hàng:</h3>
                  <p>{currentOrder.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Ngày Tạo:</h3>
                  <p>{currentOrder.date}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Khách Hàng:</h3>
                  <p>{currentOrder.customer}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Trạng Thái:</h3>
                  <Badge
                    variant={
                      currentOrder.status === "Đã Thanh Toán"
                        ? "default"
                        : currentOrder.status === "Chờ Thanh Toán"
                          ? "outline"
                          : "destructive"
                    }
                    className={
                      currentOrder.status === "Đã Thanh Toán"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : currentOrder.status === "Chờ Thanh Toán"
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                          : ""
                    }
                  >
                    {currentOrder.status}
                  </Badge>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-2">Thông Tin Sản Phẩm:</h3>
                <div className="bg-slate-50 p-3 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{currentOrder.vehicle}</span>
                    <span>x1</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(currentOrder.amount)}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Tổng tiền:</span>
                  <span>
                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(currentOrder.amount)}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Giảm giá:</span>
                  <span>
                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                      currentOrder.discount || 0,
                    )}
                  </span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Thành tiền:</span>
                  <span>
                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                      currentOrder.amount - (currentOrder.discount || 0),
                    )}
                  </span>
                </div>
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button onClick={() => setIsViewDialogOpen(false)} className="w-full sm:w-auto">
                Đóng
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                <Printer className="mr-2 h-4 w-4" />
                In Hóa Đơn
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
