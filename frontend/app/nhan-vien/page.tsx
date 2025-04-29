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
import { Edit, Key, MoreHorizontal, Search, Trash, User, Users, UserPlus, ShieldCheck, Package } from "lucide-react"

// Dữ liệu mẫu
const initialEmployees = [
  {
    id: 1,
    name: "Đặng Văn Dũng",
    role: "Quản Trị",
    email: "dangvandung@example.com",
    phone: "0912 111 222",
    status: "Đang Hoạt Động",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "01/01/2022",
  },
  {
    id: 2,
    name: "Nguyễn Thị Hương",
    role: "Bán Hàng",
    email: "nguyenthihuong@example.com",
    phone: "0933 333 444",
    status: "Đang Hoạt Động",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "15/03/2022",
  },
  {
    id: 3,
    name: "Trần Văn Thành",
    role: "Bán Hàng",
    email: "tranvanthanh@example.com",
    phone: "0955 555 666",
    status: "Đang Hoạt Động",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "10/05/2022",
  },
  {
    id: 4,
    name: "Lê Thị Ánh",
    role: "Kho",
    email: "lethianh@example.com",
    phone: "0977 777 888",
    status: "Không Hoạt Động",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "22/07/2022",
  },
  {
    id: 5,
    name: "Phạm Văn Minh",
    role: "Kho",
    email: "phamvanminh@example.com",
    phone: "0999 999 000",
    status: "Đang Hoạt Động",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "05/09/2022",
  },
]

