"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import Navbar from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Calendar, Clock, User, Car, Phone, Mail, Check, X } from "lucide-react"

export default function AdminAppointmentsPage() {
    const { user } = useAuth()
    const router = useRouter()
    const [appointments, setAppointments] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")

    // Redirect if not logged in or not admin
    useEffect(() => {
        if (!user) {
            router.push("/login")
        } else if (user.role !== "admin") {
            router.push("/cars")
        }
    }, [user, router])

    // Load appointments from localStorage
    useEffect(() => {
        const storedAppointments = JSON.parse(localStorage.getItem("appointments") || "[]")
        setAppointments(storedAppointments)
    }, [])

    // Filter appointments based on search term and status
    const filteredAppointments = appointments.filter((appointment) => {
        const matchesSearch =
            appointment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.customerPhone.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus =
            statusFilter === "all" || appointment.status.toLowerCase() === statusFilter.toLowerCase()

        return matchesSearch && matchesStatus
    })

    // Update appointment status
    const updateAppointmentStatus = (appointmentId, newStatus) => {
        const updatedAppointments = appointments.map((appointment) =>
            appointment.id === appointmentId ? { ...appointment, status: newStatus } : appointment
        )
        setAppointments(updatedAppointments)
        localStorage.setItem("appointments", JSON.stringify(updatedAppointments))
    }

    if (!user || user.role !== "admin") return null

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Appointments Management</h1>
                    <p className="mt-2 text-gray-600">Manage and track customer appointments</p>
                </div>

                <Card className="p-6">
                    <div className="mb-6 flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <Input
                                    type="text"
                                    placeholder="Search appointments..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div className="w-full sm:w-48">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="confirmed">Confirmed</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4">Date & Time</th>
                                    <th className="text-left py-3 px-4">Customer</th>
                                    <th className="text-left py-3 px-4">Car</th>
                                    <th className="text-left py-3 px-4">Contact</th>
                                    <th className="text-left py-3 px-4">Status</th>
                                    <th className="text-left py-3 px-4">Notes</th>
                                    <th className="text-left py-3 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAppointments.map((appointment) => (
                                    <tr key={appointment.id} className="border-b">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center">
                                                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                                                <span>{appointment.date}</span>
                                            </div>
                                            <div className="flex items-center mt-1">
                                                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                                                <span>{appointment.time}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center">
                                                <User className="h-5 w-5 text-gray-400 mr-2" />
                                                <span>{appointment.customerName}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center">
                                                <Car className="h-5 w-5 text-gray-400 mr-2" />
                                                <span>{appointment.carName}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center">
                                                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                                                <span>{appointment.customerPhone}</span>
                                            </div>
                                            <div className="flex items-center mt-1">
                                                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                                                <span>{appointment.customerEmail}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${appointment.status === "Confirmed"
                                                        ? "bg-green-100 text-green-800"
                                                        : appointment.status === "Cancelled"
                                                            ? "bg-red-100 text-red-800"
                                                            : "bg-yellow-100 text-yellow-800"
                                                    }`}
                                            >
                                                {appointment.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-gray-600">{appointment.notes}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            {appointment.status === "Pending" && (
                                                <div className="flex space-x-2">
                                                    <Button
                                                        size="sm"
                                                        onClick={() => updateAppointmentStatus(appointment.id, "Confirmed")}
                                                        className="flex items-center"
                                                    >
                                                        <Check className="h-4 w-4 mr-1" />
                                                        Confirm
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => updateAppointmentStatus(appointment.id, "Cancelled")}
                                                        className="flex items-center"
                                                    >
                                                        <X className="h-4 w-4 mr-1" />
                                                        Cancel
                                                    </Button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </main>
        </div>
    )
} 