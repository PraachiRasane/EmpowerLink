import React from "react";
import { Link } from "react-router-dom";
import {
    UserCircle,
    BarChart3,
    BookOpen,
    Users,
    RefreshCcw,
    Briefcase,
} from "lucide-react";

export default function FacultyHome({ currentUser }) {
    return (
        <div className="p-8 bg-gray-50 min-h-screen space-y-8">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-900 p-6 rounded-xl shadow">
                <h1 className="text-4xl font-bold mb-1">Welcome Back, Faculty 👋</h1>
                <p className="text-md">
                    Let's continue empowering entrepreneurship, one story at a time.
                </p>
            </div>

            {/* Profile Summary */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-6">
                <UserCircle size={60} className="text-indigo-500" />
                <div>
                    <h2 className="text-xl font-semibold text-indigo-700">
                        {currentUser?.full_name || "Faculty Member"}
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Faculty Coordinator, {currentUser?.city || "Gujarat"} Zone
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                        Working with active beneficiaries
                    </p>
                </div>
            </div>

            {/* Quick Links Section */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard
                    icon={<BarChart3 className="text-indigo-600" />}
                    title="Dashboard"
                    description="Track city-wise progress and students"
                    link="/dashboard"
                />
                <FeatureCard
                    icon={<Briefcase className="text-green-600" />}
                    title="Ventures"
                    description="View entrepreneurial activities"
                    link="/ventures"
                />
                <FeatureCard
                    icon={<Users className="text-blue-600" />}
                    title="Beneficiaries"
                    description="See all enrolled individuals"
                    link="/beneficiaries"
                />
                <FeatureCard
                    icon={<BookOpen className="text-yellow-600" />}
                    title="Stories"
                    description="Read inspiring success journeys"
                    link="/stories"
                />
                <FeatureCard
                    icon={<RefreshCcw className="text-red-600" />}
                    title="Follow-Ups"
                    description="Track ongoing progress post-training"
                    link="/follow-ups"
                />
            </div>

            {/* Recent Activity */}
            <div className="mt-10">
                <h3 className="text-lg font-semibold text-indigo-800 mb-3">
                    Recent Activity
                </h3>
                <ul className="bg-white rounded-lg shadow divide-y divide-gray-100 text-sm">
                    <li className="p-4">
                        Sunita Patel submitted follow-up form for June.
                    </li>
                    <li className="p-4">5 new ventures started in Jaipur zone.</li>
                    <li className="p-4">Ravi Mehta updated income details.</li>
                </ul>
            </div>

            {/* Quote Footer */}
            <div className="mt-12 text-center text-sm text-gray-500 italic">
                "Empowering one entrepreneur changes a whole community." 💡
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, description, link }) {
    return (
        <Link
            to={link}
            className="bg-white p-5 rounded-lg shadow hover:shadow-md border border-gray-100 transition-all"
        >
            <div className="flex items-center gap-3 mb-2 text-indigo-700 font-semibold text-lg">
                {icon}
                {title}
            </div>
            <p className="text-gray-600 text-sm">{description}</p>
        </Link>
    );
}