export default function EmployeesPage() {
  const [employees, setEmployees] = useState(initialEmployees)
  const [filteredEmployees, setFilteredEmployees] = useState(initialEmployees)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false)
  const [currentEmployee, setCurrentEmployee] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    status: "Đang Hoạt Động",
    password: "",
    confirmPassword: "",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: new Date().toLocaleDateString("vi-VN"),
  })

  const tableContainerRef = useRef(null)

  // Áp dụng bộ lọc khi có thay đổi
  useEffect(() => {
    let result = employees

    // Lọc theo từ khóa tìm kiếm
    if (searchTerm) {
      result = result.filter(
        (employee) =>
          employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.phone.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Lọc theo vai trò
    if (roleFilter !== "all") {
      let role = ""
      switch (roleFilter) {
        case "admin":
          role = "Quản Trị"
          break
        case "sales":
          role = "Bán Hàng"
          break
        case "inventory":
          role = "Kho"
          break
      }
      result = result.filter((employee) => employee.role === role)
    }

    // Lọc theo trạng thái
    if (statusFilter !== "all") {
      const status = statusFilter === "active" ? "Đang Hoạt Động" : "Không Hoạt Động"
      result = result.filter((employee) => employee.status === status)
    }

    setFilteredEmployees(result)
  }, [employees, searchTerm, roleFilter, statusFilter])

  const handleAddEmployee = () => {
    if (newEmployee.password !== newEmployee.confirmPassword) {
      alert("Mật khẩu không khớp!")
      return
    }

    const employeeToAdd = {
      ...newEmployee,
      id: employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1,
    }

    // Loại bỏ trường mật khẩu trước khi lưu
    const { password, confirmPassword, ...employeeData } = employeeToAdd

    setEmployees([...employees, employeeData])
    setNewEmployee({
      name: "",
      role: "",
      email: "",
      phone: "",
      status: "Đang Hoạt Động",
      password: "",
      confirmPassword: "",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: new Date().toLocaleDateString("vi-VN"),
    })
    setIsAddDialogOpen(false)
  }

  const handleEditEmployee = () => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === currentEmployee.id ? currentEmployee : employee,
    )
    setEmployees(updatedEmployees)
    setIsEditDialogOpen(false)
  }

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id))
  }

  const openEditDialog = (employee) => {
    setCurrentEmployee({ ...employee })
    setIsEditDialogOpen(true)
  }

  const openResetPasswordDialog = (employee) => {
    setCurrentEmployee({ ...employee, newPassword: "", confirmNewPassword: "" })
    setIsResetPasswordDialogOpen(true)
  }

  const handleResetPassword = () => {
    if (currentEmployee.newPassword !== currentEmployee.confirmNewPassword) {
      alert("Mật khẩu không khớp!")
      return
    }

    // Trong thực tế, bạn sẽ gửi yêu cầu đặt lại mật khẩu đến API
    alert(`Đã đặt lại mật khẩu cho ${currentEmployee.name}`)
    setIsResetPasswordDialogOpen(false)
  }

  // Hàm lấy biểu tượng cho vai trò
  const getRoleIcon = (role) => {
    switch (role) {
      case "Quản Trị":
        return <ShieldCheck className="h-4 w-4 text-blue-600" />
      case "Bán Hàng":
        return <Users className="h-4 w-4 text-green-600" />
      case "Kho":
        return <Package className="h-4 w-4 text-amber-600" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  // Hàm lấy màu cho trạng thái
  const getStatusColor = (status) => {
    return status === "Đang Hoạt Động"
      ? "bg-green-100 text-green-800 hover:bg-green-100"
      : "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }

  // Tính số lượng nhân viên theo vai trò
  const countByRole = (role) => {
    return employees.filter((emp) => emp.role === role).length
  }

  // Tính số lượng nhân viên theo trạng thái
  const countByStatus = (status) => {
    return employees.filter((emp) => emp.status === status).length
  }

  return (
    <div className="flex-1 space-y-4 p-3 md:p-6 pt-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-blue-950">Quản Lý Nhân Viên</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
              <UserPlus className="mr-2 h-4 w-4" />
              Thêm Nhân Viên
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Thêm Nhân Viên Mới</DialogTitle>
              <DialogDescription>Nhập thông tin chi tiết của nhân viên mới.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Họ Tên</Label>
                  <Input
                    id="name"
                    placeholder="Đặng Văn Dũng"
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="dangvandung@example.com"
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Số Điện Thoại</Label>
                  <Input
                    id="phone"
                    placeholder="0912 111 222"
                    value={newEmployee.phone}
                    onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Vai Trò</Label>
                  <Select
                    value={newEmployee.role}
                    onValueChange={(value) => setNewEmployee({ ...newEmployee, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Quản Trị">Quản Trị</SelectItem>
                      <SelectItem value="Bán Hàng">Bán Hàng</SelectItem>
                      <SelectItem value="Kho">Kho</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Mật Khẩu</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newEmployee.password}
                    onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Xác Nhận Mật Khẩu</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={newEmployee.confirmPassword}
                    onChange={(e) => setNewEmployee({ ...newEmployee, confirmPassword: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="w-full sm:w-auto">
                Hủy
              </Button>
              <Button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                onClick={handleAddEmployee}
              >
                Thêm Nhân Viên
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Thống kê tổng quan */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Nhân Viên</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.length}</div>
            <p className="text-xs text-muted-foreground">Tất cả nhân viên trong hệ thống</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quản Trị</CardTitle>
            <ShieldCheck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countByRole("Quản Trị")}</div>
            <p className="text-xs text-muted-foreground">Nhân viên quản trị hệ thống</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bán Hàng</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countByRole("Bán Hàng")}</div>
            <p className="text-xs text-muted-foreground">Nhân viên bán hàng</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đang Hoạt Động</CardTitle>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              {countByStatus("Đang Hoạt Động")}/{employees.length}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countByStatus("Đang Hoạt Động")}</div>
            <p className="text-xs text-muted-foreground">Nhân viên đang hoạt động</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm nhân viên..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Tất Cả Vai Trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất Cả Vai Trò</SelectItem>
                <SelectItem value="admin">Quản Trị</SelectItem>
                <SelectItem value="sales">Bán Hàng</SelectItem>
                <SelectItem value="inventory">Kho</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Tất Cả Trạng Thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất Cả Trạng Thái</SelectItem>
                <SelectItem value="active">Đang Hoạt Động</SelectItem>
                <SelectItem value="inactive">Không Hoạt Động</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-lg border overflow-hidden" ref={tableContainerRef}>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-100">
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Họ Tên</TableHead>
                  <TableHead>Vai Trò</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Điện Thoại</TableHead>
                  <TableHead>Ngày Tham Gia</TableHead>
                  <TableHead>Trạng Thái</TableHead>
                  <TableHead className="text-right w-[80px]">Thao Tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <TableRow key={employee.id} className="hover:bg-slate-50">
                      <TableCell className="p-2">
                        <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                          <User className="h-6 w-6 text-slate-500" />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{employee.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          {getRoleIcon(employee.role)}
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-800 hover:bg-blue-50 border-blue-200"
                          >
                            {employee.role}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.phone}</TableCell>
                      <TableCell>{employee.joinDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={employee.status === "Đang Hoạt Động" ? "default" : "secondary"}
                          className={getStatusColor(employee.status)}
                        >
                          {employee.status}
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
                            <DropdownMenuItem onClick={() => openEditDialog(employee)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Chỉnh Sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openResetPasswordDialog(employee)}>
                              <Key className="mr-2 h-4 w-4" />
                              Đặt Lại Mật Khẩu
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeleteEmployee(employee.id)}
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
                    <TableCell colSpan={8} className="text-center py-6">
                      Không tìm thấy nhân viên nào phù hợp với điều kiện tìm kiếm
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Dialog chỉnh sửa nhân viên */}
      {currentEmployee && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Chỉnh Sửa Thông Tin Nhân Viên</DialogTitle>
              <DialogDescription>Cập nhật thông tin chi tiết của nhân viên.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Họ Tên</Label>
                  <Input
                    id="edit-name"
                    value={currentEmployee.name}
                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={currentEmployee.email}
                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Số Điện Thoại</Label>
                  <Input
                    id="edit-phone"
                    value={currentEmployee.phone}
                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Vai Trò</Label>
                  <Select
                    value={currentEmployee.role}
                    onValueChange={(value) => setCurrentEmployee({ ...currentEmployee, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Quản Trị">Quản Trị</SelectItem>
                      <SelectItem value="Bán Hàng">Bán Hàng</SelectItem>
                      <SelectItem value="Kho">Kho</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-status">Trạng Thái</Label>
                <Select
                  value={currentEmployee.status}
                  onValueChange={(value) => setCurrentEmployee({ ...currentEmployee, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Đang Hoạt Động">Đang Hoạt Động</SelectItem>
                    <SelectItem value="Không Hoạt Động">Không Hoạt Động</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="w-full sm:w-auto">
                Hủy
              </Button>
              <Button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                onClick={handleEditEmployee}
              >
                Lưu Thay Đổi
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Dialog đặt lại mật khẩu */}
      {currentEmployee && (
        <Dialog open={isResetPasswordDialogOpen} onOpenChange={setIsResetPasswordDialogOpen}>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Đặt Lại Mật Khẩu</DialogTitle>
              <DialogDescription>Đặt mật khẩu mới cho nhân viên {currentEmployee.name}.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">Mật Khẩu Mới</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={currentEmployee.newPassword || ""}
                  onChange={(e) => setCurrentEmployee({ ...currentEmployee, newPassword: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-new-password">Xác Nhận Mật Khẩu Mới</Label>
                <Input
                  id="confirm-new-password"
                  type="password"
                  value={currentEmployee.confirmNewPassword || ""}
                  onChange={(e) => setCurrentEmployee({ ...currentEmployee, confirmNewPassword: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setIsResetPasswordDialogOpen(false)}
                className="w-full sm:w-auto"
              >
                Hủy
              </Button>
              <Button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                onClick={handleResetPassword}
              >
                Đặt Lại Mật Khẩu
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
