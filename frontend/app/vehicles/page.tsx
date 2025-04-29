"use client"

import { useState } from "react"
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
import { Car, Edit, MoreHorizontal, Plus, Trash } from "lucide-react"

// Sample data
const vehicles = [
  {
    id: 1,
    name: "Toyota Camry",
    brand: "Toyota",
    model: "Camry",
    price: 25000,
    color: "White",
    specs: "2.5L 4-cylinder engine, 203 hp, 8-speed automatic transmission",
    image: "/placeholder.svg",
    type: "New",
    inventory: 5,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Honda Accord",
    brand: "Honda",
    model: "Accord",
    price: 27000,
    color: "Black",
    specs: "1.5L turbocharged 4-cylinder engine, 192 hp, CVT transmission",
    image: "/placeholder.svg",
    type: "New",
    inventory: 3,
    status: "In Stock",
  },
  {
    id: 3,
    name: "Ford Mustang",
    brand: "Ford",
    model: "Mustang",
    price: 35000,
    color: "Red",
    specs: "2.3L EcoBoost engine, 310 hp, 6-speed manual transmission",
    image: "/placeholder.svg",
    type: "New",
    inventory: 2,
    status: "In Stock",
  },
  {
    id: 4,
    name: "BMW 3 Series",
    brand: "BMW",
    model: "3 Series",
    price: 42000,
    color: "Blue",
    specs: "2.0L turbocharged 4-cylinder engine, 255 hp, 8-speed automatic transmission",
    image: "/placeholder.svg",
    type: "New",
    inventory: 1,
    status: "In Stock",
  },
  {
    id: 5,
    name: "Mercedes-Benz C-Class",
    brand: "Mercedes",
    model: "C-Class",
    price: 45000,
    color: "Silver",
    specs: "2.0L turbocharged 4-cylinder engine, 255 hp, 9-speed automatic transmission",
    image: "/placeholder.svg",
    type: "Used",
    inventory: 0,
    status: "Out of Stock",
  },
]

export default function VehiclesPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Vehicle Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Vehicle
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Vehicle</DialogTitle>
              <DialogDescription>Enter the details of the new vehicle to add to inventory.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Vehicle Name</Label>
                  <Input id="name" placeholder="Toyota Camry" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="toyota">Toyota</SelectItem>
                      <SelectItem value="honda">Honda</SelectItem>
                      <SelectItem value="ford">Ford</SelectItem>
                      <SelectItem value="bmw">BMW</SelectItem>
                      <SelectItem value="mercedes">Mercedes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input id="model" placeholder="Camry" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" type="number" placeholder="25000" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input id="color" placeholder="White" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="used">Used</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="inventory">Inventory</Label>
                  <Input id="inventory" type="number" placeholder="5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instock">In Stock</SelectItem>
                      <SelectItem value="outofstock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specs">Technical Specifications</Label>
                <Textarea id="specs" placeholder="Enter vehicle specifications..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input id="image" type="file" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Vehicle</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <Input placeholder="Search vehicles..." className="max-w-sm" />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Brands" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            <SelectItem value="toyota">Toyota</SelectItem>
            <SelectItem value="honda">Honda</SelectItem>
            <SelectItem value="ford">Ford</SelectItem>
            <SelectItem value="bmw">BMW</SelectItem>
            <SelectItem value="mercedes">Mercedes</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="instock">In Stock</SelectItem>
            <SelectItem value="outofstock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Inventory</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>
                  <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                    <Car className="h-6 w-6" />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{vehicle.name}</TableCell>
                <TableCell>{vehicle.brand}</TableCell>
                <TableCell>${vehicle.price.toLocaleString()}</TableCell>
                <TableCell>{vehicle.type}</TableCell>
                <TableCell>{vehicle.inventory}</TableCell>
                <TableCell>
                  <Badge variant={vehicle.status === "In Stock" ? "default" : "destructive"}>{vehicle.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
