"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"

export default function NotFound() {
    const router = useRouter()
    const { user } = useAuth()

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-600 mb-4">Page Not Found</h2>
                <p className="text-gray-500 mb-8">
                    {user?.role === "admin"
                        ? "As an admin, you don't have access to this section. Please use the admin dashboard for your tasks."
                        : "The page you're looking for doesn't exist or you don't have permission to access it."}
                </p>
                <button
                    onClick={() => router.push(user?.role === "admin" ? "/admin/dashboard" : "/cars")}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    )
} 