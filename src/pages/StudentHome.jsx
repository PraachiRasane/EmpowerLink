import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight } from "lucide-react";

export default function StudentHome({ currentUser }) {
    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-green-100 to-green-200 text-green-900 p-6 rounded-xl shadow mb-8">
                <h1 className="text-4xl font-bold mb-1">Welcome, Student! 👋</h1>
                <p className="text-md">
                    Connect with your mentors and fellow students through our chat platform.
                </p>
            </div>

            {/* Student Info */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-600">
                        {currentUser?.full_name?.charAt(0) || "S"}
                    </span>
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-green-700">
                        {currentUser?.full_name || "Student"}
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Student • {currentUser?.city || "Gujarat"}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                        Access to chat functionality only
                    </p>
                </div>
            </div>

            {/* Chat Access Card */}
            <div className="max-w-md mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md border border-green-200">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <MessageCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-green-700">Chat Platform</h3>
                            <p className="text-sm text-gray-600">Connect with mentors and peers</p>
                        </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">
                        As a student, you have access to our chat platform where you can:
                    </p>
                    
                    <ul className="text-sm text-gray-600 mb-6 space-y-2">
                        <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            Message your assigned faculty mentors
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            Join community discussions
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            Get support and guidance
                        </li>
                    </ul>
                    
                    <Link
                        to="/chat"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <MessageCircle className="w-5 h-5" />
                        Go to Chat
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Info Footer */}
            <div className="mt-8 text-center text-sm text-gray-500">
                <p>Need help? Contact your faculty coordinator for assistance.</p>
            </div>
        </div>
    );
} 