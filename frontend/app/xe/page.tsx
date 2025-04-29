"use client"

import { useState, useRef, useEffect } from "react"
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
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Plus, Search, Trash } from "lucide-react"
import Image from "next/image"

// Dữ liệu mẫu
const initialVehicles = [
  {
    id: 1,
    name: "Toyota Camry",
    brand: "Toyota",
    model: "Camry",
    price: 1250000000,
    color: "Trắng",
    specs: "Động cơ 2.5L 4 xi-lanh, 203 mã lực, hộp số tự động 8 cấp",
    image: "/placeholder.svg?height=200&width=300",
    type: "Mới",
    inventory: 5,
    status: "Còn Hàng",
  },
  {
    id: 2,
    name: "Honda Accord",
    brand: "Honda",
    model: "Accord",
    price: 1350000000,
    color: "Đen",
    specs: "Động cơ 1.5L tăng áp 4 xi-lanh, 192 mã lực, hộp số CVT",
    image: "/placeholder.svg?height=200&width=300",
    type: "Mới",
    inventory: 3,
    status: "Còn Hàng",
  },
  {
    id: 3,
    name: "Ford Mustang",
    brand: "Ford",
    model: "Mustang",
    price: 1750000000,
    color: "Đỏ",
    specs: "Động cơ 2.3L EcoBoost, 310 mã lực, hộp số sàn 6 cấp",
    image: "/placeholder.svg?height=200&width=300",
    type: "Mới",
    inventory: 2,
    status: "Còn Hàng",
  },
  {
    id: 4,
    name: "BMW 3 Series",
    brand: "BMW",
    model: "3 Series",
    price: 2100000000,
    color: "Xanh",
    specs: "Động cơ 2.0L tăng áp 4 xi-lanh, 255 mã lực, hộp số tự động 8 cấp",
    image: "/placeholder.svg?height=200&width=300",
    type: "Mới",
    inventory: 1,
    status: "Còn Hàng",
  },
  {
    id: 5,
    name: "Mercedes-Benz C-Class",
    brand: "Mercedes",
    model: "C-Class",
    price: 2250000000,
    color: "Bạc",
    specs: "Động cơ 2.0L tăng áp 4 xi-lanh, 255 mã lực, hộp số tự động 9 cấp",
    image: "/placeholder.svg?height=200&width=300",
    type: "Đã Qua Sử Dụng",
    inventory: 0,
    status: "Hết Hàng",
  },
]

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState(initialVehicles)
  const [filteredVehicles, setFilteredVehicles] = useState(initialVehicles)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentVehicle, setCurrentVehicle] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [brandFilter, setBrandFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [newVehicle, setNewVehicle] = useState({
    name: "",
    brand: "",
    model: "",
    price: 0,
    color: "",
    specs: "",
    image: "/placeholder.svg?height=200&width=300",
    type: "Mới",
    inventory: 0,
    status: "Còn Hàng",
  })

  const fileInputRef = useRef(null)
  const editFileInputRef = useRef(null)
  const tableContainerRef = useRef(null)

  // Áp dụng bộ lọc khi có thay đổi
  useEffect(() => {
    let result = vehicles

    // Lọc theo từ khóa tìm kiếm
    if (searchTerm) {
      result = result.filter(
        (vehicle) =>
          vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Lọc theo hãng xe
    if (brandFilter !== "all") {
      result = result.filter((vehicle) => vehicle.brand.toLowerCase() === brandFilter.toLowerCase())
    }

    // Lọc theo trạng thái
    if (statusFilter !== "all") {
      const status = statusFilter === "instock" ? "Còn Hàng" : "Hết Hàng"
      result = result.filter((vehicle) => vehicle.status === status)
    }

    setFilteredVehicles(result)
  }, [vehicles, searchTerm, brandFilter, statusFilter])

  const handleAddVehicle = () => {
    const vehicleToAdd = {
      ...newVehicle,
      id: vehicles.length > 0 ? Math.max(...vehicles.map((v) => v.id)) + 1 : 1,
    }
    setVehicles([...vehicles, vehicleToAdd])
    setNewVehicle({
      name: "",
      brand: "",
      model: "",
      price: 0,
      color: "",
      specs: "",
      image: "/placeholder.svg?height=200&width=300",
      type: "Mới",
      inventory: 0,
      status: "Còn Hàng",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditVehicle = () => {
    const updatedVehicles = vehicles.map((vehicle) => (vehicle.id === currentVehicle.id ? currentVehicle : vehicle))
    setVehicles(updatedVehicles)
    setIsEditDialogOpen(false)
  }

  const handleDeleteVehicle = (id) => {
    setVehicles(vehicles.filter((vehicle) => vehicle.id !== id))
  }

  const openEditDialog = (vehicle) => {
    setCurrentVehicle({ ...vehicle })
    setIsEditDialogOpen(true)
  }

  const handleFileChange = (e, isEdit = false) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target.result
        if (isEdit) {
          setCurrentVehicle({ ...currentVehicle, image: imageUrl })
        } else {
          setNewVehicle({ ...newVehicle, image: imageUrl })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-3 md:p-6 pt-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-blue-950">Quản Lý Xe</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Thêm Xe Mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Thêm Xe Mới</DialogTitle>
              <DialogDescription>Nhập thông tin chi tiết của xe để thêm vào kho.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên Xe</Label>
                  <Input
                    id="name"
                    placeholder="Toyota Camry"
                    value={newVehicle.name}
                    onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Hãng Xe</Label>
                  <Select
                    value={newVehicle.brand}
                    onValueChange={(value) => setNewVehicle({ ...newVehicle, brand: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn hãng xe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Toyota">Toyota</SelectItem>
                      <SelectItem value="Honda">Honda</SelectItem>
                      <SelectItem value="Ford">Ford</SelectItem>
                      <SelectItem value="BMW">BMW</SelectItem>
                      <SelectItem value="Mercedes">Mercedes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    placeholder="Camry"
                    value={newVehicle.model}
                    onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Giá Bán</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="1250000000"
                    value={newVehicle.price}
                    onChange={(e) => setNewVehicle({ ...newVehicle, price: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="color">Màu Sắc</Label>
                  <Input
                    id="color"
                    placeholder="Trắng"
                    value={newVehicle.color}
                    onChange={(e) => setNewVehicle({ ...newVehicle, color: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Phân Loại</Label>
                  <Select
                    value={newVehicle.type}
                    onValueChange={(value) => setNewVehicle({ ...newVehicle, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn phân loại" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mới">Mới</SelectItem>
                      <SelectItem value="Đã Qua Sử Dụng">Đã Qua Sử Dụng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="inventory">Số Lượng Tồn Kho</Label>
                  <Input
                    id="inventory"
                    type="number"
                    placeholder="5"
                    value={newVehicle.inventory}
                    onChange={(e) => setNewVehicle({ ...newVehicle, inventory: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Trạng Thái</Label>
                  <Select
                    value={newVehicle.status}
                    onValueChange={(value) => setNewVehicle({ ...newVehicle, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Còn Hàng">Còn Hàng</SelectItem>
                      <SelectItem value="Hết Hàng">Hết Hàng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specs">Thông Số Kỹ Thuật</Label>
                <Textarea
                  id="specs"
                  placeholder="Nhập thông số kỹ thuật của xe..."
                  value={newVehicle.specs}
                  onChange={(e) => setNewVehicle({ ...newVehicle, specs: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Hình Ảnh</Label>
                <div className="flex flex-col gap-2">
                  <Input
                    id="image"
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleFileChange(e, false)}
                    accept="image/*"
                  />
                  {newVehicle.image && (
                    <div className="relative h-40 w-full rounded-md overflow-hidden border">
                      <Image
                        src={newVehicle.image || "/placeholder.svg"}
                        alt="Preview"
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  )}
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
                onClick={handleAddVehicle}
              >
                Lưu Xe
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
              placeholder="Tìm kiếm theo tên, hãng, model..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={brandFilter} onValueChange={setBrandFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Tất Cả Hãng Xe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất Cả Hãng Xe</SelectItem>
                <SelectItem value="toyota">Toyota</SelectItem>
                <SelectItem value="honda">Honda</SelectItem>
                <SelectItem value="ford">Ford</SelectItem>
                <SelectItem value="bmw">BMW</SelectItem>
                <SelectItem value="mercedes">Mercedes</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Tất Cả Trạng Thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất Cả Trạng Thái</SelectItem>
                <SelectItem value="instock">Còn Hàng</SelectItem>
                <SelectItem value="outofstock">Hết Hàng</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-lg border overflow-hidden" ref={tableContainerRef}>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-100">
                <TableRow>
                  <TableHead className="w-[100px]">Hình Ảnh</TableHead>
                  <TableHead>Tên Xe</TableHead>
                  <TableHead>Hãng Xe</TableHead>
                  <TableHead>Giá Bán</TableHead>
                  <TableHead>Tồn Kho</TableHead>
                  <TableHead>Trạng Thái</TableHead>
                  <TableHead className="text-right w-[80px]">Thao Tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.length > 0 ? (
                  filteredVehicles.map((vehicle) => (
                    <TableRow key={vehicle.id} className="hover:bg-slate-50">
                      <TableCell>
                        <div className="h-16 w-24 relative rounded-md overflow-hidden">
                          <Image
                            src={vehicle.image || "/placeholder.svg"}
                            alt={vehicle.name}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{vehicle.name}</TableCell>
                      <TableCell>{vehicle.brand}</TableCell>
                      <TableCell>
                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(vehicle.price)}
                      </TableCell>
                      <TableCell>{vehicle.inventory}</TableCell>
                      <TableCell>
                        <Badge
                          variant={vehicle.status === "Còn Hàng" ? "default" : "destructive"}
                          className={
                            vehicle.status === "Còn Hàng" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""
                          }
                        >
                          {vehicle.status}
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
                            <DropdownMenuItem onClick={() => openEditDialog(vehicle)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Chỉnh Sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeleteVehicle(vehicle.id)}
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
                    <TableCell colSpan={7} className="text-center py-6">
                      Không tìm thấy xe nào phù hợp với điều kiện tìm kiếm
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Dialog chỉnh sửa xe */}
      {currentVehicle && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Chỉnh Sửa Thông Tin Xe</DialogTitle>
              <DialogDescription>Cập nhật thông tin chi tiết của xe.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Tên Xe</Label>
                  <Input
                    id="edit-name"
                    value={currentVehicle.name}
                    onChange={(e) => setCurrentVehicle({ ...currentVehicle, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-brand">Hãng Xe</Label>
                  <Select
                    value={currentVehicle.brand}
                    onValueChange={(value) => setCurrentVehicle({ ...currentVehicle, brand: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn hãng xe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Toyota">Toyota</SelectItem>
                      <SelectItem value="Honda">Honda</SelectItem>
                      <SelectItem value="Ford">Ford</SelectItem>
                      <SelectItem value="BMW">BMW</SelectItem>
                      <SelectItem value="Mercedes">Mercedes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-model">Model</Label>
                  <Input
                    id="edit-model"
                    value={currentVehicle.model}
                    onChange={(e) => setCurrentVehicle({ ...currentVehicle, model: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Giá Bán</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={currentVehicle.price}
                    onChange={(e) => setCurrentVehicle({ ...currentVehicle, price: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-color">Màu Sắc</Label>
                  <Input
                    id="edit-color"
                    value={currentVehicle.color}
                    onChange={(e) => setCurrentVehicle({ ...currentVehicle, color: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-type">Phân Loại</Label>
                  <Select
                    value={currentVehicle.type}
                    onValueChange={(value) => setCurrentVehicle({ ...currentVehicle, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn phân loại" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mới">Mới</SelectItem>
                      <SelectItem value="Đã Qua Sử Dụng">Đã Qua Sử Dụng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-inventory">Số Lượng Tồn Kho</Label>
                  <Input
                    id="edit-inventory"
                    type="number"
                    value={currentVehicle.inventory}
                    onChange={(e) => setCurrentVehicle({ ...currentVehicle, inventory: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Trạng Thái</Label>
                  <Select
                    value={currentVehicle.status}
                    onValueChange={(value) => setCurrentVehicle({ ...currentVehicle, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Còn Hàng">Còn Hàng</SelectItem>
                      <SelectItem value="Hết Hàng">Hết Hàng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-specs">Thông Số Kỹ Thuật</Label>
                <Textarea
                  id="edit-specs"
                  value={currentVehicle.specs}
                  onChange={(e) => setCurrentVehicle({ ...currentVehicle, specs: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-image">Hình Ảnh</Label>
                <div className="flex flex-col gap-2">
                  <Input
                    id="edit-image"
                    type="file"
                    ref={editFileInputRef}
                    onChange={(e) => handleFileChange(e, true)}
                    accept="image/*"
                  />
                  {currentVehicle.image && (
                    <div className="relative h-40 w-full rounded-md overflow-hidden border">
                      <Image
                        src={currentVehicle.image || "/placeholder.svg"}
                        alt="Preview"
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="w-full sm:w-auto">
                Hủy
              </Button>
              <Button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                onClick={handleEditVehicle}
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
