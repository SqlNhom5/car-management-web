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
import { Calendar, Edit, Eye, MoreHorizontal, Plus, Trash, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data
const customers = [
  {
    id: 1,
    name: "John Smith",
    address: "123 Main St, Anytown, CA",
    phone: "(555) 123-4567",
    email: "john.smith@example.com",
    purchases: 2,
    appointments: 1,
    notes: "Interested in SUVs, has a trade-in vehicle",
  },
  {
    id: 2,
    name: "Jane Doe",
    address: "456 Oak Ave, Somewhere, NY",
    phone: "(555) 987-6543",
    email: "jane.doe@example.com",
    purchases: 1,
    appointments: 0,
    notes: "Looking for a family vehicle, budget around $30,000",
  },
  {
    id: 3,
    name: "Robert Johnson",
    address: "789 Pine Rd, Nowhere, TX",
    phone: "(555) 456-7890",
    email: "robert.johnson@example.com",
    purchases: 0,
    appointments: 2,
    notes: "Interested in luxury vehicles, prefers German brands",
  },
  {
    id: 4,
    name: "Sarah Williams",
    address: "321 Elm St, Elsewhere, FL",
    phone: "(555) 234-5678",
    email: "sarah.williams@example.com",
    purchases: 3,
    appointments: 1,
    notes: "Repeat customer, prefers Japanese vehicles",
  },
  {
    id: 5,
    name: "Michael Brown",
    address: "654 Maple Dr, Anywhere, WA",
    phone: "(555) 876-5432",
    email: "michael.brown@example.com",
    purchases: 0,
    appointments: 1,
    notes: "First-time buyer, looking for affordable options",
  },
]

export default function CustomersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Customer Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
              <DialogDescription>Enter the details of the new customer.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Smith" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john.smith@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="(555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St, Anytown, CA" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Enter customer notes..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button type="submit">Save Customer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <Input placeholder="Search customers..." className="max-w-sm" />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Purchases</TableHead>
              <TableHead>Appointments</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.purchases}</TableCell>
                <TableCell>{customer.appointments}</TableCell>
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
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule Appointment
                      </DropdownMenuItem>
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

      <Dialog>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="info">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Information</TabsTrigger>
              <TabsTrigger value="purchases">Purchase History</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">John Smith</h3>
                  <p className="text-sm text-muted-foreground">Customer since Jan 2023</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3">
                        <span className="text-sm font-medium">Email:</span>
                        <span className="col-span-2 text-sm">john.smith@example.com</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="text-sm font-medium">Phone:</span>
                        <span className="col-span-2 text-sm">(555) 123-4567</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="text-sm font-medium">Address:</span>
                        <span className="col-span-2 text-sm">123 Main St, Anytown, CA</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Interested in SUVs, has a trade-in vehicle</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="purchases" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Purchase History</CardTitle>
                  <CardDescription>View all purchases made by this customer</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Vehicle</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Jan 15, 2023</TableCell>
                        <TableCell>Toyota Camry</TableCell>
                        <TableCell>$25,000</TableCell>
                        <TableCell>Completed</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Jun 22, 2023</TableCell>
                        <TableCell>Honda CR-V</TableCell>
                        <TableCell>$32,000</TableCell>
                        <TableCell>Completed</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="appointments" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Appointments</CardTitle>
                  <CardDescription>View and manage customer appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Purpose</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Mar 10, 2023</TableCell>
                        <TableCell>2:00 PM</TableCell>
                        <TableCell>Test drive - Toyota RAV4</TableCell>
                        <TableCell>Completed</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}
