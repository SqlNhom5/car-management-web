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
import { Edit, Key, MoreHorizontal, Plus, Trash } from "lucide-react"

// Sample data
const employees = [
  {
    id: 1,
    name: "David Wilson",
    role: "Admin",
    email: "david.wilson@example.com",
    phone: "(555) 111-2222",
    status: "Active",
  },
  {
    id: 2,
    name: "Emily Johnson",
    role: "Sales",
    email: "emily.johnson@example.com",
    phone: "(555) 333-4444",
    status: "Active",
  },
  {
    id: 3,
    name: "Mark Thompson",
    role: "Sales",
    email: "mark.thompson@example.com",
    phone: "(555) 555-6666",
    status: "Active",
  },
  {
    id: 4,
    name: "Lisa Anderson",
    role: "Inventory",
    email: "lisa.anderson@example.com",
    phone: "(555) 777-8888",
    status: "Inactive",
  },
  {
    id: 5,
    name: "James Martin",
    role: "Inventory",
    email: "james.martin@example.com",
    phone: "(555) 999-0000",
    status: "Active",
  },
]

export default function EmployeesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Employee Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>Enter the details of the new employee.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="David Wilson" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="david.wilson@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="(555) 111-2222" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="inventory">Inventory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button type="submit">Add Employee</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <Input placeholder="Search employees..." className="max-w-sm" />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="inventory">Inventory</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{employee.role}</Badge>
                </TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>
                  <Badge variant={employee.status === "Active" ? "default" : "secondary"}>{employee.status}</Badge>
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
                      <DropdownMenuItem>
                        <Key className="mr-2 h-4 w-4" />
                        Reset Password
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
