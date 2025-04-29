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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Calendar, Edit, Eye, MoreHorizontal, Plus, Search, Trash, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dữ liệu mẫu
const initialCustomers = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
    phone: "0912 345 678",
    email: "nguyenvanan@example.com",
    purchases: 2,
    appointments: 1,
    notes: "Quan tâm đến dòng xe SUV, có xe đổi",
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    address: "456 Đường Nguyễn Huệ, Quận 3, TP.HCM",
    phone: "0987 654 321",
    email: "tranthibinh@example.com",
    purchases: 1,
    appointments: 0,
    notes: "Tìm xe gia đình, ngân sách khoảng 1,5 tỷ",
  },
  {
    id: 3,
    name: "Lê Văn Cường",
    address: "789 Đường Cách Mạng Tháng 8, Quận 10, TP.HCM",
    phone: "0909 876 543",
    email: "levancuong@example.com",
    purchases: 0,
    appointments: 2,
    notes: "Quan tâm đến xe sang, ưa thích xe Đức",
  },
  {
    id: 4,
    name: "Phạm Thị Dung",
    address: "321 Đường Võ Văn Tần, Quận 3, TP.HCM",
    phone: "0918 765 432",
    email: "phamthidung@example.com",
    purchases: 3,
    appointments: 1,
    notes: "Khách hàng thân thiết, thích xe Nhật",
  },
  {
    id: 5,
    name: "Hoàng Văn Em",
    address: "654 Đường Điện Biên Phủ, Quận Bình Thạnh, TP.HCM",
    phone: "0976 543 210",
    email: "hoangvanem@example.com",
    purchases: 0,
    appointments: 1,
    notes: "Khách hàng mới, tìm xe giá phải chăng",
  },
]

