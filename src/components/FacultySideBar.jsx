import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    HomeIcon,
    UsersIcon,
    BriefcaseIcon,
    MapPinIcon,
    BookOpenIcon,
    Cog6ToothIcon,
    MagnifyingGlassIcon,
    ChatBubbleLeftIcon,
    ChartPieIcon,
    Bars3Icon,
    XMarkIcon,
    ClipboardDocumentListIcon,
    ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

// Navigation items for faculty
const facultyNavItems = [
    { name: "Dashboard", icon: HomeIcon, path: "/dashboard" },
    { name: "Beneficiaries", icon: UsersIcon, path: "/beneficiaries" },
    { name: "Chat", icon: ChatBubbleLeftIcon, path: "/chat" },
    { name: "Explore", icon: MagnifyingGlassIcon, path: "/explore" },
    { name: "Ventures", icon: BriefcaseIcon, path: "/ventures" },
    { name: "Follow-Ups", icon: ClipboardDocumentListIcon, path: "/follow-ups" },
    { name: "Stories", icon: BookOpenIcon, path: "/stories" },
    { name: "Visualize", icon: ChartPieIcon, path: "/visualize" },
];

// Navigation items for students (beneficiaries)
const studentNavItems = [
    { name: "Chat", icon: ChatBubbleLeftIcon, path: "/chat" },
];

export default function Sidebar({ isOpen, toggleSidebar, onLogout, currentUser }) {
    const location = useLocation();
    
    // Determine which navigation items to show based on user role
    const navItems = currentUser?.role === "beneficiary" ? studentNavItems : facultyNavItems;

    return (
        <div
            className={`${isOpen ? "w-64" : "w-20"
                } h-screen bg-indigo-800 text-white shadow-lg transition-all duration-300 fixed flex flex-col z-50`}
        >
            {/* Top bar with toggle button */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-indigo-600">
                <span className={`text-xl font-bold ${!isOpen && "hidden"}`}>
                    {currentUser?.role === "beneficiary" ? "Student Portal" : "ICECD"}
                </span>
                <button onClick={toggleSidebar}>
                    {isOpen ? (
                        <XMarkIcon className="w-6 h-6" />
                    ) : (
                        <Bars3Icon className="w-6 h-6" />
                    )}
                </button>
            </div>

            {/* User Info */}
            {currentUser && isOpen && (
                <div className="px-4 py-3 border-b border-indigo-600">
                    <div className="text-sm text-indigo-200">
                        <div className="font-medium">{currentUser.full_name}</div>
                        <div className="text-xs">{currentUser.role} • {currentUser.city}</div>
                    </div>
                </div>
            )}

            {/* Nav Links */}
            <nav className="mt-4 flex-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`w-full flex items-center px-4 py-3 hover:bg-indigo-700 transition ${isActive ? "bg-indigo-700" : ""
                                }`}
                        >
                            <item.icon className="h-5 w-5 text-white" />
                            {isOpen && <span className="ml-3">{item.name}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout Button */}
            <div className="border-t border-indigo-600 p-4">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center px-4 py-3 hover:bg-indigo-700 transition text-red-200 hover:text-red-100"
                >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    {isOpen && <span className="ml-3">Logout</span>}
                </button>
            </div>
        </div>
    );
}
