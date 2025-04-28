"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import Navbar from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Car, Users, DollarSign, UserCog, TrendingUp, BarChart3 } from "lucide-react"

export default function AdminDashboard() {
  const { user } = useAuth()
  const router = useRouter()

  // Redirect if not logged in or not admin
  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else if (user.role !== "admin") {
      router.push("/cars")
    }
  }, [user, router])

  if (!user || user.role !== "admin") return null

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Inventory</p>
                <p className="text-3xl font-bold mt-1">42</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Car className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>5% increase this month</span>
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-3xl font-bold mt-1">128</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>12% increase this month</span>
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold mt-1">$1.2M</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>8% increase this month</span>
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                <p className="text-3xl font-bold mt-1">24</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <UserCog className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">4 new this month</p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Sales Overview</h2>
              <div className="text-sm text-gray-500">Last 30 days</div>
            </div>
            <div className="h-64 flex items-center justify-center">
              <BarChart3 className="h-40 w-40 text-gray-300" />
              <div className="text-center text-gray-500">Sales chart visualization would appear here</div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Top Selling Models</h2>
              <div className="text-sm text-gray-500">Last 30 days</div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Tesla Model 3</span>
                    <span className="text-sm font-medium">12 sold</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "80%" }}></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Toyota Camry</span>
                    <span className="text-sm font-medium">10 sold</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Honda Accord</span>
                    <span className="text-sm font-medium">8 sold</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "50%" }}></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Ford Mustang</span>
                    <span className="text-sm font-medium">6 sold</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "40%" }}></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">BMW 3 Series</span>
                    <span className="text-sm font-medium">5 sold</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "30%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Recent Sales</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vehicle
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Salesperson
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">John Smith</td>
                    <td className="px-4 py-3 whitespace-nowrap">Tesla Model 3</td>
                    <td className="px-4 py-3 whitespace-nowrap">Jennifer Lee</td>
                    <td className="px-4 py-3 whitespace-nowrap">Apr 25, 2023</td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium">$52,000</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">Sarah Johnson</td>
                    <td className="px-4 py-3 whitespace-nowrap">Honda Accord</td>
                    <td className="px-4 py-3 whitespace-nowrap">Robert Chen</td>
                    <td className="px-4 py-3 whitespace-nowrap">Apr 23, 2023</td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium">$27,000</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">Michael Brown</td>
                    <td className="px-4 py-3 whitespace-nowrap">Ford Mustang</td>
                    <td className="px-4 py-3 whitespace-nowrap">Jennifer Lee</td>
                    <td className="px-4 py-3 whitespace-nowrap">Apr 20, 2023</td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium">$45,000</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">Emily Davis</td>
                    <td className="px-4 py-3 whitespace-nowrap">Toyota Camry</td>
                    <td className="px-4 py-3 whitespace-nowrap">Robert Chen</td>
                    <td className="px-4 py-3 whitespace-nowrap">Apr 18, 2023</td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium">$28,500</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
