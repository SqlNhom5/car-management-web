"use client"

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
import { Eye, FileText, MoreHorizontal, Plus, Printer, Receipt } from "lucide-react"

// Sample data
const orders = [
  {
    id: "ORD-001",
    date: "2023-03-15",
    customer: "John Smith",
    vehicle: "Toyota Camry",
    amount: 25000,
    discount: 1000,
    status: "Paid",
  },
  {
    id: "ORD-002",
    date: "2023-04-22",
    customer: "Jane Doe",
    vehicle: "Honda Accord",
    amount: 27000,
    discount: 500,
    status: "Pending",
  },
  {
    id: "ORD-003",
    date: "2023-05-10",
    customer: "Robert Johnson",
    vehicle: "Ford Mustang",
    amount: 35000,
    discount: 0,
    status: "Paid",
  },
  {
    id: "ORD-004",
    date: "2023-06-05",
    customer: "Sarah Williams",
    vehicle: "BMW 3 Series",
    amount: 42000,
    discount: 2000,
    status: "Cancelled",
  },
  {
    id: "ORD-005",
    date: "2023-07-18",
    customer: "Michael Brown",
    vehicle: "Mercedes-Benz C-Class",
    amount: 45000,
    discount: 1500,
    status: "Pending",
  },
]

export default function SalesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Sales Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Order
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Order</DialogTitle>
              <DialogDescription>Enter the details to create a new sales order.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="customer">Customer</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john">John Smith</SelectItem>
                    <SelectItem value="jane">Jane Doe</SelectItem>
                    <SelectItem value="robert">Robert Johnson</SelectItem>
                    <SelectItem value="sarah">Sarah Williams</SelectItem>
                    <SelectItem value="michael">Michael Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicle">Vehicle</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="toyota">Toyota Camry - $25,000</SelectItem>
                    <SelectItem value="honda">Honda Accord - $27,000</SelectItem>
                    <SelectItem value="ford">Ford Mustang - $35,000</SelectItem>
                    <SelectItem value="bmw">BMW 3 Series - $42,000</SelectItem>
                    <SelectItem value="mercedes">Mercedes-Benz C-Class - $45,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" defaultValue="1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount</Label>
                  <Input id="discount" type="number" placeholder="0" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment">Payment Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button type="submit">Create Order</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$174,000</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payment</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$72,000</div>
            <p className="text-xs text-muted-foreground">2 orders pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$34,800</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-2">
        <Input placeholder="Search orders..." className="max-w-sm" />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.vehicle}</TableCell>
                <TableCell>${order.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "Paid" ? "default" : order.status === "Pending" ? "outline" : "destructive"
                    }
                  >
                    {order.status}
                  </Badge>
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
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Printer className="mr-2 h-4 w-4" />
                        Print Invoice
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