export default function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers)
  const [filteredCustomers, setFilteredCustomers] = useState(initialCustomers)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [currentCustomer, setCurrentCustomer] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    purchases: 0,
    appointments: 0,
    notes: "",
  })

  const tableContainerRef = useRef(null)

  // Áp dụng bộ lọc khi có thay đổi
  useEffect(() => {
    let result = customers

    // Lọc theo từ khóa tìm kiếm
    if (searchTerm) {
      result = result.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.phone.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredCustomers(result)
  }, [customers, searchTerm])

  const handleAddCustomer = () => {
    const customerToAdd = {
      ...newCustomer,
      id: customers.length > 0 ? Math.max(...customers.map((c) => c.id)) + 1 : 1,
    }
    setCustomers([...customers, customerToAdd])
    setNewCustomer({
      name: "",
      address: "",
      phone: "",
      email: "",
      purchases: 0,
      appointments: 0,
      notes: "",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditCustomer = () => {
    const updatedCustomers = customers.map((customer) =>
      customer.id === currentCustomer.id ? currentCustomer : customer,
    )
    setCustomers(updatedCustomers)
    setIsEditDialogOpen(false)
  }

  const handleDeleteCustomer = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id))
  }

  const openEditDialog = (customer) => {
    setCurrentCustomer({ ...customer })
    setIsEditDialogOpen(true)
  }

  const openViewDialog = (customer) => {
    setCurrentCustomer({ ...customer })
    setIsViewDialogOpen(true)
  }

  return (
    <div className="flex-1 space-y-4 p-3 md:p-6 pt-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-blue-950">Quản Lý Khách Hàng</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Thêm Khách Hàng
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Thêm Khách Hàng Mới</DialogTitle>
              <DialogDescription>Nhập thông tin chi tiết của khách hàng mới.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Họ Tên</Label>
                  <Input
                    id="name"
                    placeholder="Nguyễn Văn An"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nguyenvanan@example.com"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Số Điện Thoại</Label>
                  <Input
                    id="phone"
                    placeholder="0912 345 678"
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Địa Chỉ</Label>
                  <Input
                    id="address"
                    placeholder="123 Đường Lê Lợi, Quận 1, TP.HCM"
                    value={newCustomer.address}
                    onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Ghi Chú</Label>
                <Textarea
                  id="notes"
                  placeholder="Nhập ghi chú về khách hàng..."
                  value={newCustomer.notes}
                  onChange={(e) => setNewCustomer({ ...newCustomer, notes: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="w-full sm:w-auto">
                Hủy
              </Button>
              <Button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                onClick={handleAddCustomer}
              >
                Lưu Khách Hàng
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm khách hàng..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-lg border overflow-hidden" ref={tableContainerRef}>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-100">
                <TableRow>
                  <TableHead>Họ Tên</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Số Điện Thoại</TableHead>
                  <TableHead>Đã Mua</TableHead>
                  <TableHead>Lịch Hẹn</TableHead>
                  <TableHead className="text-right w-[80px]">Thao Tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id} className="hover:bg-slate-50">
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.purchases}</TableCell>
                      <TableCell>{customer.appointments}</TableCell>
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
                            <DropdownMenuItem onClick={() => openViewDialog(customer)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Xem Chi Tiết
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              Đặt Lịch Hẹn
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditDialog(customer)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Chỉnh Sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeleteCustomer(customer.id)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      Không tìm thấy khách hàng nào phù hợp với điều kiện tìm kiếm
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Dialog xem chi tiết khách hàng */}
      {currentCustomer && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Thông Tin Khách Hàng</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="info">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">Thông Tin</TabsTrigger>
                <TabsTrigger value="purchases">Lịch Sử Mua Hàng</TabsTrigger>
                <TabsTrigger value="appointments">Lịch Hẹn</TabsTrigger>
              </TabsList>
              <TabsContent value="info" className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{currentCustomer.name}</h3>
                    <p className="text-sm text-muted-foreground">Khách hàng từ tháng 01/2023</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-none shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Thông Tin Liên Hệ</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-3">
                          <span className="text-sm font-medium">Email:</span>
                          <span className="col-span-2 text-sm">{currentCustomer.email}</span>
                        </div>
                        <div className="grid grid-cols-3">
                          <span className="text-sm font-medium">Điện thoại:</span>
                          <span className="col-span-2 text-sm">{currentCustomer.phone}</span>
                        </div>
                        <div className="grid grid-cols-3">
                          <span className="text-sm font-medium">Địa chỉ:</span>
                          <span className="col-span-2 text-sm">{currentCustomer.address}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-none shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Ghi Chú</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{currentCustomer.notes}</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="purchases" className="pt-4">
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle>Lịch Sử Mua Hàng</CardTitle>
                    <CardDescription>Xem tất cả các giao dịch của khách hàng này</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Ngày</TableHead>
                          <TableHead>Xe</TableHead>
                          <TableHead>Giá</TableHead>
                          <TableHead>Trạng Thái</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>15/01/2023</TableCell>
                          <TableCell>Toyota Camry</TableCell>
                          <TableCell>1.250.000.000 ₫</TableCell>
                          <TableCell>Hoàn Thành</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>22/06/2023</TableCell>
                          <TableCell>Honda CR-V</TableCell>
                          <TableCell>1.600.000.000 ₫</TableCell>
                          <TableCell>Hoàn Thành</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="appointments" className="pt-4">
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle>Lịch Hẹn</CardTitle>
                    <CardDescription>Xem và quản lý lịch hẹn của khách hàng</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Ngày</TableHead>
                          <TableHead>Giờ</TableHead>
                          <TableHead>Mục Đích</TableHead>
                          <TableHead>Trạng Thái</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>10/03/2023</TableCell>
                          <TableCell>14:00</TableCell>
                          <TableCell>Lái thử - Toyota RAV4</TableCell>
                          <TableCell>Đã Hoàn Thành</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <DialogFooter className="mt-4">
              <Button onClick={() => setIsViewDialogOpen(false)}>Đóng</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Dialog chỉnh sửa khách hàng */}
      {currentCustomer && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Chỉnh Sửa Thông Tin Khách Hàng</DialogTitle>
              <DialogDescription>Cập nhật thông tin chi tiết của khách hàng.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Họ Tên</Label>
                  <Input
                    id="edit-name"
                    value={currentCustomer.name}
                    onChange={(e) => setCurrentCustomer({ ...currentCustomer, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={currentCustomer.email}
                    onChange={(e) => setCurrentCustomer({ ...currentCustomer, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Số Điện Thoại</Label>
                  <Input
                    id="edit-phone"
                    value={currentCustomer.phone}
                    onChange={(e) => setCurrentCustomer({ ...currentCustomer, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-address">Địa Chỉ</Label>
                  <Input
                    id="edit-address"
                    value={currentCustomer.address}
                    onChange={(e) => setCurrentCustomer({ ...currentCustomer, address: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-notes">Ghi Chú</Label>
                <Textarea
                  id="edit-notes"
                  value={currentCustomer.notes}
                  onChange={(e) => setCurrentCustomer({ ...currentCustomer, notes: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="w-full sm:w-auto">
                Hủy
              </Button>
              <Button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                onClick={handleEditCustomer}
              >
                Lưu Thay Đổi
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
